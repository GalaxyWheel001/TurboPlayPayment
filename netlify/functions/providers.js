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

  const PROVIDERS = {
    'moonpay': {
      name: 'MoonPay',
      widgetUrl: 'https://buy.moonpay.com',
      directUrl: 'https://buy.moonpay.com',
      supportsDirect: true
    }
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      providers: Object.keys(PROVIDERS),
      providerInfo: PROVIDERS
    })
  };
};

