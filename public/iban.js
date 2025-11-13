let tg = null;
let user = {};

const state = {
    params: {},
    invoice: null,
    requisites: null,
    status: null,
    requisitesTimer: null,
    statusTimer: null
};

const API = {
    invoices: '/api/payou/invoices',
    status: (orderId, searchBy) => {
        const suffix = searchBy ? `?searchBy=${encodeURIComponent(searchBy)}` : '';
        return `/api/payou/status/${encodeURIComponent(orderId)}${suffix}`;
    }
};

const REQUISITE_LABELS = {
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    swift: 'SWIFT',
    bank: 'Banka',
    bank_name: 'Banka',
    wallet_owner: 'Alıcı',
    holder: 'Alıcı',
    name: 'Alıcı',
    card: 'Kart numarası',
    account: 'Hesap',
    account_number: 'Hesap',
    reference: 'Açıklama',
    comment: 'Açıklama',
    purpose: 'Açıklama',
    sbp_bank: 'Banka (SBP)',
    amount: 'Tutar',
    tg_country: 'Banka',
    currency: 'Para birimi'
};

function translateKey(key, fallback) {
    try {
        if (typeof t === 'function') {
            const value = t(key);
            if (value && value !== key) return value;
        }
    } catch (error) {
        console.warn('Translation error', key, error);
    }
    return fallback;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
    return escapeHtml(value).replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
}

function parseBoolean(value, defaultValue = false) {
    if (typeof value === 'undefined' || value === null) return defaultValue;
    if (typeof value === 'boolean') return value;
    const normalized = String(value).trim().toLowerCase();
    if (['', '0', 'false', 'no', 'off'].includes(normalized)) return false;
    if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
    return defaultValue;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatAmountValue(amount) {
    const numeric = Number(amount);
    if (Number.isNaN(numeric) || !Number.isFinite(numeric)) {
        return null;
    }
    return numeric.toFixed(2);
}

function formatCurrency(amount, currency = 'TRY', locale) {
    const numeric = Number(amount);
    if (Number.isNaN(numeric) || !Number.isFinite(numeric)) {
        return '-';
    }
    try {
        return new Intl.NumberFormat(locale || undefined, {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numeric);
    } catch (error) {
        return `${numeric.toFixed(2)} ${currency.toUpperCase()}`;
    }
}

function getWidgetElements() {
    return {
        root: document.getElementById('ibanWidgetRoot'),
        message: document.getElementById('ibanWidgetMessage'),
        placeholder: document.querySelector('#ibanWidgetRoot .widget-placeholder')
    };
}

function initTelegramWebApp() {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            tg = window.Telegram.WebApp;
            if (tg.ready) tg.ready();
            if (tg.expand) tg.expand();
            if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
                user = tg.initDataUnsafe.user;
            }
        }
    } catch (error) {
        console.warn('Telegram init failed:', error);
    }
}

function enforceDarkTheme() {
    const html = document.documentElement;
    const body = document.body;
    html.setAttribute('data-theme', 'dark');
    body.classList.add('dark-theme-active');
}

function updateIbanTranslations() {
    if (typeof t !== 'function') return;

    const titleEl = document.getElementById('ibanPageTitle');
    const subtitleEl = document.getElementById('ibanPageSubtitle');
    const placeholderMessage = document.getElementById('ibanWidgetMessage');

    const localeMap = {
        tr: 'tr-TR'
    };

    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : state.params.lang;
    if (currentLang) {
        state.params.lang = currentLang;
        state.params.locale = localeMap[currentLang] || state.params.locale;
        if (!state.params.currency) {
            state.params.currency = 'TRY';
        }
    }

    if (titleEl) titleEl.textContent = t('ibanPageTitle');
    if (subtitleEl) subtitleEl.textContent = t('ibanPageSubtitle');
    if (placeholderMessage && !state.invoice) {
        placeholderMessage.textContent = translateKey('ibanLoadingRequisites', 'Ödeme bilgileri yükleniyor...');
    }

    if (state.invoice) {
        renderInvoice();
        renderStatus(state.status, { silent: !state.status });
    }
}

function setupLanguageSelector() {
    if (typeof window.setLanguage === 'function') {
        window.setLanguage('tr');
    } else if (typeof setLanguage === 'function') {
        setLanguage('tr');
    } else {
        updateIbanTranslations();
    }
}

function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const amountParam = params.get('amount') || params.get('summ') || params.get('sum') || '2400';
    const amount = formatAmountValue(amountParam);

    const lang = 'tr';
    const localeMap = {
        tr: 'tr-TR'
    };

    const rawCurrency =
        params.get('currency') ||
        params.get('cur') ||
        'TRY';

    return {
        amount,
        rawAmount: amountParam,
        currency: rawCurrency,
        orderId: params.get('orderId') || params.get('order_id') || null,
        comment: params.get('comment') || params.get('Coment') || '',
        userEmail: params.get('userEmail') || params.get('user_email') || params.get('email') || '',
        userCode: params.get('userCode') || params.get('user_code') || '',
        system: params.get('system') || params.get('sistems') || '',
        fetchRequisites: params.get('fetchRequisites'),
        trackStatus: params.get('trackStatus') || params.get('watch'),
        statusSearchBy: params.get('statusSearchBy') || params.get('searchBy') || 'internal',
        statusInterval: params.get('statusInterval'),
        initialStatus: params.get('status') || '',
        lang,
        locale: localeMap[lang],
        rawParams: params
    };
}

