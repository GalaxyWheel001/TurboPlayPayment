const { URLSearchParams } = require('url');
const {
  buildInvoicePayload,
  buildRedirectUrl,
  requestPaymentRequisites,
  logger
} = require('../../services/payouService');
const config = require('../../config/payou');

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const parseBoolean = (value, defaultValue) => {
  if (typeof value === 'undefined' || value === null) return defaultValue;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['false', '0', 'no', 'off', ''].includes(normalized)) return false;
    if (['true', '1', 'yes', 'on'].includes(normalized)) return true;
  }
  return Boolean(value);
};

const validatePayload = (body) => {
  const errors = [];

  if (typeof body.amount === 'undefined') {
    errors.push({ field: 'amount', message: 'amount is required' });
  } else if (Number.isNaN(Number(body.amount)) || Number(body.amount) <= 0) {
    errors.push({ field: 'amount', message: 'amount must be a number greater than 0' });
  }

  if (typeof body.orderId !== 'undefined') {
    const orderId = String(body.orderId).trim();
    if (!orderId || orderId.length > 64) {
      errors.push({ field: 'orderId', message: 'orderId must be 1-64 characters' });
    }
  }

  if (typeof body.userEmail !== 'undefined' && body.userEmail !== '') {
    if (!emailRegex.test(String(body.userEmail))) {
      errors.push({ field: 'userEmail', message: 'userEmail must be a valid email' });
    }
  }

  if (typeof body.userCode !== 'undefined') {
    const userCode = String(body.userCode);
    if (userCode.length > 64) {
      errors.push({ field: 'userCode', message: 'userCode must be up to 64 characters' });
    }
  }

  if (typeof body.comment !== 'undefined') {
    const comment = String(body.comment);
    if (comment.length > 255) {
      errors.push({ field: 'comment', message: 'comment must be up to 255 characters' });
    }
  }

  if (typeof body.system !== 'undefined') {
    const system = String(body.system);
    if (!system || system.length > 64) {
      errors.push({ field: 'system', message: 'system must be 1-64 characters' });
    }
  }

  return errors;
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: HEADERS,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const validationErrors = validatePayload(body);
    if (validationErrors.length) {
      return {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify({ success: false, errors: validationErrors })
      };
    }

    const {
      amount,
      orderId,
      userEmail,
      userCode,
      comment,
      system,
      fetchRequisites
    } = body;

    const resolvedOrderId = orderId ? String(orderId).trim() : `iban_${Date.now()}`;
    const shouldFetch = parseBoolean(fetchRequisites, true);

    const payload = buildInvoicePayload({
      amount,
      orderId: resolvedOrderId,
      comment,
      userCode,
      userEmail,
      system
    });

    const redirectUrl = buildRedirectUrl(payload);

    const responsePayload = {
      success: true,
      invoice: {
        orderId: resolvedOrderId,
        amount: payload.summ,
        system: payload.sistems,
        redirectUrl,
        payload
      },
      requisites: null
    };

    if (shouldFetch) {
      try {
        const requisites = await requestPaymentRequisites(payload);
        responsePayload.requisites = requisites;
      } catch (error) {
        logger.error('Failed to fetch Payou requisites', error.message);
        responsePayload.requisites = {
          status: 'error',
          message: error.message,
          fallback: config.iban ? { iban: config.iban } : null
        };
      }
    } else if (config.iban) {
      responsePayload.requisites = { iban: config.iban };
    }

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(responsePayload)
    };
  } catch (error) {
    logger.error('Invoice creation failed', error);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Internal server error'
      })
    };
  }
};

