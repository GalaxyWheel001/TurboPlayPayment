# 🚀 Деплой на Netlify и настройка Telegram Mini App

## 📋 Быстрый старт

### 1. Деплой на Netlify

#### Вариант A: Через Netlify CLI (рекомендуется)

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Войдите в Netlify
netlify login

# Деплой
netlify deploy --prod
```

#### Вариант B: Через Netlify UI

1. Зайдите на [netlify.com](https://www.netlify.com)
2. Нажмите "Add new site" → "Import an existing project"
3. Выберите ваш Git репозиторий
4. Настройки:
   - **Build command:** `npm install` (или оставьте пустым)
   - **Publish directory:** `public`
5. Добавьте переменные окружения (если нужно):
   - `MOONPAY_API_KEY` - ваш API ключ MoonPay
   - `ALLOWED_ORIGIN` - ваш домен Netlify
6. Нажмите "Deploy site"

### 2. Настройка Telegram Mini App

1. Откройте [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте команду: `/newapp`
3. Выберите вашего бота
4. Заполните информацию:
   - **Title:** `Payment Gateway`
   - **Short name:** `payment`
   - **Description:** `Secure payment gateway for Telegram`
   - **Web App URL:** `https://your-site.netlify.app/payment.html`
     - ⚠️ Замените `your-site` на ваш реальный домен Netlify
5. Готово! ✅

### 3. Интеграция в бота

Создайте кнопку с Web App в вашем боте:

**Python:**
```python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

keyboard = InlineKeyboardMarkup([
    [InlineKeyboardButton(
        "💳 Pay Now",
        web_app=WebAppInfo(url="https://your-site.netlify.app/payment.html")
    )]
])
```

**JavaScript:**
```javascript
const { Markup } = require('telegraf');

const keyboard = Markup.inlineKeyboard([
    Markup.button.webApp('💳 Pay Now', 'https://your-site.netlify.app/payment.html')
]);
```

### 4. Проверка

После деплоя проверьте:
- ✅ `https://your-site.netlify.app/health` - должен вернуть `{"status":"ok"}`
- ✅ `https://your-site.netlify.app/payment.html` - должна открыться страница оплаты
- ✅ Откройте Mini App в Telegram и протестируйте

---

## 📚 Подробные инструкции

- **Подробная инструкция:** `NETLIFY_DEPLOY.md`
- **Быстрый деплой:** `QUICK_DEPLOY.md`

---

## ⚙️ Конфигурация

Проект уже настроен для работы на Netlify:
- ✅ `netlify.toml` - конфигурация Netlify
- ✅ `netlify/functions/` - Netlify функции
- ✅ `public/` - статические файлы
- ✅ Все редиректы настроены

---

## 🆘 Проблемы?

- **Mini App не открывается:** Проверьте URL в BotFather (должен быть `https://`)
- **API не работает:** Проверьте логи в Netlify Dashboard → Functions → Logs
- **CORS ошибки:** Добавьте ваш домен в переменную окружения `ALLOWED_ORIGIN`

---

**Успешного деплоя! 🎉**

