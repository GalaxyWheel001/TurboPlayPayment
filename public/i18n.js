const translations = {
    tr: {
        // Payment header
        title: "Güvenli Ödeme Ağı",
        subtitle: "İşleminizi güvenle ve hızla tamamlayın",

        // Amount section
        totalAmount: "Toplam Tutar",
        amountLabel: "Ödenecek Tutar",
        secureTransaction: "Güvenli işlem • Anında onay",

        // Security badges
        sslEncrypted: "SSL ile şifrelenmiş",
        securePayment: "Güvenli ödeme",
        ssl256bit: "256-bit SSL",
        pciCompliant: "PCI uyumlu",
        support247: "7/24 destek",

        // Form sections and fields
        walletAddress: "Bitcoin cüzdan adresi",
        walletHint: "Ödemeleri almak için Bitcoin cüzdan adresiniz",
        walletNotConfigured: "Cüzdan adresi yapılandırılmamış. Lütfen yönetici ile iletişime geçin.",
        walletInvalid: "Geçerli bir Bitcoin cüzdan adresi girin.",
        contactInfo: "İletişim bilgileri",
        emailLabel: "E-posta adresiniz",
        emailPlaceholder: "ornek@eposta.com",
        emailHint: "Ödeme onayını bu adrese gönderiyoruz",
        emailValid: "Geçerli e-posta adresi",
        emailInvalid: "Lütfen geçerli bir e-posta adresi girin.",
        emailRequired: "Lütfen e-posta adresinizi girin.",
        paymentMethod: "Ödeme yöntemi",
        copyAddress: "Adresi kopyala",

        // Buttons
        payButton: "Güvenli ödemeye geç",
        newPayment: "Yeni ödeme",
        continueButton: "Devam et",

        // Progress & status
        preparingPayment: "Ödeme hazırlanıyor...",
        processing: "Ödeme işleniyor...",
        paymentCreated: "Ödeme oluşturuldu",
        paymentSuccessful: "Ödeme başarıyla tamamlandı!",
        paymentCompleted: "Ödemeniz başarıyla sonuçlandı.",
        paymentFailed: "Ödeme tamamlanmadı",
        paymentFailedMessage: "Ödeme tamamlanmadı. Tekrar deneyebilir veya başka bir yöntem seçebilirsiniz.",
        paymentGuarantee: "Ödemeniz sektör lideri güvenlik ile korunur",
        paymentLinkReady: "Ödeme bağlantısı hazır",
        clickToOpenPayment: "Ödeme sayfasını açmak için aşağıdaki butona dokunun",
        openPaymentPage: "Ödeme sayfasını aç",
        openPaymentLink: "Ödeme bağlantısını aç",
        orCopyLink: "Ya da bağlantıyı kopyalayın:",
        pleaseOpenLink: "Lütfen bağlantıyı manuel olarak açın.",
        invalidPaymentUrl: "Geçersiz ödeme bağlantısı",

        // Payment result labels
        amount: "Tutar",
        provider: "Sağlayıcı",
        email: "E-posta",
        networkLabel: "Ağ",
        finalWallet: "Fonların gönderileceği adres",
        paymentId: "Ödeme kimliği",
        status: "Durum",

        // Errors & notifications
        error: "Hata",
        fillAllFields: "Lütfen tüm alanları doldurun.",
        failedToCreate: "Ödeme oluşturulamadı.",
        networkError: "Ağ hatası. Lütfen tekrar deneyin.",
        addressCopied: "Adres panoya kopyalandı.",
        copyFailed: "Adres kopyalanamadı.",

        // Index page
        choosePaymentMethod: "Ödeme yöntemini seçin",
        selectPaymentOption: "Tercih ettiğiniz seçeneği belirleyin",
        cardPayment: "Kart ile ödeme",
        cardPaymentSubtitle: "VISA / Mastercard / Apple Pay / Google Pay",
        ibanTransfer: "IBAN havalesi",
        ibanTransferSubtitle: "IBAN üzerinden banka transferi",

        // IBAN page copy
        ibanPageTitle: "Banka Havalesi (IBAN)",
        ibanPageSubtitle: "Güvenli havale için aşağıdaki bilgileri kullanın.",
        ibanLoadingRequisites: "Ödeme bilgileri yükleniyor...",
        ibanRequisitesDetails: "Ödeme bilgileri",
        ibanRequisitesTitle: "Ödeme bilgileri",
        ibanRequisitesMessage: "Ödeme bilgileri için lütfen destekle iletişime geçin.",
        ibanRequisitesModeration: "Ödeme bilgileri sağlayıcı onayından sonra görüntülenecek.",
        ibanRequisitesErrorMessage: "Geçici bir hata oluştu. Lütfen tekrar deneyin.",
        ibanRequisitesError: "Ödeme bilgileri alınamadı.",
        ibanNoRequisites: "Ödeme bilgileri şu anda mevcut değil. Lütfen destekle iletişime geçin.",
        ibanRequisitesProcessing: "Ödeme bilgileri hazırlanıyor. Lütfen kısa süre sonra yenileyin.",
        ibanRequisitesRefreshing: "Ödeme bilgileri yenileniyor...",
        ibanAmountHint: "Tutar Türk Lirası (TRY) cinsinden girilmelidir.",
        ibanEmailLabel: "Müşteri e-postası",
        ibanGenerateInvoice: "Bilgileri al",
        ibanAmountInvalid: "Lütfen 0'dan büyük geçerli bir tutar girin.",
        ibanEmailInvalid: "Lütfen geçerli bir e-posta adresi girin.",
        ibanEnterAmount: "Ödeme bilgilerini almak için tutarı ve e-postayı girin.",
        ibanInstructionsTitle: "Havale talimatları",
        ibanInstructionsDescription: "Havaleyi tamamlamak için adımları izleyin.",
        ibanStep1: "Bankanızdan veya ödeme uygulamanızdan havale başlatın.",
        ibanStep2: "Gönderilen IBAN ve açıklamayı kullanın.",
        ibanStep3: "Fonları gönderdikten sonra e-posta ile onay bekleyin.",
        ibanAmountLabel: "Ödenecek tutar",
        ibanOrderIdLabel: "Sipariş numarası",
        ibanCommentLabel: "Açıklama",
        ibanOpenPayment: "Ödemeye devam et",
        ibanCopyOrderId: "ID'yi kopyala",
        ibanStatusLabel: "Ödeme durumu",
        ibanCheckStatus: "Durumu kontrol et",
        ibanStatusUnknown: "Durum mevcut değil",
        ibanStatusProcessingMessage: "Ödeme işleniyor. Lütfen onay için bekleyin.",
        ibanStatusCancelledMessage: "Ödeme iptal edildi veya onaylanmadı.",
        ibanStatusSuccessTitle: "Havale onaylandı",
        ibanStatusSuccessMessage: "Onay aldık. Ek işlem gerekmiyor.",
        ibanStatusFailureTitle: "Havale beklemede",
        ibanStatusFailureMessage: "Henüz onay alınmadı. Lütfen bankanızla kontrol edin.",
        ibanStatusFetchError: "Durum alınamadı. Lütfen daha sonra tekrar deneyin.",
        ibanInvoiceError: "Ödeme bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.",
        ibanNoPaymentUrl: "Ödeme bağlantısı mevcut değil.",
        ibanBackToMethods: "Ödeme yöntemlerine dön",
        ibanSupportTitle: "Yardıma mı ihtiyacınız var?",
        ibanSupportDescription: "Destek ekibine ödeme kimliğinizi iletin.",
        ibanReferenceLabel: "Referans / Ödeme kimliği"
    }
};

