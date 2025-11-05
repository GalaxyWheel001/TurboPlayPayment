// Система переводов
const translations = {
    en: {
        // Header
        title: "Secure Payment Gateway",
        subtitle: "Complete your transaction with confidence and security",
        
        // Amount Section
        totalAmount: "Total Amount",
        amountLabel: "Amount to Pay",
        secureTransaction: "Secure transaction • Instant processing",
        
        // Security Badges
        sslEncrypted: "SSL Encrypted",
        securePayment: "Secure Payment",
        ssl256bit: "256-bit SSL",
        pciCompliant: "PCI Compliant",
        support247: "24/7 Support",
        
        // Form Sections
        cryptocurrency: "Cryptocurrency",
        network: "Network",
        networkHint: "Network for receiving payments",
        currency: "Currency",
        cryptocurrencyType: "Cryptocurrency type",
        walletAddress: "Wallet Address",
        showQRCode: "Show QR Code",
        copyAddress: "Copy Address",
        walletHint: "Your wallet address for receiving payments",
        closeQRCode: "Close QR Code",
        contactInfo: "Contact Information",
        paymentMethod: "Payment Method",
        
        // Form Fields
        emailLabel: "Your Email Address",
        emailPlaceholder: "your@email.com",
        emailHint: "We'll send payment confirmation to this email",
        emailValid: "✓ Valid email address",
        emailInvalid: "Please enter a valid email address",
        providerLabel: "Select Payment Provider",
        providerPlaceholder: "Choose payment method...",
        providerHint: "Select your preferred payment gateway",
        
        // Network Options
        networkTrc20: "TRC-20 (Tron)",
        networkErc20: "ERC-20 (Ethereum)",
        networkBitcoin: "Bitcoin",
        networkTron: "Tron (TRC-20)",
        networkEthereum: "Ethereum (ERC-20)",
        addressFormatTrc20: "Starts with T, 34 characters",
        addressFormatErc20: "Starts with 0x, 42 characters",
        addressFormatBitcoin: "Starts with 1, 3, or bc1, 26-62 characters",
        walletHintTron: "Your Tron (TRC-20) wallet address for receiving {crypto}",
        walletHintErc20: "Your Ethereum (ERC-20) wallet address for receiving {crypto}",
        walletHintBitcoin: "Your Bitcoin wallet address for receiving {crypto}",
        
        // Cryptocurrency Options
        cryptoUsdt: "USDT",
        cryptoBtc: "BTC",
        cryptoBtcDisabled: "BTC (Bitcoin Network Only)",
        
        // Buttons
        payButton: "Proceed to Secure Payment",
        newPayment: "New Payment",
        
        // Progress
        preparingPayment: "Preparing payment...",
        processing: "Processing payment...",
        
        // Payment Result
        paymentCreated: "Payment Created",
        amount: "Amount",
        provider: "Provider",
        email: "Email",
        networkLabel: "Network",
        paymentPageOpened: "Payment page opened in browser. Complete the payment there.",
        temporaryAddress: "Temporary payment address",
        finalWallet: "Funds will be sent to",
        
        // Errors
        error: "Error",
        fillAllFields: "Please fill in all fields",
        walletNotConfigured: "Wallet address not configured. Please contact administrator.",
        networkError: "Network error. Please try again.",
        failedToCreate: "Failed to create payment",
        failedToLoadProviders: "Failed to load payment providers",
        
        // Toast Messages
        addressCopied: "Address copied to clipboard",
        copyFailed: "Failed to copy address",
        
        // Theme
        toggleTheme: "Toggle theme",
        
        // Payment Guarantee
        paymentGuarantee: "Your payment is protected by industry-leading security",
        
        // Payment Link
        paymentLinkReady: "Payment Link Ready",
        clickToOpenPayment: "Click the button below to open the payment page",
        openPaymentPage: "Open Payment Page",
        openPaymentLink: "Open Payment Link",
        orCopyLink: "Or copy this link:",
        pleaseOpenLink: "Please open the link manually",
        invalidPaymentUrl: "Invalid payment URL"
    },
    ru: {
        // Header
        title: "Безопасный платежный шлюз",
        subtitle: "Завершите транзакцию с уверенностью и безопасностью",
        
        // Amount Section
        totalAmount: "Общая сумма",
        amountLabel: "Сумма к оплате",
        secureTransaction: "Безопасная транзакция • Мгновенная обработка",
        
        // Security Badges
        sslEncrypted: "SSL зашифровано",
        securePayment: "Безопасный платеж",
        ssl256bit: "256-битный SSL",
        pciCompliant: "Соответствие PCI",
        support247: "Поддержка 24/7",
        
        // Form Sections
        cryptocurrency: "Криптовалюта",
        network: "Сеть",
        networkHint: "Сеть для получения платежей",
        currency: "Валюта",
        cryptocurrencyType: "Тип криптовалюты",
        walletAddress: "Адрес кошелька",
        showQRCode: "Показать QR-код",
        copyAddress: "Копировать адрес",
        walletHint: "Ваш адрес кошелька для получения платежей",
        closeQRCode: "Закрыть QR-код",
        contactInfo: "Контактная информация",
        paymentMethod: "Способ оплаты",
        
        // Form Fields
        emailLabel: "Ваш Email адрес",
        emailPlaceholder: "ваш@email.com",
        emailHint: "Мы отправим подтверждение платежа на этот email",
        emailValid: "✓ Действительный email адрес",
        emailInvalid: "Пожалуйста, введите действительный email адрес",
        providerLabel: "Выберите платежный провайдер",
        providerPlaceholder: "Выберите способ оплаты...",
        providerHint: "Выберите предпочитаемый платежный шлюз",
        
        // Network Options
        networkTrc20: "TRC-20 (Tron)",
        networkErc20: "ERC-20 (Ethereum)",
        networkBitcoin: "Bitcoin",
        networkTron: "Tron (TRC-20)",
        networkEthereum: "Ethereum (ERC-20)",
        addressFormatTrc20: "Начинается с T, 34 символа",
        addressFormatErc20: "Начинается с 0x, 42 символа",
        addressFormatBitcoin: "Начинается с 1, 3 или bc1, 26-62 символа",
        walletHintTron: "Ваш адрес кошелька Tron (TRC-20) для получения {crypto}",
        walletHintErc20: "Ваш адрес кошелька Ethereum (ERC-20) для получения {crypto}",
        walletHintBitcoin: "Ваш адрес кошелька Bitcoin для получения {crypto}",
        
        // Cryptocurrency Options
        cryptoUsdt: "USDT",
        cryptoBtc: "BTC",
        cryptoBtcDisabled: "BTC (только сеть Bitcoin)",
        
        // Buttons
        payButton: "Перейти к безопасной оплате",
        newPayment: "Новый платеж",
        
        // Progress
        preparingPayment: "Подготовка платежа...",
        processing: "Обработка платежа...",
        
        // Payment Result
        paymentCreated: "Платеж создан",
        amount: "Сумма",
        provider: "Провайдер",
        email: "Email",
        networkLabel: "Сеть",
        paymentPageOpened: "Страница оплаты открыта в браузере. Завершите платеж там.",
        temporaryAddress: "Временный адрес для оплаты",
        finalWallet: "Средства будут отправлены на",
        
        // Errors
        error: "Ошибка",
        fillAllFields: "Пожалуйста, заполните все поля",
        walletNotConfigured: "Адрес кошелька не настроен. Пожалуйста, свяжитесь с администратором.",
        networkError: "Ошибка сети. Пожалуйста, попробуйте снова.",
        failedToCreate: "Не удалось создать платеж",
        failedToLoadProviders: "Не удалось загрузить платежные провайдеры",
        
        // Toast Messages
        addressCopied: "Адрес скопирован в буфер обмена",
        copyFailed: "Не удалось скопировать адрес",
        
        // Theme
        toggleTheme: "Переключить тему",
        
        // Payment Guarantee
        paymentGuarantee: "Ваш платеж защищен лидирующей в отрасли безопасностью",
        
        // Payment Link
        paymentLinkReady: "Ссылка на оплату готова",
        clickToOpenPayment: "Нажмите кнопку ниже, чтобы открыть страницу оплаты",
        openPaymentPage: "Открыть страницу оплаты",
        openPaymentLink: "Открыть ссылку на оплату",
        orCopyLink: "Или скопируйте эту ссылку:",
        pleaseOpenLink: "Пожалуйста, откройте ссылку вручную",
        invalidPaymentUrl: "Неверная ссылка на оплату"
    },
    tr: {
        // Header
        title: "Güvenli Ödeme Ağ Geçidi",
        subtitle: "İşleminizi güven ve güvenlikle tamamlayın",
        
        // Amount Section
        totalAmount: "Toplam Tutar",
        amountLabel: "Ödenecek Tutar",
        secureTransaction: "Güvenli işlem • Anında işleme",
        
        // Security Badges
        sslEncrypted: "SSL Şifrelenmiş",
        securePayment: "Güvenli Ödeme",
        ssl256bit: "256-bit SSL",
        pciCompliant: "PCI Uyumlu",
        support247: "7/24 Destek",
        
        // Form Sections
        cryptocurrency: "Kripto Para",
        network: "Ağ",
        networkHint: "Ödemeleri almak için ağ",
        currency: "Para Birimi",
        cryptocurrencyType: "Kripto para türü",
        walletAddress: "Cüzdan Adresi",
        showQRCode: "QR Kodu Göster",
        copyAddress: "Adresi Kopyala",
        walletHint: "Ödemeleri almak için cüzdan adresiniz",
        closeQRCode: "QR Kodunu Kapat",
        contactInfo: "İletişim Bilgileri",
        paymentMethod: "Ödeme Yöntemi",
        
        // Form Fields
        emailLabel: "E-posta Adresiniz",
        emailPlaceholder: "sizin@email.com",
        emailHint: "Ödeme onayını bu e-postaya göndereceğiz",
        emailValid: "✓ Geçerli e-posta adresi",
        emailInvalid: "Lütfen geçerli bir e-posta adresi girin",
        providerLabel: "Ödeme Sağlayıcısını Seçin",
        providerPlaceholder: "Ödeme yöntemini seçin...",
        providerHint: "Tercih ettiğiniz ödeme ağ geçidini seçin",
        
        // Network Options
        networkTrc20: "TRC-20 (Tron)",
        networkErc20: "ERC-20 (Ethereum)",
        networkBitcoin: "Bitcoin",
        networkTron: "Tron (TRC-20)",
        networkEthereum: "Ethereum (ERC-20)",
        addressFormatTrc20: "T ile başlar, 34 karakter",
        addressFormatErc20: "0x ile başlar, 42 karakter",
        addressFormatBitcoin: "1, 3 veya bc1 ile başlar, 26-62 karakter",
        walletHintTron: "{crypto} almak için Tron (TRC-20) cüzdan adresiniz",
        walletHintErc20: "{crypto} almak için Ethereum (ERC-20) cüzdan adresiniz",
        walletHintBitcoin: "{crypto} almak için Bitcoin cüzdan adresiniz",
        
        // Cryptocurrency Options
        cryptoUsdt: "USDT",
        cryptoBtc: "BTC",
        cryptoBtcDisabled: "BTC (Sadece Bitcoin Ağı)",
        
        // Buttons
        payButton: "Güvenli Ödemeye Geç",
        newPayment: "Yeni Ödeme",
        
        // Progress
        preparingPayment: "Ödeme hazırlanıyor...",
        processing: "Ödeme işleniyor...",
        
        // Payment Result
        paymentCreated: "Ödeme Oluşturuldu",
        amount: "Tutar",
        provider: "Sağlayıcı",
        email: "E-posta",
        networkLabel: "Ağ",
        paymentPageOpened: "Ödeme sayfası tarayıcıda açıldı. Ödemeyi orada tamamlayın.",
        temporaryAddress: "Geçici ödeme adresi",
        finalWallet: "Fonlar şu adrese gönderilecek",
        
        // Errors
        error: "Hata",
        fillAllFields: "Lütfen tüm alanları doldurun",
        walletNotConfigured: "Cüzdan adresi yapılandırılmamış. Lütfen yöneticiyle iletişime geçin.",
        networkError: "Ağ hatası. Lütfen tekrar deneyin.",
        failedToCreate: "Ödeme oluşturulamadı",
        failedToLoadProviders: "Ödeme sağlayıcıları yüklenemedi",
        
        // Toast Messages
        addressCopied: "Adres panoya kopyalandı",
        copyFailed: "Adres kopyalanamadı",
        
        // Theme
        toggleTheme: "Temayı değiştir",
        
        // Payment Guarantee
        paymentGuarantee: "Ödemeniz sektör lideri güvenlik tarafından korunmaktadır"
    },
    de: {
        // Header
        title: "Sicherer Zahlungsgateway",
        subtitle: "Vervollständigen Sie Ihre Transaktion mit Vertrauen und Sicherheit",
        
        // Amount Section
        totalAmount: "Gesamtbetrag",
        amountLabel: "Zu zahlender Betrag",
        secureTransaction: "Sichere Transaktion • Sofortige Verarbeitung",
        
        // Security Badges
        sslEncrypted: "SSL-verschlüsselt",
        securePayment: "Sichere Zahlung",
        ssl256bit: "256-bit SSL",
        pciCompliant: "PCI-konform",
        support247: "24/7 Support",
        
        // Form Sections
        cryptocurrency: "Kryptowährung",
        network: "Netzwerk",
        networkHint: "Netzwerk zum Empfangen von Zahlungen",
        currency: "Währung",
        cryptocurrencyType: "Art der Kryptowährung",
        walletAddress: "Wallet-Adresse",
        showQRCode: "QR-Code anzeigen",
        copyAddress: "Adresse kopieren",
        walletHint: "Ihre Wallet-Adresse zum Empfangen von Zahlungen",
        closeQRCode: "QR-Code schließen",
        contactInfo: "Kontaktinformationen",
        paymentMethod: "Zahlungsmethode",
        
        // Form Fields
        emailLabel: "Ihre E-Mail-Adresse",
        emailPlaceholder: "ihre@email.com",
        emailHint: "Wir senden die Zahlungsbestätigung an diese E-Mail",
        emailValid: "✓ Gültige E-Mail-Adresse",
        emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        providerLabel: "Zahlungsanbieter auswählen",
        providerPlaceholder: "Zahlungsmethode wählen...",
        providerHint: "Wählen Sie Ihr bevorzugtes Zahlungsgateway",
        
        // Network Options
        networkTrc20: "TRC-20 (Tron)",
        networkErc20: "ERC-20 (Ethereum)",
        networkBitcoin: "Bitcoin",
        networkTron: "Tron (TRC-20)",
        networkEthereum: "Ethereum (ERC-20)",
        addressFormatTrc20: "Beginnt mit T, 34 Zeichen",
        addressFormatErc20: "Beginnt mit 0x, 42 Zeichen",
        addressFormatBitcoin: "Beginnt mit 1, 3 oder bc1, 26-62 Zeichen",
        walletHintTron: "Ihre Tron (TRC-20) Wallet-Adresse zum Empfangen von {crypto}",
        walletHintErc20: "Ihre Ethereum (ERC-20) Wallet-Adresse zum Empfangen von {crypto}",
        walletHintBitcoin: "Ihre Bitcoin Wallet-Adresse zum Empfangen von {crypto}",
        
        // Cryptocurrency Options
        cryptoUsdt: "USDT",
        cryptoBtc: "BTC",
        cryptoBtcDisabled: "BTC (nur Bitcoin-Netzwerk)",
        
        // Buttons
        payButton: "Zur sicheren Zahlung",
        newPayment: "Neue Zahlung",
        
        // Progress
        preparingPayment: "Zahlung wird vorbereitet...",
        processing: "Zahlung wird verarbeitet...",
        
        // Payment Result
        paymentCreated: "Zahlung erstellt",
        amount: "Betrag",
        provider: "Anbieter",
        email: "E-Mail",
        networkLabel: "Netzwerk",
        paymentPageOpened: "Zahlungsseite im Browser geöffnet. Vervollständigen Sie die Zahlung dort.",
        temporaryAddress: "Temporäre Zahlungsadresse",
        finalWallet: "Mittel werden gesendet an",
        
        // Errors
        error: "Fehler",
        fillAllFields: "Bitte füllen Sie alle Felder aus",
        walletNotConfigured: "Wallet-Adresse nicht konfiguriert. Bitte kontaktieren Sie den Administrator.",
        networkError: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
        failedToCreate: "Zahlung konnte nicht erstellt werden",
        failedToLoadProviders: "Zahlungsanbieter konnten nicht geladen werden",
        
        // Toast Messages
        addressCopied: "Adresse in die Zwischenablage kopiert",
        copyFailed: "Adresse konnte nicht kopiert werden",
        
        // Theme
        toggleTheme: "Design wechseln",
        
        // Payment Guarantee
        paymentGuarantee: "Ihre Zahlung wird von branchenführender Sicherheit geschützt"
    },
    es: {
        // Header
        title: "Pasarela de Pago Segura",
        subtitle: "Complete su transacción con confianza y seguridad",
        
        // Amount Section
        totalAmount: "Cantidad Total",
        amountLabel: "Cantidad a Pagar",
        secureTransaction: "Transacción segura • Procesamiento instantáneo",
        
        // Security Badges
        sslEncrypted: "Cifrado SSL",
        securePayment: "Pago Seguro",
        ssl256bit: "SSL de 256 bits",
        pciCompliant: "Cumple con PCI",
        support247: "Soporte 24/7",
        
        // Form Sections
        cryptocurrency: "Criptomoneda",
        network: "Red",
        networkHint: "Red para recibir pagos",
        currency: "Moneda",
        cryptocurrencyType: "Tipo de criptomoneda",
        walletAddress: "Dirección de Billetera",
        showQRCode: "Mostrar Código QR",
        copyAddress: "Copiar Dirección",
        walletHint: "Su dirección de billetera para recibir pagos",
        closeQRCode: "Cerrar Código QR",
        contactInfo: "Información de Contacto",
        paymentMethod: "Método de Pago",
        
        // Form Fields
        emailLabel: "Su Dirección de Email",
        emailPlaceholder: "su@email.com",
        emailHint: "Enviaremos la confirmación del pago a este email",
        emailValid: "✓ Dirección de email válida",
        emailInvalid: "Por favor, ingrese una dirección de email válida",
        providerLabel: "Seleccionar Proveedor de Pago",
        providerPlaceholder: "Elegir método de pago...",
        providerHint: "Seleccione su pasarela de pago preferida",
        
        // Network Options
        networkTrc20: "TRC-20 (Tron)",
        networkErc20: "ERC-20 (Ethereum)",
        networkBitcoin: "Bitcoin",
        networkTron: "Tron (TRC-20)",
        networkEthereum: "Ethereum (ERC-20)",
        addressFormatTrc20: "Comienza con T, 34 caracteres",
        addressFormatErc20: "Comienza con 0x, 42 caracteres",
        addressFormatBitcoin: "Comienza con 1, 3 o bc1, 26-62 caracteres",
        walletHintTron: "Su dirección de billetera Tron (TRC-20) para recibir {crypto}",
        walletHintErc20: "Su dirección de billetera Ethereum (ERC-20) para recibir {crypto}",
        walletHintBitcoin: "Su dirección de billetera Bitcoin para recibir {crypto}",
        
        // Cryptocurrency Options
        cryptoUsdt: "USDT",
        cryptoBtc: "BTC",
        cryptoBtcDisabled: "BTC (Solo Red Bitcoin)",
        
        // Buttons
        payButton: "Proceder al Pago Seguro",
        newPayment: "Nuevo Pago",
        
        // Progress
        preparingPayment: "Preparando pago...",
        processing: "Procesando pago...",
        
        // Payment Result
        paymentCreated: "Pago Creado",
        amount: "Cantidad",
        provider: "Proveedor",
        email: "Email",
        networkLabel: "Red",
        paymentPageOpened: "Página de pago abierta en el navegador. Complete el pago allí.",
        temporaryAddress: "Dirección de pago temporal",
        finalWallet: "Los fondos se enviarán a",
        
        // Errors
        error: "Error",
        fillAllFields: "Por favor, complete todos los campos",
        walletNotConfigured: "Dirección de billetera no configurada. Por favor, contacte al administrador.",
        networkError: "Error de red. Por favor, intente nuevamente.",
        failedToCreate: "No se pudo crear el pago",
        failedToLoadProviders: "No se pudieron cargar los proveedores de pago",
        
        // Toast Messages
        addressCopied: "Dirección copiada al portapapeles",
        copyFailed: "No se pudo copiar la dirección",
        
        // Theme
        toggleTheme: "Cambiar tema",
        
        // Payment Guarantee
        paymentGuarantee: "Su pago está protegido por seguridad líder en la industria"
    },
    pt: {
        // Header
        title: "Gateway de Pagamento Seguro",
        subtitle: "Complete sua transação com confiança e segurança",
        
        // Amount Section
        totalAmount: "Valor Total",
        amountLabel: "Valor a Pagar",
        secureTransaction: "Transação segura • Processamento instantâneo",
        
        // Security Badges
        sslEncrypted: "Criptografado SSL",
        securePayment: "Pagamento Seguro",
        ssl256bit: "SSL de 256 bits",
        pciCompliant: "Compatível com PCI",
        support247: "Suporte 24/7",
        
        // Form Sections
        cryptocurrency: "Criptomoeda",
        network: "Rede",
        networkHint: "Rede para receber pagamentos",
        currency: "Moeda",
        cryptocurrencyType: "Tipo de criptomoeda",
        walletAddress: "Endereço da Carteira",
        showQRCode: "Mostrar Código QR",
        copyAddress: "Copiar Endereço",
        walletHint: "Seu endereço de carteira para receber pagamentos",
        closeQRCode: "Fechar Código QR",
        contactInfo: "Informações de Contato",
        paymentMethod: "Método de Pagamento",
        
        // Form Fields
        emailLabel: "Seu Endereço de Email",
        emailPlaceholder: "seu@email.com",
        emailHint: "Enviaremos a confirmação do pagamento para este email",
        emailValid: "✓ Endereço de email válido",
        emailInvalid: "Por favor, insira um endereço de email válido",
        providerLabel: "Selecionar Provedor de Pagamento",
        providerPlaceholder: "Escolher método de pagamento...",
        providerHint: "Selecione seu gateway de pagamento preferido",
        
        // Network Options
        networkTrc20: "TRC-20 (Tron)",
        networkErc20: "ERC-20 (Ethereum)",
        networkBitcoin: "Bitcoin",
        networkTron: "Tron (TRC-20)",
        networkEthereum: "Ethereum (ERC-20)",
        addressFormatTrc20: "Começa com T, 34 caracteres",
        addressFormatErc20: "Começa com 0x, 42 caracteres",
        addressFormatBitcoin: "Começa com 1, 3 ou bc1, 26-62 caracteres",
        walletHintTron: "Seu endereço de carteira Tron (TRC-20) para receber {crypto}",
        walletHintErc20: "Seu endereço de carteira Ethereum (ERC-20) para receber {crypto}",
        walletHintBitcoin: "Seu endereço de carteira Bitcoin para receber {crypto}",
        
        // Cryptocurrency Options
        cryptoUsdt: "USDT",
        cryptoBtc: "BTC",
        cryptoBtcDisabled: "BTC (Apenas Rede Bitcoin)",
        
        // Buttons
        payButton: "Prosseguir para Pagamento Seguro",
        newPayment: "Novo Pagamento",
        
        // Progress
        preparingPayment: "Preparando pagamento...",
        processing: "Processando pagamento...",
        
        // Payment Result
        paymentCreated: "Pagamento Criado",
        amount: "Valor",
        provider: "Provedor",
        email: "Email",
        networkLabel: "Rede",
        paymentPageOpened: "Página de pagamento aberta no navegador. Complete o pagamento lá.",
        temporaryAddress: "Endereço de pagamento temporário",
        finalWallet: "Os fundos serão enviados para",
        
        // Errors
        error: "Erro",
        fillAllFields: "Por favor, preencha todos os campos",
        walletNotConfigured: "Endereço da carteira não configurado. Por favor, entre em contato com o administrador.",
        networkError: "Erro de rede. Por favor, tente novamente.",
        failedToCreate: "Falha ao criar pagamento",
        failedToLoadProviders: "Falha ao carregar provedores de pagamento",
        
        // Toast Messages
        addressCopied: "Endereço copiado para a área de transferência",
        copyFailed: "Falha ao copiar endereço",
        
        // Theme
        toggleTheme: "Alternar tema",
        
        // Payment Guarantee
        paymentGuarantee: "Seu pagamento está protegido por segurança líder da indústria"
    }
};

