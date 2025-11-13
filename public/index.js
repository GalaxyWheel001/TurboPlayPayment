// Telegram Web App API - безопасная инициализация
let tg = null;
let user = {};

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
            }
        } else {
            console.log('Telegram Web App API not available - running in standalone mode');
        }
    } catch (error) {
        console.error('Error initializing Telegram Web App:', error);
        // Продолжаем работу даже если Telegram API недоступен
    }
}

function resolveUrl(path) {
    try {
        return new URL(path, window.location.href).toString();
    } catch (_) {
        return path;
    }
}

function navigateTo(path) {
    const targetUrl = resolveUrl(path);

    if (tg) {
        if (typeof tg.openLink === 'function') {
            try {
                tg.openLink(targetUrl);
                return;
            } catch (error) {
                console.warn('Telegram openLink failed, falling back:', error);
            }
        }

        if (typeof tg.openTelegramLink === 'function') {
            try {
                tg.openTelegramLink(targetUrl);
                return;
            } catch (error) {
                console.warn('openTelegramLink failed, falling back:', error);
            }
        }
    }

    window.location.assign(targetUrl);
}

function addNavigationHandlers(element, destination) {
    if (!element) return;

    const go = () => navigateTo(destination);

    element.addEventListener('click', (event) => {
        event.preventDefault();
        go();
    });

    element.addEventListener('touchend', (event) => {
        if (event.touches && event.touches.length > 0) {
            return;
        }
        event.preventDefault();
        go();
    }, { passive: false });

    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            go();
        }
    });
}

function forwardCardInteractions(cardElement, buttonElement) {
    if (!cardElement || !buttonElement) return;

    const triggerButton = (event) => {
        if (buttonElement.contains(event.target)) {
            return;
        }
        event.preventDefault();
        buttonElement.click();
    };

    cardElement.addEventListener('click', triggerButton);
    cardElement.addEventListener('touchend', (event) => {
        if (event.touches && event.touches.length > 0) {
            return;
        }
        triggerButton(event);
    }, { passive: false });

    cardElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            buttonElement.click();
        }
    });

    cardElement.setAttribute('role', 'button');
    cardElement.setAttribute('tabindex', '0');
}

// Setup Dark Mode
function enforceDarkTheme() {
    const html = document.documentElement;
    html.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme-active');
}

function applyTheme() {
    enforceDarkTheme();
}

// Экспорт функции для глобального доступа
window.applyTheme = applyTheme;

// Setup Language Selector
function setupLanguageSelector() {
    if (typeof window.setLanguage === 'function') {
        window.setLanguage('tr');
    } else if (typeof setLanguage === 'function') {
        setLanguage('tr');
    }
    updateTranslations();
}

// Setup Payment Method Buttons
function setupPaymentMethodButtons() {
    const cardButton = document.getElementById('cardPaymentButton');
    const ibanButton = document.getElementById('ibanPaymentButton');
    const cardPaymentCard = document.getElementById('cardPaymentCard');
    const ibanPaymentCard = document.getElementById('ibanPaymentCard');
    
    if (cardButton) {
        cardButton.type = 'button';
        cardButton.addEventListener('click', function(e) {
            e.preventDefault();
            handlePaymentSelection('card');
        });
        
        // Touch события
        cardButton.addEventListener('touchstart', function() {
            cardButton.classList.add('active');
        }, { passive: true });
        
        cardButton.addEventListener('touchend', function() {
            cardButton.classList.remove('active');
        }, { passive: true });

        addNavigationHandlers(cardButton, 'payment.html');
    }
    
    if (ibanButton) {
        ibanButton.type = 'button';
        ibanButton.addEventListener('click', function(e) {
            e.preventDefault();
            handlePaymentSelection('iban');
        });
        
        // Touch события
        ibanButton.addEventListener('touchstart', function() {
            ibanButton.classList.add('active');
        }, { passive: true });
        
        ibanButton.addEventListener('touchend', function() {
            ibanButton.classList.remove('active');
        }, { passive: true });

        addNavigationHandlers(ibanButton, 'iban.html');
    }

    forwardCardInteractions(cardPaymentCard, cardButton);
    forwardCardInteractions(ibanPaymentCard, ibanButton);
}

function handlePaymentSelection(method) {
    console.log(`${method === 'card' ? 'Card' : 'IBAN'} payment selected`);

    if (tg && tg.HapticFeedback) {
        try {
            tg.HapticFeedback.impactOccurred('medium');
        } catch (err) {
            console.warn('Haptic feedback failed:', err);
        }
    }

    if (method === 'card') {
        navigateTo('payment.html');
    } else if (method === 'iban') {
        navigateTo('iban.html');
    }
}

// Update translations for index page
function updateTranslations() {
    const elements = {
        'pageTitle': document.getElementById('pageTitle'),
        'pageSubtitle': document.getElementById('pageSubtitle'),
        'cardPaymentTitle': document.getElementById('cardPaymentTitle'),
        'cardPaymentSubtitle': document.getElementById('cardPaymentSubtitle'),
        'cardPaymentButtonText': document.getElementById('cardPaymentButtonText'),
        'ibanPaymentTitle': document.getElementById('ibanPaymentTitle'),
        'ibanPaymentSubtitle': document.getElementById('ibanPaymentSubtitle'),
        'ibanPaymentButtonText': document.getElementById('ibanPaymentButtonText'),
        'securePaymentBadge': document.getElementById('securePaymentBadge'),
        'sslEncryptedBadge': document.getElementById('sslEncryptedBadge')
    };
    
    if (elements.pageTitle) elements.pageTitle.textContent = t('choosePaymentMethod');
    if (elements.pageSubtitle) elements.pageSubtitle.textContent = t('selectPaymentOption');
    if (elements.cardPaymentTitle) elements.cardPaymentTitle.textContent = t('cardPayment');
    if (elements.cardPaymentSubtitle) elements.cardPaymentSubtitle.textContent = t('cardPaymentSubtitle');
    if (elements.cardPaymentButtonText) elements.cardPaymentButtonText.textContent = t('continueButton');
    if (elements.ibanPaymentTitle) elements.ibanPaymentTitle.textContent = t('ibanTransfer');
    if (elements.ibanPaymentSubtitle) elements.ibanPaymentSubtitle.textContent = t('ibanTransferSubtitle');
    if (elements.ibanPaymentButtonText) elements.ibanPaymentButtonText.textContent = t('continueButton');
    if (elements.securePaymentBadge) elements.securePaymentBadge.textContent = t('securePayment');
    if (elements.sslEncryptedBadge) elements.sslEncryptedBadge.textContent = t('sslEncrypted');
}

// Main initialization
function initIndexPage() {
    // Initialize Telegram Web App
    initTelegramWebApp();
    
    // Setup dark mode
    enforceDarkTheme();
    
    // Setup language selector
    setupLanguageSelector();
    
    // Setup payment method buttons
    setupPaymentMethodButtons();

    // Update translations
    updateTranslations();
    
    // Listen for language changes
    if (typeof window.setLanguage === 'function') {
        const originalSetLanguage = window.setLanguage;
        window.setLanguage = function(lang) {
            originalSetLanguage(lang);
            updateTranslations();
        };
    } else {
        window.setLanguage = function(lang) {
            localStorage.setItem('selectedLanguage', lang);
            localStorage.setItem('paymentLanguage', lang);
            updateTranslations();
        };
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndexPage);
} else {
    initIndexPage();
}

