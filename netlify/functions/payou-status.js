const {
  checkPaymentStatus,
  logger
} = require('../../services/payouService');

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
};

const getOrderIdFromPath = (path) => {
  if (!path) return null;
  const segments = path.split('/');
  return segments[segments.length - 1] || null;
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: HEADERS,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const orderId = getOrderIdFromPath(event.path);
    if (!orderId) {
      return {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify({ success: false, error: 'orderId is required' })
      };
    }

    const { searchBy = 'internal' } = event.queryStringParameters || {};
    if (!['internal', 'external'].includes(searchBy)) {
      return {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify({ success: false, error: 'searchBy must be internal or external' })
      };
    }

    const status = await checkPaymentStatus({ orderId, searchBy });
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        success: true,
        orderId,
        searchBy,
        status
      })
    };
  } catch (error) {
    logger.error('Status check failed', error);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Status request failed'
      })
    };
  }
};