// Функция для получения текущего языка
function getCurrentLanguage() {
    return localStorage.getItem('paymentLanguage') || 'en';
}

// Функция для установки языка
function setLanguage(lang) {
    localStorage.setItem('paymentLanguage', lang);
    updateTranslations();
    
    // Обновить подсказки и опции после смены языка
    if (typeof updateHints === 'function') {
        updateHints();
    }
    if (typeof updateCryptoOptions === 'function') {
        updateCryptoOptions();
    }
}

// Функция для обновления переводов на странице
function updateTranslations() {
    const lang = getCurrentLanguage();
    const t = translations[lang] || translations.en;
    
    // Обновляем все тексты на странице
    const elements = {
        // Header
        'title': document.querySelector('.payment-header-section h1'),
        'subtitle': document.querySelector('.payment-header-section .subtitle'),
        
        // Amount Section
        'totalAmount': document.querySelector('.amount-label'),
        'secureTransaction': document.querySelector('.amount-hint'),
        
        // Security Badges
        'sslEncrypted': document.querySelector('.trust-badge:first-child span'),
        'securePayment': document.querySelector('.trust-badge:nth-child(2) span'),
        'ssl256bit': document.querySelector('.security-feature:nth-child(3) span'),
        'pciCompliant': document.querySelector('.security-feature:nth-child(4) span'),
        'support247': document.querySelector('.security-feature:nth-child(5) span'),
        
        // Form Sections (только существующие элементы)
        'walletAddress': document.querySelector('.form-section .form-section-title span'),
        'copyAddress': document.querySelector('#copyAddressBtn'),
        'walletHint': document.querySelector('#walletHint'),
        'contactInfo': document.querySelector('.form-section:nth-of-type(2) .form-section-title span'),
        
        // Form Fields
        'emailLabel': document.querySelector('label[for="email"]'),
        'emailPlaceholder': document.getElementById('email'),
        'emailHint': document.querySelector('#emailHint') || (document.querySelector('#email')?.parentElement?.querySelector('small')),
        
        // Buttons
        'payButton': document.querySelector('#payButton span'),
        'newPayment': document.querySelector('#paymentResult .btn-secondary'),
        
        // Progress
        'preparingPayment': document.querySelector('#progressText'),
        'processing': document.querySelector('#loadingText'),
        
        // Payment Guarantee
        'paymentGuarantee': document.querySelector('.payment-guarantee span'),
        
        // Theme Toggle
        'toggleTheme': document.querySelector('#themeToggle')
    };
    
    // Обновляем элементы
    if (elements.title) elements.title.textContent = t.title;
    if (elements.subtitle) elements.subtitle.textContent = t.subtitle;
    if (elements.totalAmount) elements.totalAmount.textContent = t.totalAmount;
    if (elements.secureTransaction) elements.secureTransaction.textContent = t.secureTransaction;
    if (elements.sslEncrypted) elements.sslEncrypted.textContent = t.sslEncrypted;
    if (elements.securePayment) elements.securePayment.textContent = t.securePayment;
    if (elements.ssl256bit) elements.ssl256bit.textContent = t.ssl256bit;
    if (elements.pciCompliant) elements.pciCompliant.textContent = t.pciCompliant;
    if (elements.support247) elements.support247.textContent = t.support247;
    if (elements.walletAddress) elements.walletAddress.textContent = t.walletAddress;
    if (elements.copyAddress) elements.copyAddress.setAttribute('title', t.copyAddress);
    if (elements.contactInfo) elements.contactInfo.textContent = t.contactInfo;
    if (elements.emailLabel) elements.emailLabel.textContent = t.emailLabel;
    if (elements.emailPlaceholder) elements.emailPlaceholder.placeholder = t.emailPlaceholder;
    if (elements.emailHint) elements.emailHint.textContent = t.emailHint;
    if (elements.payButton) elements.payButton.textContent = t.payButton;
    if (elements.newPayment) elements.newPayment.textContent = t.newPayment;
    if (elements.preparingPayment) elements.preparingPayment.textContent = t.preparingPayment;
    if (elements.processing) elements.processing.textContent = t.processing;
    if (elements.paymentGuarantee) elements.paymentGuarantee.textContent = t.paymentGuarantee;
    if (elements.toggleTheme) elements.toggleTheme.setAttribute('title', t.toggleTheme);
    
    // Обновляем опции сетей и криптовалют - удалено, так как теперь только Bitcoin
}

// Функция для получения перевода
function t(key) {
    const lang = getCurrentLanguage();
    const translation = translations[lang] || translations.en;
    return translation[key] || key;
}

// Функция для получения перевода с подстановкой
function tFormat(key, params) {
    let text = t(key);
    if (params) {
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
    }
    return text;
}
