const {
  confirmPayment,
  logger
} = require('../../services/payouService');

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
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
    const errors = [];

    if (typeof body.orderId === 'undefined') {
      errors.push({ field: 'orderId', message: 'orderId is required' });
    } else if (Number.isNaN(Number(body.orderId))) {
      errors.push({ field: 'orderId', message: 'orderId must be numeric' });
    }

    if (typeof body.amount === 'undefined') {
      errors.push({ field: 'amount', message: 'amount is required' });
    } else if (Number.isNaN(Number(body.amount)) || Number(body.amount) <= 0) {
      errors.push({ field: 'amount', message: 'amount must be a number greater than 0' });
    }

    if (typeof body.system !== 'undefined') {
      const system = String(body.system);
      if (!system || system.length > 64) {
        errors.push({ field: 'system', message: 'system must be 1-64 characters' });
      }
    }

    if (typeof body.action !== 'undefined' && !['paid', 'cancelled'].includes(body.action)) {
      errors.push({ field: 'action', message: 'action must be paid or cancelled' });
    }

    if (errors.length) {
      return {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify({ success: false, errors })
      };
    }

    const result = await confirmPayment({
      orderId: body.orderId,
      amount: body.amount,
      system: body.system,
      action: body.action
    });

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        success: true,
        orderId: body.orderId,
        result
      })
    };
  } catch (error) {
    logger.error('Confirm request failed', error);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Confirm request failed'
      })
    };
  }
};