function buildInvoiceRequestBody(params, options = {}) {
    const body = {
        amount: params.amount,
        fetchRequisites: parseBoolean(params.fetchRequisites, true)
    };

    if (params.userEmail) body.userEmail = params.userEmail;
    if (params.userCode) body.userCode = params.userCode;
    if (params.comment) body.comment = params.comment;
    if (params.system) body.system = params.system;

    if (options.orderId) {
        body.orderId = options.orderId;
    } else if (params.orderId) {
        body.orderId = params.orderId;
    }

    return body;
}

function normalizeRequisites(data) {
    if (!data) return [];

    if (data.status === 'processing') {
        return [{ type: 'processing' }];
    }

    if (data.status === 'error') {
        return [{
            type: 'error',
            message: data.message || translateKey('ibanRequisitesError', 'Ödeme bilgileri alınamadı')
        }];
    }

const buildMultiline = (lines) => {
        const filtered = lines.map((line) => String(line || '').trim()).filter(Boolean);
        if (!filtered.length) return [];
        return [{
            type: 'multiline',
            label: translateKey('ibanRequisitesDetails', 'Ödeme bilgileri'),
            value: filtered.join('\n')
        }];
    };

    if (Array.isArray(data)) {
        return buildMultiline(data);
    }

    const entries = Object.entries(data)
        .filter(([key, value]) => (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            typeof value !== 'object' &&
            key !== 'status' &&
            key !== 'success'
        ));

    if (!entries.length) {
        return [];
    }

    const numericEntries = entries.filter(([key]) => /^\d+$/.test(key));
    if (numericEntries.length && numericEntries.length === entries.length) {
        const sorted = numericEntries
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(([, value]) => String(value || ''));

        if (sorted.every((value) => value.length <= 2)) {
            const combined = sorted.join('').trim();
            if (combined.length) {
                const normalizedMessage = combined.toLowerCase();
                let messageKey = 'ibanRequisitesMessage';
                if (normalizedMessage.includes('moder')) {
                    messageKey = 'ibanRequisitesModeration';
                } else if (normalizedMessage.includes('error')) {
                    messageKey = 'ibanRequisitesErrorMessage';
                }
                return [{
                    type: 'message',
                    message: combined,
                    messageKey
                }];
            }
        }

        return buildMultiline(sorted);
    }

    return entries.map(([key, value]) => ({
        type: 'field',
        key,
        label: REQUISITE_LABELS[key] || key.replace(/_/g, ' ').toUpperCase(),
        value: String(value)
    }));
}

function buildControls() {
    const amountValue = state.params.amount ? Number(state.params.amount) : '';
    const emailValue = state.params.userEmail || '';
    return `
        <div class="iban-controls">
            <div class="iban-control-field">
                <label class="iban-control-label" for="ibanAmountInput">${translateKey('ibanAmountLabel', 'Ödenecek tutar')}</label>
                <input type="number" inputmode="decimal" step="0.01" min="0" id="ibanAmountInput" class="iban-control-input" value="${amountValue}">
                <div class="iban-control-hint">${translateKey('ibanAmountHint', 'Tutar TRY cinsinden girilmelidir')}</div>
            </div>
            <div class="iban-control-field">
                <label class="iban-control-label" for="ibanEmailInput">${translateKey('ibanEmailLabel', 'Müşteri e-postası')}</label>
                <input type="email" id="ibanEmailInput" class="iban-control-input" value="${escapeAttr(emailValue)}">
            </div>
            <div class="iban-control-actions">
                <button class="btn btn-primary" type="button" id="ibanGenerateInvoiceBtn">${translateKey('ibanGenerateInvoice', 'Bilgileri al')}</button>
            </div>
        </div>
    `;
}

function renderInvoice() {
    const { root } = getWidgetElements();
    if (!root) return;

    const controls = buildControls();
    root.innerHTML = `
        <div class="iban-widget">
            ${controls}
        </div>
    `;

    attachEventHandlers();
}

function attachEventHandlers() {
    const generateBtn = document.getElementById('ibanGenerateInvoiceBtn');
    const amountInput = document.getElementById('ibanAmountInput');
    const emailInput = document.getElementById('ibanEmailInput');

    if (generateBtn) {
        generateBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const amountValueRaw = amountInput ? amountInput.value.trim() : '';
            const emailValue = emailInput ? emailInput.value.trim() : '';

            const formattedAmount = formatAmountValue(amountValueRaw);
            if (!formattedAmount || Number(formattedAmount) <= 0) {
                alert(translateKey('ibanAmountInvalid', 'Lütfen 0\'dan büyük geçerli bir tutar girin.'));
                return;
            }

            if (emailValue && !isValidEmail(emailValue)) {
                alert(translateKey('ibanEmailInvalid', 'Lütfen geçerli bir e-posta adresi girin.'));
                return;
            }

            state.params.amount = formattedAmount;
            state.params.rawAmount = formattedAmount;
            state.params.userEmail = emailValue || '';
            state.params.currency = 'TRY';
            state.params.orderId = `iban_${Date.now()}`;
            state.params.userCode = state.params.userEmail || state.params.orderId;

            renderInvoice();
            createInvoice(true);
        });
    }
}

