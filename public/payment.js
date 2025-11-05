// Telegram Web App API
let tg = window.Telegram.WebApp;

// Инициализация Telegram Mini App
if (tg && tg.ready) {
    tg.ready();
    tg.expand();
}

// Получить данные пользователя из Telegram
const user = tg?.initDataUnsafe?.user || {};
const userEmail = user.email || '';

// Конфигурация платежа (можно изменить через URL параметры)
const urlParams = new URLSearchParams(window.location.search);

// Значения по умолчанию - Bitcoin
const DEFAULT_AMOUNT = 50;
const DEFAULT_CURRENCY = 'USD';
const DEFAULT_NETWORK = 'bitcoin';
const DEFAULT_CRYPTO = 'btc';

// Кошелек Bitcoin
const DEFAULT_WALLETS = {
    bitcoin: 'bc1qz72xtj5yscxdldrp6k6dvejav8xsln8jp9dz6s', // Bitcoin
};

// Получить параметры из URL или использовать значения по умолчанию
const PAYMENT_CONFIG = {
    amount: parseFloat(urlParams.get('amount')) || DEFAULT_AMOUNT,
    currency: urlParams.get('currency') || DEFAULT_CURRENCY,
    network: urlParams.get('network') || DEFAULT_NETWORK,
    cryptocurrency: urlParams.get('crypto') || DEFAULT_CRYPTO,
    walletAddress: urlParams.get('wallet') || DEFAULT_WALLETS[DEFAULT_NETWORK]
};

// Валидация Bitcoin адресов
function validateBitcoinAddress(address) {
    return address.length >= 26 && address.length <= 62 && 
           (address.startsWith('1') || address.startsWith('3') || address.startsWith('bc1'));
}

// API базовый URL
const API_BASE_URL = window.location.origin;

// Получить API путь (для Netlify Functions или обычного API)
function getApiPath(endpoint) {
    // На Netlify используем прокси через /api/
    // Netlify автоматически перенаправит на /.netlify/functions/
    // Используем полный URL для надежности
    return `${API_BASE_URL}/api/${endpoint}`;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    // Убедиться, что модальное окно скрыто при загрузке (если платеж не был создан)
    const paymentResult = document.getElementById('paymentResult');
    if (paymentResult) {
        paymentResult.style.display = 'none';
    }
    
    // Проверить, есть ли параметр успешной оплаты в URL
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('status');
    const paymentId = urlParams.get('payment_id');
    
    // Если платеж успешно завершен, показать модальное окно
    if (paymentStatus === 'success' && paymentId) {
        showPaymentSuccess({
            paymentId: paymentId,
            status: 'success'
        });
    }
    
    // Настройка селектора языка
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        // Автоопределение языка из Telegram или сохраненный выбор
        const savedLang = localStorage.getItem('selectedLanguage');
        const userLang = user.language_code?.split('-')[0] || 'en';
        const langMap = { ru: 'ru', tr: 'tr', de: 'de', es: 'es', pt: 'pt', en: 'en' };
        const detectedLang = langMap[userLang] || 'en';
        languageSelector.value = savedLang || getCurrentLanguage() || detectedLang;
        setLanguage(languageSelector.value);
        
        // Save language selection
        languageSelector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            localStorage.setItem('selectedLanguage', e.target.value);
        });
        
    }

    // Обновить переводы
    updateTranslations();
    
    // Setup email validation
    setupEmailValidation();

    // Установить кошелек по умолчанию (Bitcoin)
    PAYMENT_CONFIG.walletAddress = DEFAULT_WALLETS.bitcoin;
    document.getElementById('walletAddress').value = PAYMENT_CONFIG.walletAddress;

    // Установить сумму в отображении
    document.getElementById('displayAmount').textContent = formatAmount(PAYMENT_CONFIG.amount, PAYMENT_CONFIG.currency);

    // Заполнить email из Telegram если доступен
    if (userEmail) {
        document.getElementById('email').value = userEmail;
    }
    
    // Setup Dark Mode - должен быть вызван первым
    setupDarkMode();
    
    // Установить тему Telegram только если темная тема не активна
    if (tg && tg.themeParams) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme !== 'dark') {
            // Применить тему Telegram только для светлой темы
            document.body.style.backgroundColor = tg.themeParams.bg_color || '#ffffff';
            document.body.style.color = tg.themeParams.text_color || '#000000';
        }
    }
});

