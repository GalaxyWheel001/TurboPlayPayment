const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting для защиты от DoS атак
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с одного IP
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Строгий лимит для создания платежей
const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 10, // максимум 10 платежей в час с одного IP
  message: 'Too many payment requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware - Безопасный CORS
app.use(cors({
  origin: function (origin, callback) {
    // Разрешенные домены
    const allowedOrigins = [
      'https://web.telegram.org',
      'https://telegram.org',
      'http://localhost:3000', // для разработки
      process.env.ALLOWED_ORIGIN // из переменной окружения
    ].filter(Boolean);
    
    // Разрешить запросы без origin (мобильные приложения, Postman и т.д.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowed => origin.includes(allowed))) {
      callback(null, true);
    } else {
      // В режиме разработки разрешить все
      if (process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Прямая интеграция с провайдерами (без card2crypto.org)
// Используем прямые виджеты и API провайдеров

const PROVIDERS = {
  'moonpay': {
    name: 'MoonPay',
    widgetUrl: 'https://buy.moonpay.com',
    directUrl: 'https://buy.moonpay.com',
    supportsDirect: true
  }
};

// Применить rate limiting к API endpoints
app.use('/api/', apiLimiter);

// Получить список провайдеров
app.get('/api/providers', (req, res) => {
  res.json({
    success: true,
    providers: Object.keys(PROVIDERS),
    providerInfo: PROVIDERS
  });
});

// Функция валидации email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Функция экранирования HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Создать платеж напрямую (без card2crypto.org) - с rate limiting
app.post('/api/create-payment', paymentLimiter, async (req, res) => {
  try {
    const { walletAddress, amount, currency, provider, email, callbackUrl, network, cryptocurrency } = req.body;

    // Валидация обязательных полей
    if (!walletAddress || !amount || !currency || !provider || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Валидация суммы
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0'
      });
    }

    // Лимит: максимально $10,000 за транзакцию (Level 3 MoonPay лимит для карт)
    // Для больших сумм рекомендуется банковский перевод
    if (amountNum > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Amount exceeds maximum limit of $10,000. For larger amounts, please contact support or use bank transfer.'
      });
    }

    // Валидация email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Валидация провайдера
    if (!PROVIDERS[provider]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid provider'
      });
    }

    // Валидация callback URL
    if (callbackUrl) {
      try {
        const url = new URL(callbackUrl);
        const allowedHosts = [
          'localhost',
          process.env.ALLOWED_HOST
        ].filter(Boolean);
        
        // В продакшене проверять домен
        if (process.env.NODE_ENV === 'production' && allowedHosts.length > 0) {
          if (!allowedHosts.some(host => url.hostname.includes(host))) {
            return res.status(400).json({
              success: false,
              error: 'Invalid callback URL'
            });
          }
        }
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: 'Invalid callback URL format'
        });
      }
    }

    // Валидация адреса кошелька в зависимости от сети
    const networkType = network || 'trc20';
    const cryptoType = cryptocurrency || 'usdt';
    
    if (networkType === 'trc20') {
      // Tron адреса начинаются с T и имеют 34 символа
      if (!walletAddress.startsWith('T') || walletAddress.length !== 34) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Tron wallet address format. Tron addresses start with T and are 34 characters long.'
        });
      }
    } else if (networkType === 'erc20') {
      // Ethereum адреса начинаются с 0x и имеют 42 символа
      if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Ethereum wallet address format. Ethereum addresses start with 0x and are 42 characters long.'
        });
      }
    } else if (networkType === 'bitcoin') {
      // Bitcoin адреса начинаются с 1, 3, или bc1 и имеют 26-62 символа
      if (!(walletAddress.startsWith('1') || walletAddress.startsWith('3') || walletAddress.startsWith('bc1')) || 
          walletAddress.length < 26 || walletAddress.length > 62) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Bitcoin wallet address format. Bitcoin addresses start with 1, 3, or bc1 and are 26-62 characters long.'
        });
      }
    }

    // Генерируем уникальный ID платежа
    const paymentId = `direct_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Создаем прямой URL для оплаты через виджет провайдера
    let paymentUrl = '';
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const returnUrl = `${baseUrl}/payment-success?payment_id=${paymentId}`;
    
    // Только Bitcoin для MoonPay
    const cryptoCode = 'BTC';
    const networkName = 'bitcoin';
    const currencyCode = 'btc';
    
    // MoonPay - используем прямую ссылку на покупку Bitcoin
    const moonpayApiKey = process.env.MOONPAY_API_KEY;
    if (moonpayApiKey && !/YOUR_KEY|test|xxx/i.test(moonpayApiKey)) {
      // С API ключом - полная интеграция через виджет
      paymentUrl = `https://buy.moonpay.com/?apiKey=${moonpayApiKey}&currencyCode=${currencyCode}&walletAddress=${walletAddress}&baseCurrencyAmount=${amount}&email=${encodeURIComponent(email)}&redirectURL=${encodeURIComponent(returnUrl)}`;
    } else {
      // Без ключа - прямая ссылка на покупку Bitcoin
      paymentUrl = `https://buy.moonpay.com/?currencyCode=${currencyCode}&walletAddress=${walletAddress}&baseCurrencyAmount=${amount}&email=${encodeURIComponent(email)}`;
    }

    // Сохраняем информацию о платеже
    const paymentData = {
      paymentId,
      walletAddress, // Прямой кошелек, без промежуточных адресов
      amount,
      currency,
      provider,
      email,
      callbackUrl: callbackUrl || `${baseUrl}/api/callback`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // В реальном приложении здесь сохраняем в БД
    console.log('Direct payment created:', paymentData);

    res.json({
      success: true,
      paymentId: paymentId,
      paymentUrl: paymentUrl,
      walletData: {
        finalWallet: walletAddress, // Прямой кошелек клиента
        provider: provider,
        providerName: PROVIDERS[provider].name,
        direct: true // Флаг прямой интеграции
      },
      message: 'Direct payment URL created. Funds will be sent directly to your wallet address.'
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// Callback endpoint (общий)
app.post('/api/callback', (req, res) => {
  try {
    const { payment_id, status, amount, transaction_id } = req.body;

    console.log('Payment callback received:', {
      payment_id,
      status,
      amount,
      transaction_id
    });

    res.json({
      success: true,
      message: 'Callback received'
    });
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Страница успешного платежа
// Payment success page - редирект на payment.html с параметрами успеха
app.get('/payment-success', (req, res) => {
  const paymentId = req.query.payment_id || '';
  // Редиректим сразу на payment.html с параметрами успешной оплаты
  res.redirect(`/payment.html?status=success&payment_id=${encodeURIComponent(paymentId)}`);
});

// Проверить статус платежа
app.get('/api/payment-status/:paymentId', (req, res) => {
  res.json({
    success: true,
    status: 'pending',
    message: 'Payment status check endpoint'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mode: 'direct-integration' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`✅ Direct payment gateway (NO card2crypto.org)`);
  console.log(`✅ Funds go directly to your wallet`);
  console.log(`Telegram Mini App URL: http://localhost:${PORT}`);
});