function normalizeStatusData(statusData) {
    if (!statusData) {
        return {
            status: 'unknown',
            message: translateKey('ibanStatusUnknown', 'Durum mevcut değil')
        };
    }

    if (typeof statusData === 'string') {
        return {
            status: statusData,
            message: translateKey(`ibanStatus_${statusData}`, statusData)
        };
    }

    const status = statusData.status || statusData.result || statusData.state || 'unknown';
    let message = statusData.message || translateKey(`ibanStatus_${status}`, status);

    if (status === 'success') {
        message = translateKey('ibanStatusSuccessMessage', 'Havale başarıyla onaylandı');
    } else if (status === 'processing') {
        message = translateKey('ibanStatusProcessingMessage', 'Ödeme işleniyor, lütfen onay için bekleyin');
    } else if (status === 'cancelled') {
        message = translateKey('ibanStatusCancelledMessage', 'Ödeme iptal edildi veya onaylanmadı');
    }

    return {
        status,
        message
    };
}

function renderStatus(statusData, { silent = false } = {}) {
    const card = document.getElementById('ibanStatusCard');
    const valueEl = document.getElementById('ibanStatusValue');
    if (!card || !valueEl) return;

    if (!statusData && silent) {
        card.hidden = true;
        return;
    }

    const normalized = normalizeStatusData(statusData);
    card.hidden = false;
    valueEl.textContent = normalized.message;
    valueEl.dataset.status = normalized.status;
}

function clearTimers() {
    if (state.requisitesTimer) {
        clearTimeout(state.requisitesTimer);
        state.requisitesTimer = null;
    }
    if (state.statusTimer) {
        clearTimeout(state.statusTimer);
        state.statusTimer = null;
    }
}

async function createInvoice(initial = false) {
    try {
        const body = buildInvoiceRequestBody(state.params, {
            orderId: initial ? state.params.orderId : state.invoice?.orderId
        });

        const response = await fetch(API.invoices, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error || translateKey('ibanInvoiceError', 'Ödeme bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.'));
        }

        state.invoice = data.invoice;
        const formUrl = data.invoice?.redirectUrl || data.invoice?.payouFormUrl;
        if (formUrl) {
            window.location.href = formUrl;
            return;
        }

        throw new Error(translateKey('ibanNoPaymentUrl', 'Ödeme bağlantısı mevcut değil.'));
    } catch (error) {
        console.error('Invoice creation failed', error);
        alert(error?.message || translateKey('ibanInvoiceError', 'Ödeme bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.'));
    }
}

async function refreshRequisites(manual = false) {
    if (!state.invoice) return;
    if (manual) {
        renderInvoice();
    }
    await createInvoice(false);
}

async function pollStatus(force = false) {
    if (!state.invoice?.orderId) return;
    try {
        const url = API.status(state.invoice.orderId, state.params.statusSearchBy);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        state.status = data.status;
        renderStatus(state.status);

        const normalized = normalizeStatusData(state.status);
        if (normalized.status === 'success' || normalized.status === 'cancelled') {
            state.statusTimer = null;
            return;
        }

        if (force) return;

        const interval = parseInt(state.params.statusInterval, 10);
        const delay = Number.isNaN(interval) ? 15000 : Math.max(interval, 5000);

        state.statusTimer = setTimeout(() => pollStatus(false), delay);
    } catch (error) {
        console.error('Status check failed', error);
        if (force) {
            alert(translateKey('ibanStatusFetchError', 'Durum alınamadı. Lütfen daha sonra tekrar deneyin.'));
        }
    }
}

function startStatusPolling() {
    if (state.statusTimer) {
        clearTimeout(state.statusTimer);
    }
    pollStatus(false);
}

function bootstrapInvoiceFlow() {
    state.params = parseQueryParams();
    state.params.currency = (state.params.currency || 'TRY').toUpperCase();
    if (!state.params.orderId) {
        state.params.orderId = `iban_${Date.now()}`;
    }
    if (!state.params.userCode) {
        state.params.userCode = state.params.orderId;
    }

    const shouldAutoCreate =
        state.params.rawParams?.get('auto') === '1' ||
        state.params.rawParams?.get('autostart') === '1';

    renderInvoice();

    if (shouldAutoCreate) {
        createInvoice(true);
    }
}

function initIbanPage() {
    initTelegramWebApp();
    enforceDarkTheme();
    setupLanguageSelector();
    updateIbanTranslations();
    if (!state.params.currency) {
        state.params.currency = 'TRY';
    }
    bootstrapInvoiceFlow();
    window.requestAnimationFrame(() => document.body.classList.add('iban-ready'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIbanPage);
} else {
    initIbanPage();
}

window.addEventListener('beforeunload', clearTimers);