// Удалены функции выбора сети/криптовалюты - теперь только Bitcoin

// Форматирование суммы по локали
function formatAmount(amount, currency) {
    try {
        return new Intl.NumberFormat(getCurrentLanguage() || 'en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    } catch (e) {
        return `${amount.toFixed(2)} ${currency}`;
    }
}

// QR-код удален по требованию. Функции больше не используются.

// Копировать адрес кошелька - теперь использует улучшенную версию ниже


// Загрузить список провайдеров - теперь использует улучшенную версию ниже

// Создать платеж
async function createPayment(providerName = 'moonpay') {
    const email = document.getElementById('email').value.trim();
    const walletAddress = PAYMENT_CONFIG.walletAddress;
    const provider = providerName || 'moonpay'; // Только MoonPay

    // Валидация
    if (!email) {
        showToast(t('emailRequired') || 'Please enter your email address', 'warning');
        return;
    }
    
    // Email validation
    if (!validateEmail(email)) {
        showToast(t('emailInvalid') || 'Please enter a valid email address', 'error');
        document.getElementById('email').focus();
        return;
    }

    // Валидация Bitcoin адреса
    if (!validateBitcoinAddress(walletAddress)) {
        showToast(t('walletInvalid') || 'Invalid Bitcoin wallet address', 'error');
        return;
    }

    // Показать прогресс-бар
    showProgress(0, 'Validating data...');

    try {
        // Шаг 1: Валидация данных
        await delay(500);
        showProgress(25, 'Creating payment...');

        // Создать callback URL
        const userId = user.id || '';
        const callbackUrl = `${API_BASE_URL}/api/callback?user_id=${userId}`;

        // Шаг 2: Отправка запроса
        showProgress(50, 'Sending request...');
        
        const apiUrl = getApiPath('create-payment');
        console.log('Creating payment with URL:', apiUrl); // Debug
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                walletAddress: PAYMENT_CONFIG.walletAddress,
                amount: PAYMENT_CONFIG.amount.toString(),
                currency: PAYMENT_CONFIG.currency,
                network: 'bitcoin',
                cryptocurrency: 'btc',
                provider: provider,
                email: email,
                callbackUrl: callbackUrl
            })
        });

        showProgress(75, 'Processing response...');

        // Проверить статус ответа
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Payment response:', data); // Debug

        if (data.success) {
            showProgress(100, 'Payment created!');
            await delay(500);
            hideProgress();
            
            // Показываем только уведомление, модальное окно показывается только после успешной оплаты
            showToast(t('paymentCreated') || 'Payment created successfully!', 'success');
            
            // Открыть ссылку на оплату
            if (tg && tg.openLink) {
                tg.openLink(data.paymentUrl);
            } else {
                window.open(data.paymentUrl, '_blank');
            }
        } else {
            hideProgress();
            showError(data.error || t('failedToCreate'));
        }
    } catch (error) {
        console.error('Payment creation error:', error);
        hideProgress();
        showError(t('networkError'));
    }
}

// Прогресс-бар
function showProgress(percent, text) {
    const container = document.getElementById('progressContainer');
    const fill = document.getElementById('progressFill');
    const textEl = document.getElementById('progressText');
    
    container.style.display = 'block';
    fill.style.width = `${percent}%`;
    if (textEl) textEl.textContent = text;
}

