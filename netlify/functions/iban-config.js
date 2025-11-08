const integrationConfig = require('../../config/integration');

exports.handler = async () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: integrationConfig.toJSON()
      })
    };
  } catch (error) {
    console.error('IBAN config error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Internal server error'
      })
    };
  }
};


