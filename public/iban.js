let tg = null;
let user = {};

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

function initIbanPage() {
    initTelegramWebApp();
    setupThemeToggle();
    setupLanguageSelector();
    updateIbanTranslations();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIbanPage);
} else {
    initIbanPage();
}