function hideProgress() {
    document.getElementById('progressContainer').style.display = 'none';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Показать загрузку
function showLoading(text = 'Processing payment...') {
    const loading = document.getElementById('loading');
    const loadingText = document.getElementById('loadingText');
    if (loadingText) loadingText.textContent = text;
    loading.style.display = 'flex';
}

// Скрыть загрузку
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Экранирование HTML для защиты от XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Показать успешный результат (ТОЛЬКО после успешной оплаты)
function showPaymentSuccess(data) {
    // Проверка: показываем модальное окно ТОЛЬКО если есть данные о платеже и статус успешный
    if (!data || !data.paymentId || data.status !== 'success') {
        console.warn('showPaymentSuccess called without successful payment data');
        return;
    }
    
    const modal = document.getElementById('paymentResult');
    const resultContent = document.getElementById('resultContent');
    
    if (!modal || !resultContent) {
        console.error('Payment result modal elements not found');
        return;
    }
    
    resultContent.className = 'result-content success';
    
    // Безопасно получаем значения из формы
    const emailValue = document.getElementById('email')?.value || '';
    // Определяем провайдера из данных платежа
    const currentProvider = data.provider || data.walletData?.provider || 'moonpay';
    const providerValue = 'MoonPay';
    
    resultContent.innerHTML = `
        <div class="success-icon">✅</div>
        <h3>${escapeHtml(t('paymentSuccessful') || 'Payment Successful!')}</h3>
        <div class="result-details">
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('amount') || 'Amount')}:</span>
                <span class="result-value">${escapeHtml(formatAmount(PAYMENT_CONFIG.amount, PAYMENT_CONFIG.currency))}</span>
            </div>
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('provider') || 'Provider')}:</span>
                <span class="result-value">${escapeHtml(providerValue)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('email') || 'Email')}:</span>
                <span class="result-value">${escapeHtml(emailValue)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('networkLabel') || 'Network')}:</span>
                <span class="result-value">Bitcoin (BTC)</span>
            </div>
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('finalWallet') || 'Wallet Address')}:</span>
                <span class="result-value wallet-address">${escapeHtml(PAYMENT_CONFIG.walletAddress)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('paymentId') || 'Payment ID')}:</span>
                <span class="result-value">${escapeHtml(data.paymentId)}</span>
            </div>
        </div>
        <p class="result-message">${escapeHtml(t('paymentCompleted') || 'Your payment has been successfully completed!')}</p>
    `;
    
    modal.style.display = 'flex';
    
    // Вибрация (если поддерживается)
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
}

// Показать ошибку - теперь использует улучшенную версию ниже (с Toast)

// Сбросить форму
function resetForm() {
    document.getElementById('paymentResult').style.display = 'none';
    document.getElementById('paymentForm').style.display = 'block';
    hideProgress();
}

// ============================================
// UX/UI УЛУЧШЕНИЯ
// ============================================

// Toast Notifications
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: `<svg class="toast-icon"><use href="#icon-check"></use></svg>`,
        error: `<svg class="toast-icon"><use href="#icon-shield"></use></svg>`,
        info: `<svg class="toast-icon"><use href="#icon-email"></use></svg>`,
        warning: `<svg class="toast-icon"><use href="#icon-shield"></use></svg>`
    };

    toast.innerHTML = `
        ${icons[type] || icons.info}
        <span class="toast-message">${escapeHtml(message)}</span>
        <button class="toast-close" onclick="this.parentElement.classList.add('fade-out'); setTimeout(() => this.parentElement.remove(), 300)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);

    // Haptic feedback
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred(type === 'success' ? 'success' : type === 'error' ? 'error' : 'warning');
    }
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time Email Validation
function setupEmailValidation() {
    const emailInput = document.getElementById('email');
    const emailStatus = document.getElementById('emailStatus');
    const emailHint = document.getElementById('emailHint');

    if (!emailInput || !emailStatus || !emailHint) return;

    let validationTimeout;

    emailInput.addEventListener('input', (e) => {
        clearTimeout(validationTimeout);
        
        const email = e.target.value.trim();
        
        if (email.length === 0) {
            emailInput.classList.remove('valid', 'invalid');
            emailStatus.classList.remove('valid', 'invalid');
            emailHint.textContent = t('emailHint');
            emailHint.classList.remove('error', 'success');
            return;
        }

        validationTimeout = setTimeout(() => {
            if (validateEmail(email)) {
                emailInput.classList.remove('invalid');
                emailInput.classList.add('valid');
                emailStatus.classList.remove('invalid');
                emailStatus.classList.add('valid');
                emailStatus.innerHTML = `<svg><use href="#icon-check"></use></svg>`;
                emailHint.textContent = t('emailValid');
                emailHint.classList.remove('error');
                emailHint.classList.add('success');
            } else {
                emailInput.classList.remove('valid');
                emailInput.classList.add('invalid');
                emailStatus.classList.remove('valid');
                emailStatus.classList.add('invalid');
                emailStatus.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
                emailHint.textContent = t('emailInvalid');
                emailHint.classList.remove('success');
                emailHint.classList.add('error');
            }
        }, 500);
    });

    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email.length > 0 && !validateEmail(email)) {
            emailInput.classList.add('invalid');
            emailStatus.classList.add('invalid');
        }
    });
}

// Improved Copy to Clipboard
async function copyWalletAddress() {
    try {
        await navigator.clipboard.writeText(PAYMENT_CONFIG.walletAddress);
        
        const btn = document.getElementById('copyAddressBtn');
        if (btn) {
            btn.classList.add('copied');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<svg class="icon"><use href="#icon-check"></use></svg>`;
            
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originalHTML;
            }, 2000);
        }
        
        showToast(t('addressCopied'), 'success', 2000);
        
        // Haptic feedback
        if (tg && tg.HapticFeedback) {
            tg.HapticFeedback.notificationOccurred('success');
        }
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast(t('copyFailed') || 'Failed to copy address', 'error');
    }
}

