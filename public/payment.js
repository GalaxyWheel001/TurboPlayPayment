// Telegram Web App API - безопасная инициализация
let tg = null;
let user = {};
let userEmail = '';

// Функция для безопасной инициализации Telegram Web App
function initTelegramWebApp() {
    try {
        // Проверяем доступность Telegram Web App API
        if (window.Telegram && window.Telegram.WebApp) {
            tg = window.Telegram.WebApp;
            
            // Инициализация Telegram Mini App
            if (tg && typeof tg.ready === 'function') {
                tg.ready();
            }
            if (tg && typeof tg.expand === 'function') {
                tg.expand();
            }
            
            // Получить данные пользователя из Telegram
            if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
                user = tg.initDataUnsafe.user;
                userEmail = user.email || '';
            }
        } else {
            console.log('Telegram Web App API not available - running in standalone mode');
        }
    } catch (error) {
        console.error('Error initializing Telegram Web App:', error);
        // Продолжаем работу даже если Telegram API недоступен
    }
}

// Инициализация при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTelegramWebApp);
} else {
    // Если DOM уже загружен, ждем немного для загрузки Telegram API
    setTimeout(initTelegramWebApp, 50);
}

// Также пытаемся инициализировать после загрузки всех скриптов
window.addEventListener('load', function() {
    setTimeout(initTelegramWebApp, 100);
});

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

// Функция инициализации приложения
function initPaymentApp() {
    // Убедиться, что Telegram API инициализирован
    if (!tg) {
        initTelegramWebApp();
    }
    
    // Проверяем, что DOM полностью загружен
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                initializePaymentPage();
            }, 150);
        });
    } else {
        // DOM уже загружен, но даем время на рендеринг для мобильных
        setTimeout(() => {
            initializePaymentPage();
        }, 150);
    }
}

// Инициализация при загрузке страницы
function initializePaymentPage() {
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
    } else if (paymentStatus === 'failed' || paymentStatus === 'error' || paymentStatus === 'cancelled') {
        showPaymentFailure({
            paymentId: paymentId || '',
            status: paymentStatus,
            error: urlParams.get('error') || ''
        });
    }
    
    // Настройка селектора языка - используем делегирование событий для Telegram Mini App
    function setupLanguageSelector() {
        const languageSelector = document.getElementById('languageSelector');
        if (!languageSelector) {
            console.warn('Language selector not found');
            return;
        }
        
        console.log('Setting up language selector');
        
        // Автоопределение языка из Telegram или сохраненный выбор
        const savedLang = localStorage.getItem('selectedLanguage') || localStorage.getItem('paymentLanguage');
        const userLang = user.language_code?.split('-')[0] || 'en';
        const langMap = { ru: 'ru', tr: 'tr', de: 'de', es: 'es', pt: 'pt', en: 'en' };
        const detectedLang = langMap[userLang] || 'en';
        const currentLang = savedLang || getCurrentLanguage() || detectedLang;
        languageSelector.value = currentLang;
        setLanguage(currentLang);
        
        // Функция для обработки изменения языка
        const handleLanguageChange = function(e) {
            const lang = e.target ? e.target.value : e;
            console.log('Language selector changed to:', lang);
            setLanguage(lang);
            localStorage.setItem('selectedLanguage', lang);
            localStorage.setItem('paymentLanguage', lang);
            
            // Haptic feedback в Telegram Mini App
            if (tg && tg.HapticFeedback) {
                try {
                    tg.HapticFeedback.impactOccurred('light');
                } catch (err) {
                    console.warn('Haptic feedback failed:', err);
                }
            }
        };
        
        // Удаляем все старые обработчики
        const newSelector = languageSelector.cloneNode(true);
        languageSelector.parentNode.replaceChild(newSelector, languageSelector);
        
        // Получаем новый элемент
        const selector = document.getElementById('languageSelector');
        if (!selector) {
            console.error('Language selector not found after recreation');
            return;
        }
        
        // Добавляем обработчики с использованием capture для Telegram Mini App
        selector.addEventListener('change', handleLanguageChange, true);
        selector.addEventListener('input', handleLanguageChange, true);
        selector.addEventListener('click', function(e) {
            console.log('Language selector clicked');
        }, true);
        
        // Также добавляем onchange как запасной вариант
        selector.setAttribute('onchange', 'if (typeof window.setLanguage === "function") { const lang = this.value; window.setLanguage(lang); localStorage.setItem("selectedLanguage", lang); localStorage.setItem("paymentLanguage", lang); console.log("Language changed via onchange:", lang); }');
        
        // Делегирование событий на родительском элементе
        const parent = selector.parentElement;
        if (parent) {
            parent.addEventListener('change', function(e) {
                if (e.target && e.target.id === 'languageSelector') {
                    console.log('Language changed via delegated handler');
                    handleLanguageChange(e);
                }
            }, true);
        }
        
        console.log('Language selector setup complete');
    }
    
    // Инициализируем с задержкой для Telegram Mini App
    setTimeout(setupLanguageSelector, 300);

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
}

// Инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initPaymentApp, 100);
    });
} else {
    // DOM уже загружен
    setTimeout(initPaymentApp, 100);
}

// Экспортируем функцию для вызова из HTML
window.initPaymentApp = initPaymentApp;

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

        if (data.success && data.paymentUrl) {
            showProgress(100, 'Payment created!');
            await delay(500);
            hideProgress();
            
            // Показываем только уведомление, модальное окно показывается только после успешной оплаты
            showToast(t('paymentCreated') || 'Payment created successfully!', 'success');
            
            // Проверяем наличие paymentUrl
            console.log('Payment URL received:', data.paymentUrl);
            console.log('Full payment data:', data);
            
            // На мобильных устройствах сразу показываем модальное окно
            // на десктопе пробуем открыть автоматически
            const isMobile = isMobileDevice();
            console.log('Is mobile device:', isMobile);
            
            if (isMobile) {
                // На мобильных сразу показываем модальное окно
                console.log('Mobile device - showing modal immediately');
                setTimeout(() => {
                    showPaymentLinkModal(data.paymentUrl);
                }, 500);
            } else {
                // На десктопе пробуем открыть автоматически
                setTimeout(() => {
                    openPaymentLink(data.paymentUrl);
                }, 300);
            }
        } else {
            hideProgress();
            const errorMsg = data.error || (data.success ? 'Payment URL not received' : t('failedToCreate'));
            console.error('Payment creation failed:', errorMsg, data);
            showError(errorMsg);
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

function showPaymentFailure(data) {
    if (!data) {
        console.warn('showPaymentFailure called without payment data');
        return;
    }

    const modal = document.getElementById('paymentResult');
    const resultContent = document.getElementById('resultContent');

    if (!modal || !resultContent) {
        console.error('Payment result modal elements not found for failure state');
        return;
    }

    resultContent.className = 'result-content error';

    const emailValue = document.getElementById('email')?.value || '';
    const statusText = data.status || 'failed';
    const errorDetail = data.error ? ` (${escapeHtml(data.error)})` : '';

    resultContent.innerHTML = `
        <div class="error-icon">⚠️</div>
        <h3>${escapeHtml(t('paymentFailed') || 'Payment not completed')}</h3>
        <div class="result-details">
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('status') || 'Status')}:</span>
                <span class="result-value">${escapeHtml(statusText)}${errorDetail}</span>
            </div>
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('email') || 'Email')}:</span>
                <span class="result-value">${escapeHtml(emailValue)}</span>
            </div>
            ${data.paymentId ? `
            <div class="result-row">
                <span class="result-label">${escapeHtml(t('paymentId') || 'Payment ID')}:</span>
                <span class="result-value">${escapeHtml(data.paymentId)}</span>
            </div>` : ''}
        </div>
        <p class="result-message">${escapeHtml(t('paymentFailedMessage') || 'The payment was not completed. You can try again or choose another payment method.')}</p>
    `;

    modal.style.display = 'flex';

    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('error');
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
// OPEN PAYMENT LINK (MOBILE FIX)
// ============================================

// Функция для определения мобильного устройства (должна быть определена в начале)
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) ||
           ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

// Экспортируем функцию для использования везде
window.isMobileDevice = isMobileDevice;

// Улучшенная функция для открытия ссылки на оплату на мобильных устройствах
function openPaymentLink(url) {
    console.log('Opening payment link:', url); // Debug
    
    // Проверка на валидность URL
    if (!url || typeof url !== 'string') {
        console.error('Invalid payment URL:', url);
        showError(t('invalidPaymentUrl') || 'Invalid payment URL');
        return;
    }
    
    // Проверяем, что URL валидный
    try {
        new URL(url);
    } catch (e) {
        console.error('Invalid URL format:', url);
        showError(t('invalidPaymentUrl') || 'Invalid payment URL');
        return;
    }
    
    // Определяем, мобильное ли устройство
    const isMobile = isMobileDevice();
    console.log('Is mobile device:', isMobile);
    
    // Способ 1: Использовать Telegram Web App API (предпочтительно, только если доступен)
    if (tg && typeof tg.openLink === 'function') {
        try {
            console.log('Attempting to open via tg.openLink');
            tg.openLink(url);
            console.log('Opened link via tg.openLink');
            // Всегда показываем запасной вариант через небольшую задержку
            setTimeout(() => {
                console.log('Showing backup option in case tg.openLink failed');
                tryMainButtonOrModal(url);
            }, 2000);
            return;
        } catch (error) {
            console.warn('tg.openLink failed:', error);
            // Продолжаем с альтернативными методами
        }
    }
    
    // Если Telegram API недоступен (standalone режим)
    console.log('Telegram API not available, running in standalone mode');
    
    // На мобильных устройствах сразу показываем модальное окно
    // так как window.open часто блокируется браузером
    if (isMobile) {
        console.log('Mobile device detected, showing modal immediately');
        showPaymentLinkModal(url);
        return;
    }
    
    // На десктопе пробуем открыть через window.open
    try {
        const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (openedWindow && !openedWindow.closed) {
            console.log('Opened link via window.open');
            // Показываем модальное окно как запасной вариант
            setTimeout(() => {
                tryMainButtonOrModal(url);
            }, 1500);
            return;
        } else {
            console.log('window.open was blocked, showing modal');
        }
    } catch (error) {
        console.warn('window.open failed:', error);
    }
    
    // Если window.open заблокирован или не работает, показываем модальное окно
    tryMainButtonOrModal(url);
}

// Альтернативные методы открытия ссылки
function tryAlternativeMethods(url) {
    console.log('Trying alternative methods to open link:', url);
    
    // Способ 2: Попробовать открыть через window.open (более надежный для мобильных)
    try {
        console.log('Attempting window.open');
        const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
        
        // Проверяем, открылось ли окно (может быть заблокировано)
        if (openedWindow && !openedWindow.closed) {
            console.log('Opened link via window.open');
            // Показываем запасной вариант на случай если не открылось
            setTimeout(() => {
                tryMainButtonOrModal(url);
            }, 1500);
            return;
        } else {
            console.warn('window.open was blocked or failed, trying temporary link');
            tryTemporaryLink(url);
        }
    } catch (error) {
        console.warn('window.open failed:', error);
        tryTemporaryLink(url);
    }
}

// Попробовать открыть через временную ссылку
function tryTemporaryLink(url) {
    try {
        console.log('Attempting temporary link method');
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Пытаемся открыть через программный клик
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        link.dispatchEvent(clickEvent);
        
        // Также пытаемся через обычный click
        try {
            link.click();
        } catch (e) {
            console.warn('link.click() failed:', e);
        }
        
        // Удаляем ссылку через небольшую задержку
        setTimeout(() => {
            if (link.parentNode) {
                document.body.removeChild(link);
            }
        }, 500);
        
        console.log('Opened link via temporary link element');
        
        // Даем время на открытие, если не сработает - покажем кнопку
        setTimeout(() => {
            tryMainButtonOrModal(url);
        }, 1000);
        
    } catch (error) {
        console.warn('Temporary link failed:', error);
        tryMainButtonOrModal(url);
    }
}

// Попробовать MainButton или модальное окно
function tryMainButtonOrModal(url) {
    // Способ 3: Использовать MainButton от Telegram (если доступно)
    if (tg && tg.MainButton && typeof tg.MainButton.show === 'function') {
        try {
            tg.MainButton.setText(t('openPaymentLink') || 'Open Payment Link');
            tg.MainButton.show();
            tg.MainButton.onClick(() => {
                try {
                    if (tg.openLink) {
                        tg.openLink(url);
                    } else {
                        window.open(url, '_blank');
                    }
                } catch (err) {
                    window.open(url, '_blank');
                }
                tg.MainButton.hide();
            });
            console.log('Using MainButton for payment link');
            return;
        } catch (error) {
            console.warn('MainButton setup failed:', error);
        }
    }
    
    // Способ 4: Показать модальное окно с кнопкой для открытия
    console.log('Showing modal with payment link button');
    showPaymentLinkModal(url);
}

// Показать модальное окно с кнопкой для открытия ссылки
function showPaymentLinkModal(url) {
    console.log('Showing payment link modal with URL:', url);
    
    const modal = document.getElementById('paymentResult');
    const resultContent = document.getElementById('resultContent');
    
    if (!modal || !resultContent) {
        console.error('Modal elements not found, trying direct open');
        // Если модальное окно не найдено, используем прямой способ
        openLinkDirect(url);
        return;
    }
    
    resultContent.className = 'result-content info';
    
    // Функция для открытия ссылки
    const openLink = () => {
        console.log('Opening link from modal button:', url);
        openLinkDirect(url);
        modal.style.display = 'none';
    };
    
    // Создаем элементы безопасно
    resultContent.innerHTML = `
        <div class="success-icon">🔗</div>
        <h3>${escapeHtml(t('paymentLinkReady') || 'Payment Link Ready')}</h3>
        <p class="result-message">${escapeHtml(t('clickToOpenPayment') || 'Click the button below to open the payment page')}</p>
        <button class="btn btn-primary" id="openPaymentLinkBtn" type="button" style="margin-top: 20px; width: 100%;">
            ${escapeHtml(t('openPaymentPage') || 'Open Payment Page')}
        </button>
        <p style="margin-top: 10px; font-size: 12px; color: var(--text-muted);">
            ${escapeHtml(t('orCopyLink') || 'Or copy this link:')}
        </p>
        <input type="text" id="paymentLinkInput" value="${escapeHtml(url)}" readonly style="width: 100%; padding: 8px; margin-top: 8px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary); font-size: 12px;" onclick="this.select();">
    `;
    
    // Добавляем обработчики событий для кнопки (с задержкой для мобильных)
    setTimeout(() => {
        const openBtn = document.getElementById('openPaymentLinkBtn');
        if (openBtn) {
            console.log('Button found, adding event listeners');
            
            // Удаляем старые обработчики если есть
            const newBtn = openBtn.cloneNode(true);
            openBtn.parentNode.replaceChild(newBtn, openBtn);
            
            const btn = document.getElementById('openPaymentLinkBtn');
            if (btn) {
                console.log('Button recreated, setting up handlers');
                
                // Функция для открытия ссылки
                const handleOpen = (e) => {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    console.log('Opening link from button:', url);
                    
                    // Закрываем модальное окно
                    modal.style.display = 'none';
                    
                    // Открываем ссылку
                    openLinkDirect(url);
                };
                
                // Обработчик click для всех устройств
                btn.addEventListener('click', handleOpen);
                console.log('Click handler added');
                
                // Обработчики touch для мобильных
                let touchStartTime = 0;
                btn.addEventListener('touchstart', function(e) {
                    touchStartTime = Date.now();
                    btn.classList.add('active');
                    console.log('Touch start');
                }, { passive: true });
                
                btn.addEventListener('touchend', function(e) {
                    const touchDuration = Date.now() - touchStartTime;
                    btn.classList.remove('active');
                    
                    // Если касание было коротким (не свайп), открываем ссылку
                    if (touchDuration < 300) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Touch end (short tap), opening link');
                        handleOpen(e);
                    }
                }, { passive: false });
                
                btn.addEventListener('touchcancel', function() {
                    btn.classList.remove('active');
                });
                
                // Также добавляем onclick атрибут как запасной вариант
                const escapedUrl = url.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                btn.setAttribute('onclick', `window.openLinkDirect('${escapedUrl}'); this.closest('.modal-overlay').style.display='none';`);
                console.log('onclick attribute added');
                
                // Делаем кнопку видимой и кликабельной
                btn.style.pointerEvents = 'auto';
                btn.style.cursor = 'pointer';
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
                
                console.log('All handlers added successfully');
            } else {
                console.error('Button not found after recreation');
            }
        } else {
            console.error('Button not found after creation');
        }
    }, 150);
    
    // Показываем модальное окно
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.style.zIndex = '10000';
    console.log('Modal displayed, style:', modal.style.display);
}

