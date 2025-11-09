const crypto = require('crypto');
const config = require('../config/payou');

const createMd5Hash = (parts) => {
  const source = parts.map((part) => `${part ?? ''}`).join(':');
  return crypto.createHash('md5').update(source).digest('hex');
};

const formatAmount = (value) => {
  const num = Number(value);
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    throw new Error('Amount must be a finite number');
  }
  return num.toFixed(2);
};

const buildInvoiceSignature = ({ id, amount, system, orderId }) => {
  config.requireBasics();
  return createMd5Hash([
    id || config.merchantId,
    amount,
    config.secretKey,
    system,
    orderId
  ]);
};

const buildStatusSignature = ({ id, orderId }) => {
  config.requireBasics();
  return createMd5Hash([
    id || config.merchantId,
    config.secretKey,
    orderId
  ]);
};

const buildWebhookSignature = ({ merchantId, amount, status, intId, orderId }) => {
  config.requireBasics();
  return createMd5Hash([
    merchantId || config.merchantId,
    amount,
    config.secretKey,
    status,
    intId,
    orderId
  ]);
};

const buildConfirmSignature = ({ merchantId, amount, system, orderId }) => {
  config.requireBasics();
  return createMd5Hash([
    merchantId || config.merchantId,
    amount,
    config.secretKey,
    system,
    orderId
  ]);
};

module.exports = {
  createMd5Hash,
  formatAmount,
  buildInvoiceSignature,
  buildStatusSignature,
  buildWebhookSignature,
  buildConfirmSignature
};