// Удалена функция loadProviders - теперь только MoonPay, не нужно загружать провайдеров

// Update showError to use Toast
function showError(message) {
    showToast(message, 'error', 4000);
    
    // Also show in modal if needed
    const modal = document.getElementById('paymentResult');
    const resultContent = document.getElementById('resultContent');
    
    if (modal && resultContent) {
        resultContent.className = 'result-content error';
        resultContent.innerHTML = `
            <div class="error-icon">⚠️</div>
            <h3>${escapeHtml(t('error'))}</h3>
            <p>${escapeHtml(message)}</p>
        `;
        modal.style.display = 'flex';
    }
    
    // Haptic feedback
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('error');
    }
}

// ============================================
// DARK MODE SUPPORT
// ============================================

// Setup Dark Mode
function setupDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Get saved theme or detect system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply theme
    applyTheme(theme);
    
    // Theme toggle handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Apply theme
function applyTheme(theme) {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    console.log('Applying theme:', theme); // Debug
    
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        // Убедиться, что стили Telegram не перезаписывают темную тему
        body.style.backgroundColor = '';
        body.style.color = '';
        body.style.removeProperty('background-color');
        body.style.removeProperty('color');
        body.classList.add('dark-theme-active');
        if (themeIcon) {
            themeIcon.innerHTML = '<use href="#icon-moon"></use>';
        }
        // Принудительно применить стили для темной темы
        body.setAttribute('data-theme', 'dark');
        console.log('Dark theme applied, data-theme:', html.getAttribute('data-theme'), 'body data-theme:', body.getAttribute('data-theme')); // Debug
    } else {
        html.removeAttribute('data-theme');
        body.removeAttribute('data-theme');
        body.classList.remove('dark-theme-active');
        // Восстановить стили Telegram для светлой темы
        if (window.tg && window.tg.themeParams) {
            body.style.backgroundColor = window.tg.themeParams.bg_color || '#ffffff';
            body.style.color = window.tg.themeParams.text_color || '#000000';
        } else {
            body.style.backgroundColor = '#ffffff';
            body.style.color = '#000000';
        }
        if (themeIcon) {
            themeIcon.innerHTML = '<use href="#icon-theme"></use>';
        }
        console.log('Light theme applied'); // Debug
    }
    
    // Принудительно обновить стили через requestAnimationFrame
    requestAnimationFrame(() => {
        if (theme === 'dark') {
            body.style.backgroundColor = '';
            body.style.color = '';
        }
    });
}

// ============================================
// PROVIDER LOGOS
// ============================================

// Provider logo mappings - только MoonPay
const PROVIDER_LOGOS = {
    moonpay: { name: 'MoonPay', icon: 'MP', color: '#7c3aed' }
};

// Display provider logos
// Удалена функция displayProviderLogos - теперь только MoonPay

// ============================================
// SMART DEFAULTS
// ============================================

// Setup Smart Defaults
// Удалена функция setupSmartDefaults - не нужна, так как провайдер не выбирается