// Прямое открытие ссылки (последний способ) - вызывается по действию пользователя
function openLinkDirect(url) {
    console.log('=== openLinkDirect called ===');
    console.log('URL:', url);
    console.log('URL type:', typeof url);
    
    // Проверка URL
    if (!url || typeof url !== 'string') {
        console.error('Invalid URL in openLinkDirect:', url);
        showError(t('invalidPaymentUrl') || 'Invalid payment URL');
        return;
    }
    
    // Проверяем валидность URL
    try {
        new URL(url);
        console.log('URL is valid');
    } catch (e) {
        console.error('Invalid URL format:', url, e);
        showError(t('invalidPaymentUrl') || 'Invalid payment URL');
        return;
    }
    
    // Попробовать несколько способов
    let opened = false;
    
    // Способ 1: window.open (должен работать, так как вызывается по действию пользователя)
    try {
        console.log('Trying window.open...');
        const openedWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (openedWindow) {
            console.log('window.open returned:', openedWindow);
            opened = true;
            // Проверяем через небольшую задержку
            setTimeout(() => {
                if (openedWindow.closed) {
                    console.log('Window was closed, trying other methods');
                    tryOtherMethods(url);
                } else {
                    console.log('Window is open');
                }
            }, 500);
            return;
        } else {
            console.warn('window.open returned null (blocked)');
        }
    } catch (e) {
        console.warn('window.open failed:', e);
    }
    
    // Если window.open не сработал, пробуем другие способы
    if (!opened) {
        tryOtherMethods(url);
    }
}

