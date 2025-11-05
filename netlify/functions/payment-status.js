exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  // Extract paymentId from path
  // Path format: /.netlify/functions/payment-status/:paymentId
  const pathParts = event.path.split('/').filter(Boolean);
  const paymentId = pathParts[pathParts.length - 1] || event.queryStringParameters?.paymentId || '';

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      status: 'pending',
      paymentId: paymentId,
      message: 'Payment status check endpoint'
    })
  };
};

