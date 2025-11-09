const axios = require('axios');
const config = require('../config/payou');
const {
  buildInvoiceSignature,
  buildStatusSignature,
  buildConfirmSignature,
  buildWebhookSignature,
  formatAmount
} = require('../utils/payou');

const logger = {
  info: (...args) => console.log('[payou]', ...args),
  warn: (...args) => console.warn('[payou]', ...args),
  error: (...args) => console.error('[payou]', ...args)
};

const buildInvoicePayload = ({
  amount,
  orderId,
  comment,
  userCode,
  userEmail,
  system
}) => {
  config.requireBasics();

  const formattedAmount = formatAmount(amount);
  const sanitizedOrderId = `${orderId}`;
  const paymentSystem = system || config.defaultSystem;

  if (!paymentSystem) {
    throw new Error('Payment system is required');
  }

  const payload = {
    id: config.merchantId,
    sistems: paymentSystem,
    summ: formattedAmount,
    order_id: sanitizedOrderId,
    user_code: `${userCode ?? sanitizedOrderId}`,
    user_email: `${userEmail ?? ''}`.trim(),
    Coment: comment ? `${comment}`.substring(0, 255) : undefined
  };

  if (!payload.user_email) {
    delete payload.user_email;
  }

  payload.hash = buildInvoiceSignature({
    id: payload.id,
    amount: payload.summ,
    system: payload.sistems,
    orderId: payload.order_id
  });

  return payload;
};

const buildRedirectUrl = (payload) => {
  const params = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value !== 'undefined' && value !== null && value !== '') {
      params.append(key, value);
    }
  });
  return `${config.redirectUrl}?${params.toString()}`;
};

const requestPaymentRequisites = async (payload) => {
  const params = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value !== 'undefined' && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  const url = `${config.apiUrl}?${params.toString()}`;
  logger.info('Requesting Payou requisites', { orderId: payload.order_id, system: payload.sistems });

  const { data } = await axios.get(url, { timeout: 10000 });
  return data;
};

const checkPaymentStatus = async ({ orderId, searchBy = 'internal' }) => {
  config.requireBasics();
  const sanitizedOrderId = `${orderId}`;
  const hash = buildStatusSignature({
    id: config.merchantId,
    orderId: sanitizedOrderId
  });

  const baseUrl = searchBy === 'external' ? config.statusExternalUrl : config.statusUrl;
  const params = new URLSearchParams({
    id: config.merchantId,
    order_id: sanitizedOrderId,
    hash
  });

  const url = `${baseUrl}?${params.toString()}`;
  logger.info('Checking Payou status', { orderId: sanitizedOrderId, searchBy });

  const { data } = await axios.get(url, { timeout: 10000 });
  return data;
};

const confirmPayment = async ({ orderId, amount, system, action = 'paid' }) => {
  config.requireBasics();

  const formattedAmount = formatAmount(amount);
  const payload = {
    merchant_id: config.merchantId,
    order_id: Number(orderId),
    amount: Number(formattedAmount),
    system: system || config.defaultSystem,
    action
  };

  payload.hash = buildConfirmSignature({
    merchantId: payload.merchant_id,
    amount: payload.amount,
    system: payload.system,
    orderId: payload.order_id
  });

  logger.info('Sending confirm_payment request', { orderId: payload.order_id, action: payload.action });

  const { data } = await axios.post(config.confirmUrl, payload, {
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  });

  return data;
};

const verifyWebhookPayload = (body) => {
  config.requireBasics();
  const requiredFields = ['AMOUNT', 'status', 'intid', 'SIGN', 'MERCHANT_ORDER_ID'];

  const missing = requiredFields.filter((field) => typeof body[field] === 'undefined');
  if (missing.length) {
    throw new Error(`Missing webhook fields: ${missing.join(', ')}`);
  }

  const expectedSign = buildWebhookSignature({
    merchantId: body.merchant_id || config.merchantId,
    amount: body.AMOUNT,
    status: body.status,
    intId: body.intid,
    orderId: body.MERCHANT_ORDER_ID
  });

  const isValid = expectedSign === body.SIGN;

  return {
    isValid,
    expectedSign,
    receivedSign: body.SIGN
  };
};

module.exports = {
  buildInvoicePayload,
  buildRedirectUrl,
  requestPaymentRequisites,
  checkPaymentStatus,
  confirmPayment,
  verifyWebhookPayload,
  logger
};