// Дополнительные методы открытия ссылки
function tryOtherMethods(url) {
    console.log('Trying other methods to open link...');
    
    // Способ 2: Через Telegram API если доступен
    if (tg && typeof tg.openLink === 'function') {
        try {
            console.log('Trying tg.openLink...');
            tg.openLink(url);
            console.log('Opened via tg.openLink');
            return;
        } catch (err) {
            console.warn('tg.openLink failed:', err);
        }
    }
    
    // Способ 3: Создать временную ссылку и кликнуть по ней
    try {
        console.log('Trying temporary link method...');
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Пытаемся открыть через программный клик
        link.click();
        console.log('Opened link via temporary <a> element click');
        
        // Удаляем ссылку через небольшую задержку
        setTimeout(() => {
            if (link.parentNode) {
                document.body.removeChild(link);
            }
        }, 1000);
        
        return;
    } catch (e) {
        console.warn('Temporary link method failed:', e);
    }
    
    // Способ 4: Использовать location.href как последний вариант (откроет в том же окне)
    console.log('Trying location.href as last resort...');
    try {
        window.location.href = url;
        console.log('Redirected via location.href');
    } catch (e) {
        console.error('location.href failed:', e);
        showToast(t('pleaseOpenLink') || 'Please open the link manually', 'warning', 5000);
    }
}

