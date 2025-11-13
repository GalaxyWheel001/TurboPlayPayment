const integrationConfig = require('../../config/integration');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Secret-Key, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed'
      })
    };
  }

  const integrationSecret = integrationConfig.secretKey;

  try {
    const body = JSON.parse(event.body || '{}');

    const providedSecret = (event.headers['x-secret-key'] || event.headers['X-Secret-Key'] || '').trim() ||
      (body.secret_key || body.secretKey || '').trim();

    if (!integrationSecret || !providedSecret || providedSecret !== integrationSecret) {
      console.warn('Invalid or missing secret key on callback');
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid secret key'
        })
      };
    }

    const { payment_id, status, amount, transaction_id, currency, metadata } = body;

    console.log('Payment callback received:', {
      payment_id,
      status,
      amount,
      currency,
      transaction_id,
      metadata
    });

    // TODO: Persist payment status if storage is connected (e.g., database or webhook relay)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Callback received'
      })
    };
  } catch (error) {
    console.error('Callback error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};

