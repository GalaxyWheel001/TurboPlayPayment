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

// Preloader - показываем логотип перед загрузкой
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const logoImage = document.querySelector('.logo-image');
    
    // Logo image is already loaded in HTML (wallet234_green.png)
    
    // Минимальное время показа preloader (для эффекта)
    const minShowTime = 1000;
    const startTime = Date.now();
    
    function hidePreloader() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minShowTime - elapsed);
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                preloader.style.display = 'none';
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                }, 50);
            }, 500);
        }, remaining);
    }
    
    // Ждем загрузки DOM и скриптов
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(hidePreloader, 300);
        });
    } else {
        setTimeout(hidePreloader, 300);
    }
    
    // Также скрываем после полной загрузки
    window.addEventListener('load', () => {
        setTimeout(hidePreloader, 100);
    });
}

// Setup Dark Mode
function setupDarkMode() {
    function setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        console.log('Setting up dark mode, themeToggle found:', !!themeToggle);
        
        // Get saved theme or detect system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        // Apply theme
        applyTheme(theme);
        
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
        
        const toggle = document.getElementById('themeToggle');
        if (!toggle) {
            console.error('Theme toggle not found after recreation');
            return;
        }
        
        // Добавляем обработчики с capture для Telegram Mini App
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Theme toggle clicked');
            toggleTheme();
        }, true);
        
        // Touch события
        let touchStartTime = 0;
        let touchMoved = false;
        
        toggle.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            touchMoved = false;
            toggle.classList.add('active');
        }, { passive: true, capture: true });
        
        toggle.addEventListener('touchmove', function() {
            touchMoved = true;
        }, { passive: true, capture: true });
        
        toggle.addEventListener('touchend', function(e) {
            const touchDuration = Date.now() - touchStartTime;
            toggle.classList.remove('active');
            
            if (!touchMoved && touchDuration < 300) {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
            }
        }, { passive: false, capture: true });
        
        toggle.addEventListener('touchcancel', function() {
            toggle.classList.remove('active');
            touchMoved = false;
        }, { capture: true });
        
        // Onclick fallback
        toggle.setAttribute('onclick', 'if (typeof window.applyTheme === "function") { const html = document.documentElement; const currentTheme = html.getAttribute("data-theme") || "light"; const newTheme = currentTheme === "dark" ? "light" : "dark"; window.applyTheme(newTheme); localStorage.setItem("theme", newTheme); }');
        
        toggle.style.pointerEvents = 'auto';
        toggle.style.cursor = 'pointer';
        toggle.style.touchAction = 'manipulation';
        toggle.style.userSelect = 'none';
        toggle.style.webkitUserSelect = 'none';
        
        // Делегирование событий
        const parent = toggle.parentElement;
        if (parent) {
            parent.addEventListener('click', function(e) {
                if (e.target && (e.target.id === 'themeToggle' || e.target.closest('#themeToggle'))) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleTheme();
                }
            }, true);
        }
    }
    
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
    
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-theme-active');
        if (themeIcon) {
            themeIcon.innerHTML = '<use href="#icon-moon"></use>';
        }
    } else {
        html.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark-theme-active');
        if (themeIcon) {
            themeIcon.innerHTML = '<use href="#icon-theme"></use>';
        }
    }
}

// Экспорт функции для глобального доступа
window.applyTheme = applyTheme;

// Setup Language Selector
function setupLanguageSelector() {
    function setupSelector() {
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
        
        const selector = document.getElementById('languageSelector');
        if (!selector) {
            console.error('Language selector not found after recreation');
            return;
        }
        
        // Добавляем обработчики с capture для Telegram Mini App
        selector.addEventListener('change', handleLanguageChange, true);
        selector.addEventListener('input', handleLanguageChange, true);
        
        // Onchange fallback
        selector.setAttribute('onchange', 'if (typeof window.setLanguage === "function") { const lang = this.value; window.setLanguage(lang); localStorage.setItem("selectedLanguage", lang); localStorage.setItem("paymentLanguage", lang); }');
        
        // Делегирование событий
        const parent = selector.parentElement;
        if (parent) {
            parent.addEventListener('change', function(e) {
                if (e.target && e.target.id === 'languageSelector') {
                    handleLanguageChange(e);
                }
            }, true);
        }
    }
    
    setTimeout(setupSelector, 300);
}

// Setup Payment Method Buttons
function setupPaymentMethodButtons() {
    const cardButton = document.getElementById('cardPaymentButton');
    const ibanButton = document.getElementById('ibanPaymentButton');
    
    if (cardButton) {
        cardButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Card payment selected');
            
            // Haptic feedback
            if (tg && tg.HapticFeedback) {
                try {
                    tg.HapticFeedback.impactOccurred('medium');
                } catch (err) {
                    console.warn('Haptic feedback failed:', err);
                }
            }
            
            // Переход на страницу оплаты картой
            window.location.href = '/payment.html';
        });
        
        // Touch события
        cardButton.addEventListener('touchstart', function() {
            cardButton.classList.add('active');
        }, { passive: true });
        
        cardButton.addEventListener('touchend', function() {
            cardButton.classList.remove('active');
        }, { passive: true });
    }
    
    if (ibanButton) {
        ibanButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('IBAN payment selected');
            
            // Haptic feedback
            if (tg && tg.HapticFeedback) {
                try {
                    tg.HapticFeedback.impactOccurred('medium');
                } catch (err) {
                    console.warn('Haptic feedback failed:', err);
                }
            }
            
            // Переход на страницу IBAN
            window.location.href = '/iban.html';
        });
        
        // Touch события
        ibanButton.addEventListener('touchstart', function() {
            ibanButton.classList.add('active');
        }, { passive: true });
        
        ibanButton.addEventListener('touchend', function() {
            ibanButton.classList.remove('active');
        }, { passive: true });
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

// Handle scroll for sticky header
function setupScrollHandler() {
    const topControls = document.querySelector('.top-controls');
    if (!topControls) return;
    
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 10) {
            topControls.classList.add('scrolled');
        } else {
            topControls.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Initial check
    handleScroll();
}

// Main initialization
function initIndexPage() {
    // Initialize Telegram Web App
    initTelegramWebApp();
    
    // Setup preloader
    initPreloader();
    
    // Setup dark mode
    setupDarkMode();
    
    // Setup language selector
    setupLanguageSelector();
    
    // Setup payment method buttons
    setupPaymentMethodButtons();
    
    // Setup scroll handler
    setupScrollHandler();
    
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