// Экспортируем функцию для использования в onclick атрибутах
window.openLinkDirect = openLinkDirect;

// ============================================
// DARK MODE SUPPORT
// ============================================

// Setup Dark Mode
function setupDarkMode() {
    function setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;
        
        console.log('Setting up dark mode, themeToggle found:', !!themeToggle);
        
        // Get saved theme or detect system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        // Apply theme
        applyTheme(theme);
        
        // Theme toggle handler - улучшенная версия для Telegram Mini App
        if (!themeToggle) {
            console.warn('Theme toggle not found');
            return;
        }
        
        // Функция для переключения темы
        const toggleTheme = () => {
            const currentTheme = html.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            console.log('Toggling theme from', currentTheme, 'to', newTheme);
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Haptic feedback в Telegram Mini App
            if (tg && tg.HapticFeedback) {
                try {
                    tg.HapticFeedback.impactOccurred('light');
                } catch (e) {
                    console.warn('Haptic feedback failed:', e);
                }
            }
        };
        
        // Удаляем все старые обработчики
        const newToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newToggle, themeToggle);
        
        // Получаем новый элемент
        const toggle = document.getElementById('themeToggle');
        if (!toggle) {
            console.error('Theme toggle not found after recreation');
            return;
        }
        
        console.log('Theme toggle recreated, setting up handlers');
        
        // Универсальный обработчик click с capture для Telegram Mini App
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Theme toggle clicked');
            toggleTheme();
        }, true);
        
        // Обработчик для touch событий (для Telegram Mini App)
        let touchStartTime = 0;
        let touchMoved = false;
        
        toggle.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            touchMoved = false;
            toggle.classList.add('active');
            console.log('Theme toggle touch start');
        }, { passive: true, capture: true });
        
        toggle.addEventListener('touchmove', function() {
            touchMoved = true;
        }, { passive: true, capture: true });
        
        toggle.addEventListener('touchend', function(e) {
            const touchDuration = Date.now() - touchStartTime;
            toggle.classList.remove('active');
            
            // Если касание было коротким и без движения (не свайп), переключаем тему
            if (!touchMoved && touchDuration < 300) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Theme toggle touch end (short tap)');
                toggleTheme();
            }
        }, { passive: false, capture: true });
        
        toggle.addEventListener('touchcancel', function() {
            toggle.classList.remove('active');
            touchMoved = false;
        }, { capture: true });
        
        // Также добавляем onclick атрибут как запасной вариант
        toggle.setAttribute('onclick', 'if (typeof window.applyTheme === "function") { const html = document.documentElement; const currentTheme = html.getAttribute("data-theme") || "light"; const newTheme = currentTheme === "dark" ? "light" : "dark"; window.applyTheme(newTheme); localStorage.setItem("theme", newTheme); console.log("Theme changed via onclick:", newTheme); }');
        
        // Делаем кнопку явно кликабельной
        toggle.style.pointerEvents = 'auto';
        toggle.style.cursor = 'pointer';
        toggle.style.touchAction = 'manipulation';
        toggle.style.userSelect = 'none';
        toggle.style.webkitUserSelect = 'none';
        
        // Делегирование событий на родительском элементе
        const parent = toggle.parentElement;
        if (parent) {
            parent.addEventListener('click', function(e) {
                if (e.target && (e.target.id === 'themeToggle' || e.target.closest('#themeToggle'))) {
                    console.log('Theme toggle clicked via delegated handler');
                    e.preventDefault();
                    e.stopPropagation();
                    toggleTheme();
                }
            }, true);
        }
        
        console.log('Theme toggle handlers setup complete');
    }
    
    // Инициализируем с задержкой для Telegram Mini App
    setTimeout(setupThemeToggle, 300);
    
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

// Экспортируем функцию для использования в onclick атрибутах
window.applyTheme = applyTheme;

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
