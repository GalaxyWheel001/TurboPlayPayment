const DEFAULT_PROTOCOL = (process.env.SITE_PROTOCOL || 'https').replace(/:\/\/?$/, '');
const RAW_DOMAIN = process.env.SITE_DOMAIN || 'turboplay.world';

const domain = RAW_DOMAIN
  .replace(/^https?:\/\//i, '')
  .replace(/\/$/, '')
  .toLowerCase();

const protocol = DEFAULT_PROTOCOL === 'http' ? 'http' : 'https';
const baseUrl = `${protocol}://${domain}`;

const rawHandlerPath = process.env.IBAN_HANDLER_PATH || '/api/callback';
const handlerPath = rawHandlerPath.startsWith('/') ? rawHandlerPath : `/${rawHandlerPath}`;

const rawSuccessPath = process.env.IBAN_SUCCESS_PATH || '/iban/success';
const successPath = rawSuccessPath.startsWith('/') ? rawSuccessPath : `/${rawSuccessPath}`;

const rawFailurePath = process.env.IBAN_FAILURE_PATH || '/iban/failure';
const failurePath = rawFailurePath.startsWith('/') ? rawFailurePath : `/${rawFailurePath}`;

const integrationConfig = {
  name: process.env.SITE_NAME || '',
  domain,
  protocol,
  baseUrl,
  secretKey: process.env.INTEGRATION_SECRET_KEY || process.env.IBAN_SECRET_KEY || '',
  handlerPath,
  successPath,
  failurePath,
  get handlerUrl() {
    return `${baseUrl}${handlerPath}`;
  },
  get successUrl() {
    return `${baseUrl}${successPath}`;
  },
  get failureUrl() {
    return `${baseUrl}${failurePath}`;
  },
  toJSON() {
    return {
      name: this.name,
      domain: this.domain,
      protocol: this.protocol,
      baseUrl: this.baseUrl,
      handlerUrl: this.handlerUrl,
      successUrl: this.successUrl,
      failureUrl: this.failureUrl,
      secretKey: this.secretKey
    };
  }
};

module.exports = integrationConfig;