function getCurrentLanguage() {
    return 'tr';
}

function setLanguage(lang) {
    updateTranslations();

    if (typeof updateHints === 'function') {
        updateHints();
    }
    if (typeof updateCryptoOptions === 'function') {
        updateCryptoOptions();
    }
}

window.setLanguage = setLanguage;

function updateTranslations() {
    const dict = translations.tr;
    if (!dict) return;

    const setTextById = (id, key) => {
        const el = document.getElementById(id);
        if (el && dict[key]) {
            el.textContent = dict[key];
        }
    };

    const setText = (selector, key) => {
        const el = document.querySelector(selector);
        if (el && dict[key]) {
            el.textContent = dict[key];
        }
    };

    const setAttr = (selector, attr, key) => {
        const el = document.querySelector(selector);
        if (el && dict[key]) {
            el[attr] = dict[key];
        }
    };

    // Index page elements
    setTextById('pageTitle', 'choosePaymentMethod');
    setTextById('pageSubtitle', 'selectPaymentOption');
    setTextById('cardPaymentTitle', 'cardPayment');
    setTextById('cardPaymentSubtitle', 'cardPaymentSubtitle');
    setTextById('cardPaymentButtonText', 'continueButton');
    setTextById('ibanPaymentTitle', 'ibanTransfer');
    setTextById('ibanPaymentSubtitle', 'ibanTransferSubtitle');
    setTextById('ibanPaymentButtonText', 'continueButton');
    setTextById('securePaymentBadge', 'securePayment');
    setTextById('sslEncryptedBadge', 'sslEncrypted');

    // Payment page elements
    setText('.payment-header-section h1', 'title');
    setText('.payment-header-section .subtitle', 'subtitle');
    setText('.amount-label', 'totalAmount');
    setText('.amount-hint', 'secureTransaction');
    setText('.payment-guarantee span', 'paymentGuarantee');
    setText('#progressText', 'preparingPayment');
    setText('#loadingText', 'processing');
    setText('#payButton span', 'payButton');
    setText('#paymentResult .btn-secondary', 'newPayment');
    setText('#walletHint', 'walletHint');
    setText('.form-section .form-section-title span', 'walletAddress');
    setText('.form-section:nth-of-type(2) .form-section-title span', 'contactInfo');
    setText('.trust-badge:first-child span', 'sslEncrypted');
    setText('.trust-badge:nth-child(2) span', 'securePayment');

    setAttr('label[for="email"]', 'textContent', 'emailLabel');
    const emailInput = document.getElementById('email');
    if (emailInput && dict.emailPlaceholder) {
        emailInput.placeholder = dict.emailPlaceholder;
    }
    const emailHint = document.getElementById('emailHint');
    if (emailHint && dict.emailHint) {
        emailHint.textContent = dict.emailHint;
    }
    const copyBtn = document.getElementById('copyAddressBtn');
    if (copyBtn && dict.copyAddress) {
        copyBtn.setAttribute('title', dict.copyAddress);
    }

    // IBAN page elements
    setTextById('ibanPageTitle', 'ibanPageTitle');
    setTextById('ibanPageSubtitle', 'ibanPageSubtitle');
    setTextById('ibanWidgetMessage', 'ibanLoadingRequisites');
}

function t(key) {
    const translation = translations.tr;
    return translation?.[key] || key;
}

function tFormat(key, params) {
    let text = t(key);
    if (params) {
        Object.keys(params).forEach((param) => {
            text = text.replace(`{${param}}`, params[param]);
        });
    }
    return text;
}
