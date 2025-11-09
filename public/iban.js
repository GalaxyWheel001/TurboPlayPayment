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
    bank: 'Банк',
    bank_name: 'Банк',
    wallet_owner: 'Получатель',
    holder: 'Получатель',
    name: 'Получатель',
    card: 'Номер карты',
    account: 'Счёт',
    account_number: 'Счёт',
    reference: 'Назначение платежа',
    comment: 'Назначение платежа',
    purpose: 'Назначение платежа',
    sbp_bank: 'Банк (СБП)',
    amount: 'Сумма',
    tg_country: 'Банк',
    currency: 'Валюта'
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

function formatAmountValue(amount) {
    const numeric = Number(amount);
    if (Number.isNaN(numeric) || !Number.isFinite(numeric)) {
        return null;
    }
    return numeric.toFixed(2);
}

function formatCurrency(amount, currency = 'RUB') {
    const numeric = Number(amount);
    if (Number.isNaN(numeric) || !Number.isFinite(numeric)) {
        return '-';
    }
    try {
        return new Intl.NumberFormat(undefined, {
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

function setWidgetMessage(text, type = 'info') {
    const { message } = getWidgetElements();
    if (!message) return;
    message.textContent = text;
    message.classList.remove('widget-error', 'widget-success');
    if (type === 'error') message.classList.add('widget-error');
    if (type === 'success') message.classList.add('widget-success');
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

function applyTheme(theme) {
    const html = document.documentElement;
    const body = document.body;
    const icon = document.getElementById('themeIcon');

    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        body.classList.add('dark-theme-active');
        if (icon) icon.innerHTML = '<use href="#icon-moon"></use>';
    } else {
        html.setAttribute('data-theme', 'light');
        body.classList.remove('dark-theme-active');
        if (icon) icon.innerHTML = '<use href="#icon-theme"></use>';
    }
}

function setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');

    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(theme);

    toggle.addEventListener('click', (event) => {
        event.preventDefault();
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);

        if (tg && tg.HapticFeedback) {
            try {
                tg.HapticFeedback.impactOccurred('light');
            } catch (err) {
                console.warn('Haptic feedback failed:', err);
            }
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
}

function updateIbanTranslations() {
    if (typeof t !== 'function') return;

    const titleEl = document.getElementById('ibanPageTitle');
    const subtitleEl = document.getElementById('ibanPageSubtitle');

    if (titleEl) titleEl.textContent = t('ibanPageTitle');
    if (subtitleEl) subtitleEl.textContent = t('ibanPageSubtitle');
}

function setupLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    if (!selector) return;

    const savedLang = localStorage.getItem('paymentLanguage') || localStorage.getItem('selectedLanguage');
    const userLang = user.language_code?.split('-')[0];
    const langMap = { ru: 'ru', tr: 'tr', de: 'de', es: 'es', pt: 'pt', en: 'en' };
    const detected = langMap[userLang] || 'en';
    const current = savedLang || detected;

    selector.value = current;
    if (typeof window.setLanguage === 'function') {
        window.setLanguage(current);
    }
    updateIbanTranslations();

    selector.addEventListener('change', (event) => {
        const lang = event.target.value;
        if (typeof window.setLanguage === 'function') {
            window.setLanguage(lang);
        }
        updateIbanTranslations();

        if (tg && tg.HapticFeedback) {
            try {
                tg.HapticFeedback.impactOccurred('light');
            } catch (err) {
                console.warn('Haptic feedback failed:', err);
            }
        }
    });
}

function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const amountParam = params.get('amount') || params.get('summ') || params.get('sum') || '2400';
    const amount = formatAmountValue(amountParam);
    const rawCurrency = params.get('currency') || params.get('cur') || 'RUB';

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
            message: data.message || translateKey('ibanRequisitesError', 'Не удалось получить реквизиты')
        }];
    }

    const buildMultiline = (lines) => {
        const filtered = lines.map((line) => String(line || '').trim()).filter(Boolean);
        if (!filtered.length) return [];
        return [{
            type: 'multiline',
            label: translateKey('ibanRequisitesDetails', 'Реквизиты'),
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
            .map(([, value]) => value);
        return buildMultiline(sorted);
    }

    return entries.map(([key, value]) => ({
        type: 'field',
        key,
        label: REQUISITE_LABELS[key] || key.replace(/_/g, ' ').toUpperCase(),
        value: String(value)
    }));
}

function renderRequisites(data) {
    const normalized = normalizeRequisites(data);

    if (!normalized.length) {
        return `<p class="placeholder-text">${translateKey('ibanNoRequisites', 'Реквизиты недоступны. Обратитесь в поддержку.')}</p>`;
    }

    if (normalized[0].type === 'processing') {
        return `<p class="placeholder-text">${translateKey('ibanRequisitesProcessing', 'Реквизиты формируются. Попробуйте обновить через несколько секунд.')}</p>`;
    }

    if (normalized[0].type === 'error') {
        return `<p class="placeholder-text widget-error">${escapeHtml(normalized[0].message)}</p>`;
    }

    const copyLabel = translateKey('ibanCopy', 'Копировать');

    const items = normalized.map((item) => {
        if (item.type === 'multiline') {
            const labelHtml = item.label
                ? `<span class="requisite-label">${escapeHtml(item.label)}</span>`
                : '';
            return `
            <div class="requisite-item">
                <div class="requisite-main">
                    ${labelHtml}
                    <pre class="requisite-value requisite-value--multiline">${escapeHtml(item.value)}</pre>
                </div>
                <button class="btn-ghost" type="button" data-copy="${escapeAttr(item.value)}">${copyLabel}</button>
            </div>
        `;
        }

        const label = item.label || item.key;
        const displayValue = escapeHtml(item.value);
        return `
            <div class="requisite-item">
                <div class="requisite-main">
                    <span class="requisite-label">${escapeHtml(label)}</span>
                    <span class="requisite-value" data-value="${escapeAttr(value)}">${displayValue}</span>
                </div>
                <button class="btn-ghost" type="button" data-copy="${escapeAttr(item.value)}">${copyLabel}</button>
            </div>
        `;
    });

    return `<div class="requisites-list">${items.join('')}</div>`;
}

function renderInvoice() {
    const { root } = getWidgetElements();
    if (!root || !state.invoice) return;

    const amountFormatted = formatCurrency(
        state.invoice.amount || state.params.amount,
        state.params.currency || 'RUB'
    );

    const requisitesHtml = renderRequisites(state.requisites);
    const orderId = state.invoice.orderId;
    const commentRow = state.params.comment
        ? `
            <div class="summary-row">
                <span class="summary-label">${translateKey('ibanCommentLabel', 'Назначение платежа')}</span>
                <span class="summary-value">${escapeHtml(state.params.comment)}</span>
            </div>
        `
        : '';

    root.innerHTML = `
        <div class="iban-widget">
            <div class="iban-summary">
                <div class="summary-row">
                    <span class="summary-label">${translateKey('ibanAmountLabel', 'Сумма к оплате')}</span>
                    <span class="summary-value">${escapeHtml(amountFormatted)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">${translateKey('ibanOrderIdLabel', 'Номер заявки')}</span>
                    <span class="summary-value">${escapeHtml(orderId)}</span>
                </div>
                ${commentRow}
            </div>

            <div class="iban-requisites">
                <div class="section-heading-row">
                    <h3 class="section-heading">${translateKey('ibanRequisitesTitle', 'Реквизиты для оплаты')}</h3>
                    <button class="btn btn-secondary" type="button" id="ibanRefreshRequisitesBtn">
                        ${translateKey('ibanRefreshRequisites', 'Обновить')}
                    </button>
                </div>
                ${requisitesHtml}
            </div>

            <div class="iban-actions">
                <button class="btn btn-primary" type="button" id="ibanOpenPaymentBtn">
                    ${translateKey('ibanOpenPayment', 'Перейти к оплате')}
                </button>
                <button class="btn-ghost" type="button" id="ibanCopyOrderBtn">
                    ${translateKey('ibanCopyOrderId', 'Скопировать ID')}
                </button>
            </div>

            <div class="iban-status" id="ibanStatusCard" hidden>
                <div class="status-label">${translateKey('ibanStatusLabel', 'Статус платежа')}</div>
                <div class="status-value" id="ibanStatusValue"></div>
                <div class="status-actions">
                    <button class="btn btn-secondary" type="button" id="ibanCheckStatusBtn">
                        ${translateKey('ibanCheckStatus', 'Проверить статус')}
                    </button>
                </div>
            </div>
        </div>
    `;

    attachEventHandlers();
    renderStatus(state.status, { silent: true });
}

function attachEventHandlers() {
    const openPaymentBtn = document.getElementById('ibanOpenPaymentBtn');
    const refreshBtn = document.getElementById('ibanRefreshRequisitesBtn');
    const copyOrderBtn = document.getElementById('ibanCopyOrderBtn');
    const statusBtn = document.getElementById('ibanCheckStatusBtn');

    if (openPaymentBtn) {
        openPaymentBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (state.invoice?.redirectUrl) {
                window.open(state.invoice.redirectUrl, '_blank', 'noopener');
            } else {
                alert(translateKey('ibanNoPaymentUrl', 'Ссылка на страницу оплаты недоступна.'));
            }
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', (event) => {
            event.preventDefault();
            refreshRequisites(true);
        });
    }

    if (copyOrderBtn) {
        copyOrderBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            if (!navigator.clipboard) return;
            try {
                await navigator.clipboard.writeText(state.invoice?.orderId || '');
            } catch (error) {
                console.warn('Failed to copy order id', error);
            }
        });
    }

    if (statusBtn) {
        statusBtn.addEventListener('click', (event) => {
            event.preventDefault();
            pollStatus(true);
        });
    }

    document.querySelectorAll('[data-copy]').forEach((btn) => {
        btn.addEventListener('click', async (event) => {
            event.preventDefault();
            const value = btn.getAttribute('data-copy') || '';
            try {
                await navigator.clipboard.writeText(value);
                btn.textContent = translateKey('ibanCopied', 'Скопировано');
                setTimeout(() => {
                    btn.textContent = translateKey('ibanCopy', 'Копировать');
                }, 2000);
            } catch (error) {
                console.warn('Copy failed', error);
            }
        });
    });
}

