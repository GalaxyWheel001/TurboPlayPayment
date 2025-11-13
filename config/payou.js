const assertEnv = (value, message) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    throw new Error(message);
  }
  return value;
};

const payouConfig = {
  apiUrl: process.env.PAYOU_API_URL || 'https://payou.pro/api/new/api.php',
  merchantId: process.env.PAYOU_MERCHANT_ID,
  secretKey: process.env.PAYOU_SECRET_KEY,
  iban: process.env.PAYOU_IBAN || '',
  callbackUrl: process.env.PAYOU_CALLBACK_URL || '',
  defaultSystem: process.env.PAYOU_DEFAULT_SYSTEM || 'card_ru_rand_card',
  redirectUrl: 'https://payou.pro/sci/v1/',
  statusUrl: 'https://payou.pro/api/status',
  statusExternalUrl: 'https://payou.pro/api/status2',
  confirmUrl: 'https://payou.pro/api/new/confirm_payment.php',
  fallbackEmailDomain: process.env.PAYOU_FALLBACK_EMAIL_DOMAIN || 'turboplay.world'
};

payouConfig.requireBasics = () => {
  assertEnv(payouConfig.merchantId, 'Missing PAYOU_MERCHANT_ID env variable');
  assertEnv(payouConfig.secretKey, 'Missing PAYOU_SECRET_KEY env variable');
  return true;
};

module.exports = payouConfig;


