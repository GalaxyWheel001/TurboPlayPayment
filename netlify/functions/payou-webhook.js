const querystring = require('querystring');
const {
  verifyWebhookPayload,
  logger
} = require('../../services/payouService');

const TEXT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'text/plain; charset=utf-8'
};

const parseBody = (event) => {
  const raw = event.body || '';
  const isBase64 = event.isBase64Encoded;
  const decoded = isBase64 ? Buffer.from(raw, 'base64').toString('utf8') : raw;

  const contentType = (event.headers['content-type'] || event.headers['Content-Type'] || '').split(';')[0].trim();

  if (contentType === 'application/json') {
    return JSON.parse(decoded || '{}');
  }

  if (contentType === 'application/x-www-form-urlencoded' || !contentType) {
    return querystring.parse(decoded);
  }

  // Fallback: attempt JSON
  try {
    return JSON.parse(decoded);
  } catch (error) {
    return {};
  }
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: TEXT_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: TEXT_HEADERS,
      body: 'method not allowed'
    };
  }

  try {
    const body = parseBody(event);
    const verification = verifyWebhookPayload(body);

    if (!verification.isValid) {
      logger.warn('Invalid webhook signature', {
        expected: verification.expectedSign,
        received: verification.receivedSign,
        orderId: body.MERCHANT_ORDER_ID
      });
      return {
        statusCode: 400,
        headers: TEXT_HEADERS,
        body: `${body.MERCHANT_ORDER_ID || 'UNKNOWN'}|error`
      };
    }

    if (body.status !== 'success') {
      logger.warn('Webhook received non-success status', {
        orderId: body.MERCHANT_ORDER_ID,
        status: body.status
      });
      return {
        statusCode: 202,
        headers: TEXT_HEADERS,
        body: `${body.MERCHANT_ORDER_ID}|accepted`
      };
    }

    logger.info('Payment success webhook', {
      orderId: body.MERCHANT_ORDER_ID,
      amount: body.AMOUNT,
      intId: body.intid
    });

    // TODO: update order status in storage / database

    return {
      statusCode: 200,
      headers: TEXT_HEADERS,
      body: `${body.MERCHANT_ORDER_ID}|success`
    };
  } catch (error) {
    logger.error('Webhook processing failed', error);
    return {
      statusCode: 500,
      headers: TEXT_HEADERS,
      body: 'error'
    };
  }
};