function normalizeStatusData(statusData) {
    if (!statusData) {
        return {
            status: 'unknown',
            message: translateKey('ibanStatusUnknown', 'Статус не определён')
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
        message = translateKey('ibanStatusSuccessMessage', 'Оплата успешно подтверждена');
    } else if (status === 'processing') {
        message = translateKey('ibanStatusProcessingMessage', 'Платёж в обработке, ожидайте подтверждения');
    } else if (status === 'cancelled') {
        message = translateKey('ibanStatusCancelledMessage', 'Платёж отменён или не прошёл проверку');
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
            throw new Error(data.error || 'Failed to create invoice');
        }

        state.invoice = data.invoice;
        state.requisites = data.requisites;
        state.params.orderId = data.invoice?.orderId || state.params.orderId;

        renderInvoice();

        if (state.requisites?.status === 'processing') {
            state.requisitesTimer = setTimeout(() => refreshRequisites(false), 4000);
        }

        if (state.params.trackStatus && parseBoolean(state.params.trackStatus, false)) {
            startStatusPolling();
        } else if (state.status) {
            renderStatus(state.status);
        }
    } catch (error) {
        console.error('Invoice creation failed', error);
        setWidgetMessage(
            translateKey('ibanInvoiceError', 'Не удалось получить реквизиты. Попробуйте позже.'),
            'error'
        );
    }
}

async function refreshRequisites(manual = false) {
    if (!state.invoice) return;
    if (manual) {
        const { placeholder } = getWidgetElements();
        if (!placeholder) {
            setWidgetMessage(translateKey('ibanRequisitesRefreshing', 'Обновляем реквизиты...'));
        }
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
            alert(translateKey('ibanStatusFetchError', 'Не удалось получить статус. Попробуйте позже.'));
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

    if (state.params.initialStatus) {
        state.status = { status: state.params.initialStatus };
    }

    createInvoice(true);
}

function initIbanPage() {
    initTelegramWebApp();
    setupThemeToggle();
    setupLanguageSelector();
    updateIbanTranslations();
    bootstrapInvoiceFlow();
    window.requestAnimationFrame(() => document.body.classList.add('iban-ready'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIbanPage);
} else {
    initIbanPage();
}

window.addEventListener('beforeunload', clearTimers);

