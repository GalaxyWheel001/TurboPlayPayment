exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { walletAddress, amount, currency, provider, email, callbackUrl, network, cryptocurrency } = body;

    // Валидация обязательных полей
    if (!walletAddress || !amount || !currency || !provider || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields'
        })
      };
    }

    // Валидация суммы
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Amount must be greater than 0'
        })
      };
    }

    // Лимит: максимально $10,000 за транзакцию
    if (amountNum > 10000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Amount exceeds maximum limit of $10,000. For larger amounts, please contact support or use bank transfer.'
        })
      };
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid email format'
        })
      };
    }

    // Валидация провайдера
    const PROVIDERS = {
      'moonpay': {
        name: 'MoonPay',
        widgetUrl: 'https://buy.moonpay.com',
        directUrl: 'https://buy.moonpay.com',
        supportsDirect: true
      }
    };

    if (!PROVIDERS[provider]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid provider'
        })
      };
    }

    // Валидация адреса кошелька
    const networkType = network || 'bitcoin';
    
    if (networkType === 'bitcoin') {
      // Bitcoin адреса начинаются с 1, 3, или bc1
      if (!(walletAddress.startsWith('1') || walletAddress.startsWith('3') || walletAddress.startsWith('bc1')) || 
          walletAddress.length < 26 || walletAddress.length > 62) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Invalid Bitcoin wallet address format. Bitcoin addresses start with 1, 3, or bc1 and are 26-62 characters long.'
          })
        };
      }
    }

    // Генерируем уникальный ID платежа
    const paymentId = `direct_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Создаем URL для оплаты
    const baseUrl = event.headers['x-forwarded-proto'] 
      ? `${event.headers['x-forwarded-proto']}://${event.headers.host}`
      : `https://${event.headers.host}`;
    const returnUrl = `${baseUrl}/payment-success?payment_id=${paymentId}`;
    
    // Только Bitcoin для MoonPay
    const cryptoCode = 'BTC';
    const currencyCode = 'btc';
    
    // MoonPay - используем прямую ссылку на покупку Bitcoin
    const moonpayApiKey = process.env.MOONPAY_API_KEY;
    let paymentUrl = '';
    
    if (moonpayApiKey && !/YOUR_KEY|test|xxx/i.test(moonpayApiKey)) {
      // С API ключом - полная интеграция через виджет
      paymentUrl = `https://buy.moonpay.com/?apiKey=${moonpayApiKey}&currencyCode=${currencyCode}&walletAddress=${walletAddress}&baseCurrencyAmount=${amount}&email=${encodeURIComponent(email)}&redirectURL=${encodeURIComponent(returnUrl)}`;
    } else {
      // Без ключа - прямая ссылка на покупку Bitcoin
      paymentUrl = `https://buy.moonpay.com/?currencyCode=${currencyCode}&walletAddress=${walletAddress}&baseCurrencyAmount=${amount}&email=${encodeURIComponent(email)}`;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        paymentId: paymentId,
        paymentUrl: paymentUrl,
        walletData: {
          finalWallet: walletAddress,
          provider: provider,
          providerName: PROVIDERS[provider].name,
          direct: true
        },
        message: 'Direct payment URL created. Funds will be sent directly to your wallet address.'
      })
    };

  } catch (error) {
    console.error('Payment creation error:', error);
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

