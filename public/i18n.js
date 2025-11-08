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
        paymentSuccessful: "Payment Successful!",
        paymentCompleted: "Your payment has been successfully completed!",
        paymentFailed: "Payment not completed",
        paymentFailedMessage: "The payment was not completed. You can try again or choose another payment method.",
        paymentId: "Payment ID",
        status: "Status",
        
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
        invalidPaymentUrl: "Invalid payment URL",
        
        // Payment Method Selection Page
        choosePaymentMethod: "Choose Payment Method",
        selectPaymentOption: "Select your preferred payment option",
        cardPayment: "Card Payment",
        cardPaymentSubtitle: "VISA / Mastercard / Apple Pay / Google Pay",
        ibanTransfer: "IBAN Transfer",
        ibanTransferSubtitle: "Bank transfer via IBAN",
        continueButton: "Continue",

        // IBAN Page
        ibanPageTitle: "Bank Transfer (IBAN)",
        ibanPageSubtitle: "Use the details below to complete a secure bank transfer.",
        ibanIntegrationTitle: "Integration Parameters",
        ibanIntegrationSubtitle: "Copy these values into the provider dashboard.",
        ibanIntegrationName: "Integration Name",
        ibanIntegrationDomain: "Domain",
        ibanIntegrationSecretKey: "Secret Key",
        ibanIntegrationHandler: "Callback URL",
        ibanIntegrationSuccess: "Successful payment URL",
        ibanIntegrationFailure: "Failed payment URL",
        ibanIntegrationNote: "Keep the secret key private. Share it only with trusted payment providers.",
        ibanShowSecret: "Show secret",
        ibanHideSecret: "Hide secret",
        ibanCopy: "Copy",
        ibanCopied: "Copied",
        ibanInstructionsTitle: "Transfer instructions",
        ibanInstructionsDescription: "Follow these steps to complete the transfer.",
        ibanStep1: "Initiate a transfer from your bank or payment application.",
        ibanStep2: "Use the provided IBAN and reference to ensure automatic matching.",
        ibanStep3: "After sending the funds, wait for confirmation via email.",
        ibanStatusSuccessTitle: "Transfer confirmed",
        ibanStatusSuccessMessage: "We have received confirmation. No further action is required.",
        ibanStatusFailureTitle: "Transfer pending",
        ibanStatusFailureMessage: "We have not received confirmation yet. Please verify the transfer with your bank.",
        ibanBackToMethods: "Back to payment methods",
        ibanSupportTitle: "Need help?",
        ibanSupportDescription: "Contact support and provide your payment ID or transfer reference.",
        ibanReferenceLabel: "Reference / Payment ID"
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
        paymentSuccessful: "Платеж успешно завершен!",
        paymentCompleted: "Ваш платеж успешно завершен!",
        paymentFailed: "Платеж не завершен",
        paymentFailedMessage: "Платеж не был завершен. Попробуйте ещё раз или выберите другой способ оплаты.",
        paymentId: "ID платежа",
        status: "Статус",
        
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
        invalidPaymentUrl: "Неверная ссылка на оплату",
        
        // Payment Method Selection Page
        choosePaymentMethod: "Выберите способ оплаты",
        selectPaymentOption: "Выберите предпочитаемый способ оплаты",
        cardPayment: "Оплата картой",
        cardPaymentSubtitle: "VISA / Mastercard / Apple Pay / Google Pay",
        ibanTransfer: "Банковский перевод",
        ibanTransferSubtitle: "Банковский перевод через IBAN",
        continueButton: "Продолжить",

        // IBAN Page
        ibanPageTitle: "Банковский перевод (IBAN)",
        ibanPageSubtitle: "Используйте данные ниже для безопасного банковского перевода.",
        ibanIntegrationTitle: "Параметры интеграции",
        ibanIntegrationSubtitle: "Скопируйте эти значения в кабинете платежного провайдера.",
        ibanIntegrationName: "Название интеграции",
        ibanIntegrationDomain: "Домен",
        ibanIntegrationSecretKey: "Секретный ключ",
        ibanIntegrationHandler: "URL обработчика",
        ibanIntegrationSuccess: "URL успешной оплаты",
        ibanIntegrationFailure: "URL неуспешной оплаты",
        ibanIntegrationNote: "Храните секретный ключ в безопасности. Передавайте его только доверенным провайдерам.",
        ibanShowSecret: "Показать ключ",
        ibanHideSecret: "Скрыть ключ",
        ibanCopy: "Копировать",
        ibanCopied: "Скопировано",
        ibanInstructionsTitle: "Инструкция по переводу",
        ibanInstructionsDescription: "Следуйте этим шагам, чтобы завершить перевод.",
        ibanStep1: "Инициируйте перевод в вашем банке или платежном приложении.",
        ibanStep2: "Используйте указанный IBAN и назначение платежа для автоматического сопоставления.",
        ibanStep3: "После отправки средств дождитесь подтверждения по email.",
        ibanStatusSuccessTitle: "Перевод подтверждён",
        ibanStatusSuccessMessage: "Мы получили подтверждение. Дополнительных действий не требуется.",
        ibanStatusFailureTitle: "Перевод ожидает подтверждения",
        ibanStatusFailureMessage: "Подтверждение ещё не получено. Проверьте статус перевода в вашем банке.",
        ibanBackToMethods: "Вернуться к способам оплаты",
        ibanSupportTitle: "Нужна помощь?",
        ibanSupportDescription: "Свяжитесь с поддержкой и укажите ID платежа или назначение перевода.",
        ibanReferenceLabel: "Назначение / ID платежа"
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
        paymentSuccessful: "Ödeme başarıyla tamamlandı!",
        paymentCompleted: "Ödemeniz başarıyla tamamlandı!",
        paymentFailed: "Ödeme tamamlanmadı",
        paymentFailedMessage: "Ödeme tamamlanmadı. Tekrar deneyebilir veya başka bir ödeme yöntemi seçebilirsiniz.",
        paymentId: "Ödeme Kimliği",
        status: "Durum",
        
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
        paymentGuarantee: "Ödemeniz sektör lideri güvenlik tarafından korunmaktadır",
        
        // Payment Link
        paymentLinkReady: "Ödeme Bağlantısı Hazır",
        clickToOpenPayment: "Ödeme sayfasını açmak için aşağıdaki düğmeye tıklayın",
        openPaymentPage: "Ödeme Sayfasını Aç",
        openPaymentLink: "Ödeme Bağlantısını Aç",
        orCopyLink: "Veya bu bağlantıyı kopyalayın:",
        pleaseOpenLink: "Lütfen bağlantıyı manuel olarak açın",
        invalidPaymentUrl: "Geçersiz ödeme URL'si",
        
        // Payment Method Selection Page
        choosePaymentMethod: "Ödeme Yöntemini Seçin",
        selectPaymentOption: "Tercih ettiğiniz ödeme seçeneğini seçin",
        cardPayment: "Kart Ödemesi",
        cardPaymentSubtitle: "VISA / Mastercard / Apple Pay / Google Pay",
        ibanTransfer: "IBAN Transferi",
        ibanTransferSubtitle: "IBAN ile banka transferi",
        continueButton: "Devam Et",

        // IBAN Page
        ibanPageTitle: "Banka Havalesi (IBAN)",
        ibanPageSubtitle: "Güvenli bir banka havalesi yapmak için aşağıdaki bilgileri kullanın.",
        ibanIntegrationTitle: "Entegrasyon Parametreleri",
        ibanIntegrationSubtitle: "Bu değerleri sağlayıcı paneline kopyalayın.",
        ibanIntegrationName: "Entegrasyon Adı",
        ibanIntegrationDomain: "Alan adı",
        ibanIntegrationSecretKey: "Gizli anahtar",
        ibanIntegrationHandler: "Callback URL",
        ibanIntegrationSuccess: "Başarılı ödeme URL'si",
        ibanIntegrationFailure: "Başarısız ödeme URL'si",
        ibanIntegrationNote: "Gizli anahtarı güvende tutun. Yalnızca güvendiğiniz sağlayıcılarla paylaşın.",
        ibanShowSecret: "Anahtarı göster",
        ibanHideSecret: "Anahtarı gizle",
        ibanCopy: "Kopyala",
        ibanCopied: "Kopyalandı",
        ibanInstructionsTitle: "Havale talimatları",
        ibanInstructionsDescription: "Havaleyi tamamlamak için bu adımları izleyin.",
        ibanStep1: "Bankanızdan veya ödeme uygulamasından bir havale başlatın.",
        ibanStep2: "Otomatik eşleşme için verilen IBAN ve açıklamayı kullanın.",
        ibanStep3: "Fonları gönderdikten sonra e-posta ile onay bekleyin.",
        ibanStatusSuccessTitle: "Havale onaylandı",
        ibanStatusSuccessMessage: "Onay aldık. Ek işlem gerekmez.",
        ibanStatusFailureTitle: "Havale beklemede",
        ibanStatusFailureMessage: "Henüz onay almadık. Lütfen bankanızla havaleyi kontrol edin.",
        ibanBackToMethods: "Ödeme yöntemlerine dön",
        ibanSupportTitle: "Yardıma mı ihtiyacınız var?",
        ibanSupportDescription: "Destek ile iletişime geçin ve ödeme kimliğinizi veya havale açıklamasını paylaşın.",
        ibanReferenceLabel: "Açıklama / Ödeme Kimliği"
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
        paymentSuccessful: "Zahlung erfolgreich!",
        paymentCompleted: "Ihre Zahlung wurde erfolgreich abgeschlossen!",
        paymentFailed: "Zahlung nicht abgeschlossen",
        paymentFailedMessage: "Die Zahlung wurde nicht abgeschlossen. Sie können es erneut versuchen oder eine andere Zahlungsmethode wählen.",
        paymentId: "Zahlungs-ID",
        status: "Status",
        
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
        paymentGuarantee: "Ihre Zahlung wird von branchenführender Sicherheit geschützt",
        
        // Payment Link
        paymentLinkReady: "Zahlungslink bereit",
        clickToOpenPayment: "Klicken Sie auf die Schaltfläche unten, um die Zahlungsseite zu öffnen",
        openPaymentPage: "Zahlungsseite öffnen",
        openPaymentLink: "Zahlungslink öffnen",
        orCopyLink: "Oder kopieren Sie diesen Link:",
        pleaseOpenLink: "Bitte öffnen Sie den Link manuell",
        invalidPaymentUrl: "Ungültige Zahlungs-URL",
        
        // Payment Method Selection Page
        choosePaymentMethod: "Zahlungsmethode wählen",
        selectPaymentOption: "Wählen Sie Ihre bevorzugte Zahlungsoption",
        cardPayment: "Kartenzahlung",
        cardPaymentSubtitle: "VISA / Mastercard / Apple Pay / Google Pay",
        ibanTransfer: "IBAN-Überweisung",
        ibanTransferSubtitle: "Banküberweisung per IBAN",
        continueButton: "Weiter",

        // IBAN Page
        ibanPageTitle: "Banküberweisung (IBAN)",
        ibanPageSubtitle: "Verwenden Sie die folgenden Daten für eine sichere Banküberweisung.",
        ibanIntegrationTitle: "Integrationsparameter",
        ibanIntegrationSubtitle: "Tragen Sie diese Werte im Anbieter-Dashboard ein.",
        ibanIntegrationName: "Integrationsname",
        ibanIntegrationDomain: "Domain",
        ibanIntegrationSecretKey: "Geheimer Schlüssel",
        ibanIntegrationHandler: "Callback-URL",
        ibanIntegrationSuccess: "URL für erfolgreiche Zahlung",
        ibanIntegrationFailure: "URL für fehlgeschlagene Zahlung",
        ibanIntegrationNote: "Bewahren Sie den geheimen Schlüssel sicher auf. Teilen Sie ihn nur mit vertrauenswürdigen Anbietern.",
        ibanShowSecret: "Schlüssel anzeigen",
        ibanHideSecret: "Schlüssel verbergen",
        ibanCopy: "Kopieren",
        ibanCopied: "Kopiert",
        ibanInstructionsTitle: "Überweisungsanleitung",
        ibanInstructionsDescription: "Befolgen Sie diese Schritte, um die Überweisung abzuschließen.",
        ibanStep1: "Starten Sie eine Überweisung über Ihre Bank oder Zahlungs-App.",
        ibanStep2: "Verwenden Sie den angegebenen IBAN und den Verwendungszweck für die automatische Zuordnung.",
        ibanStep3: "Warten Sie nach dem Abschicken auf die Bestätigung per E-Mail.",
        ibanStatusSuccessTitle: "Überweisung bestätigt",
        ibanStatusSuccessMessage: "Wir haben die Bestätigung erhalten. Weitere Schritte sind nicht erforderlich.",
        ibanStatusFailureTitle: "Überweisung ausstehend",
        ibanStatusFailureMessage: "Wir haben noch keine Bestätigung erhalten. Bitte prüfen Sie die Überweisung bei Ihrer Bank.",
        ibanBackToMethods: "Zurück zu den Zahlungsmethoden",
        ibanSupportTitle: "Brauchen Sie Hilfe?",
        ibanSupportDescription: "Kontaktieren Sie den Support und geben Sie Ihre Zahlungs-ID oder den Verwendungszweck an.",
        ibanReferenceLabel: "Verwendungszweck / Zahlungs-ID"
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
        paymentSuccessful: "¡Pago completado!",
        paymentCompleted: "Tu pago se ha completado correctamente.",
        paymentFailed: "Pago no completado",
        paymentFailedMessage: "El pago no se completó. Puedes intentarlo de nuevo o elegir otro método de pago.",
        paymentId: "ID de pago",
        status: "Estado",
        
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
        paymentGuarantee: "Su pago está protegido por seguridad líder en la industria",
        
        // Payment Link
        paymentLinkReady: "Enlace de Pago Listo",
        clickToOpenPayment: "Haga clic en el botón a continuación para abrir la página de pago",
        openPaymentPage: "Abrir Página de Pago",
        openPaymentLink: "Abrir Enlace de Pago",
        orCopyLink: "O copie este enlace:",
        pleaseOpenLink: "Por favor, abra el enlace manualmente",
        invalidPaymentUrl: "URL de pago inválida",
        
        // Payment Method Selection Page
        choosePaymentMethod: "Elegir Método de Pago",
        selectPaymentOption: "Seleccione su opción de pago preferida",
        cardPayment: "Pago con Tarjeta",
        cardPaymentSubtitle: "VISA / Mastercard / Apple Pay / Google Pay",
        ibanTransfer: "Transferencia IBAN",
        ibanTransferSubtitle: "Transferencia bancaria vía IBAN",
        continueButton: "Continuar",

        // IBAN Page
        ibanPageTitle: "Transferencia bancaria (IBAN)",
        ibanPageSubtitle: "Utiliza los datos a continuación para realizar una transferencia bancaria segura.",
        ibanIntegrationTitle: "Parámetros de integración",
        ibanIntegrationSubtitle: "Copia estos valores en el panel del proveedor.",
        ibanIntegrationName: "Nombre de la integración",
        ibanIntegrationDomain: "Dominio",
        ibanIntegrationSecretKey: "Clave secreta",
        ibanIntegrationHandler: "URL del callback",
        ibanIntegrationSuccess: "URL de pago exitoso",
        ibanIntegrationFailure: "URL de pago fallido",
        ibanIntegrationNote: "Mantén la clave secreta en un lugar seguro. Compártela solo con proveedores de confianza.",
        ibanShowSecret: "Mostrar clave",
        ibanHideSecret: "Ocultar clave",
        ibanCopy: "Copiar",
        ibanCopied: "Copiado",
        ibanInstructionsTitle: "Instrucciones de transferencia",
        ibanInstructionsDescription: "Sigue estos pasos para completar la transferencia.",
        ibanStep1: "Inicia una transferencia desde tu banco o aplicación de pagos.",
        ibanStep2: "Utiliza el IBAN y la referencia proporcionados para asegurar la conciliación automática.",
        ibanStep3: "Después de enviar los fondos, espera la confirmación por correo electrónico.",
        ibanStatusSuccessTitle: "Transferencia confirmada",
        ibanStatusSuccessMessage: "Hemos recibido la confirmación. No se requieren más acciones.",
        ibanStatusFailureTitle: "Transferencia pendiente",
        ibanStatusFailureMessage: "Aún no hemos recibido la confirmación. Verifica la transferencia con tu banco.",
        ibanBackToMethods: "Volver a los métodos de pago",
        ibanSupportTitle: "¿Necesitas ayuda?",
        ibanSupportDescription: "Contacta al soporte y proporciona tu ID de pago o referencia de transferencia.",
        ibanReferenceLabel: "Referencia / ID de pago"
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
        paymentSuccessful: "Pagamento concluído!",
        paymentCompleted: "Seu pagamento foi concluído com sucesso!",
        paymentFailed: "Pagamento não concluído",
        paymentFailedMessage: "O pagamento não foi concluído. Você pode tentar novamente ou escolher outra forma de pagamento.",
        paymentId: "ID do pagamento",
        status: "Status",
        
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
        paymentGuarantee: "Seu pagamento está protegido por segurança líder da indústria",
        
        // Payment Link
        paymentLinkReady: "Link de Pagamento Pronto",
        clickToOpenPayment: "Clique no botão abaixo para abrir a página de pagamento",
        openPaymentPage: "Abrir Página de Pagamento",
        openPaymentLink: "Abrir Link de Pagamento",
        orCopyLink: "Ou copie este link:",
        pleaseOpenLink: "Por favor, abra o link manualmente",
        invalidPaymentUrl: "URL de pagamento inválida",
        
        // Payment Method Selection Page
        choosePaymentMethod: "Escolher Método de Pagamento",
        selectPaymentOption: "Selecione sua opção de pagamento preferida",
        cardPayment: "Pagamento com Cartão",
        cardPaymentSubtitle: "VISA / Mastercard / Apple Pay / Google Pay",
        ibanTransfer: "Transferência IBAN",
        ibanTransferSubtitle: "Transferência bancária via IBAN",
        continueButton: "Continuar",

        // IBAN Page
        ibanPageTitle: "Transferência bancária (IBAN)",
        ibanPageSubtitle: "Use os dados abaixo para concluir uma transferência bancária segura.",
        ibanIntegrationTitle: "Parâmetros de integração",
        ibanIntegrationSubtitle: "Copie esses valores no painel do provedor.",
        ibanIntegrationName: "Nome da integração",
        ibanIntegrationDomain: "Domínio",
        ibanIntegrationSecretKey: "Chave secreta",
        ibanIntegrationHandler: "URL do callback",
        ibanIntegrationSuccess: "URL de pagamento bem-sucedido",
        ibanIntegrationFailure: "URL de pagamento malsucedido",
        ibanIntegrationNote: "Mantenha a chave secreta em segurança. Compartilhe apenas com provedores confiáveis.",
        ibanShowSecret: "Mostrar chave",
        ibanHideSecret: "Ocultar chave",
        ibanCopy: "Copiar",
        ibanCopied: "Copiado",
        ibanInstructionsTitle: "Instruções da transferência",
        ibanInstructionsDescription: "Siga estas etapas para concluir a transferência.",
        ibanStep1: "Inicie uma transferência no seu banco ou aplicativo de pagamentos.",
        ibanStep2: "Use o IBAN e a referência fornecidos para garantir a conciliação automática.",
        ibanStep3: "Após enviar os fundos, aguarde a confirmação por e-mail.",
        ibanStatusSuccessTitle: "Transferência confirmada",
        ibanStatusSuccessMessage: "Recebemos a confirmação. Nenhuma outra ação é necessária.",
        ibanStatusFailureTitle: "Transferência pendente",
        ibanStatusFailureMessage: "Ainda não recebemos a confirmação. Verifique a transferência com seu banco.",
        ibanBackToMethods: "Voltar aos métodos de pagamento",
        ibanSupportTitle: "Precisa de ajuda?",
        ibanSupportDescription: "Entre em contato com o suporte e informe o ID do pagamento ou a referência da transferência.",
        ibanReferenceLabel: "Referência / ID do pagamento"
    }
};

// Функция для получения текущего языка
function getCurrentLanguage() {
    return localStorage.getItem('paymentLanguage') || 'en';
}

// Функция для установки языка
function setLanguage(lang) {
    localStorage.setItem('paymentLanguage', lang);
    localStorage.setItem('selectedLanguage', lang); // Дублируем для совместимости
    updateTranslations();
    
    // Обновить подсказки и опции после смены языка
    if (typeof updateHints === 'function') {
        updateHints();
    }
    if (typeof updateCryptoOptions === 'function') {
        updateCryptoOptions();
    }
}

// Экспортируем функцию для использования в onchange атрибутах
window.setLanguage = setLanguage;

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
