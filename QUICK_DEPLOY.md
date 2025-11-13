# ⚡ Быстрый деплой на Netlify

## 🚀 Вариант 1: Деплой через Netlify CLI (самый быстрый)

### Шаг 1: Установите Netlify CLI
```bash
npm install -g netlify-cli
```

### Шаг 2: Войдите в Netlify
```bash
netlify login
```

### Шаг 3: Деплой
```bash
# Первый деплой (создаст сайт)
netlify deploy --prod

# Последующие деплои
netlify deploy --prod
```

### Шаг 4: Добавьте переменные окружения (если нужно)
```bash
netlify env:set MOONPAY_API_KEY "your_key_here"
netlify env:set ALLOWED_ORIGIN "https://your-site.netlify.app"
```

---

## 🌐 Вариант 2: Деплой через Netlify UI

1. Зайдите на [netlify.com](https://www.netlify.com)
2. Нажмите "Add new site" → "Import an existing project"
3. Выберите ваш Git репозиторий
4. Настройки:
   - **Build command:** `npm install` (или оставьте пустым)
   - **Publish directory:** `public`
5. Добавьте переменные окружения в "Site settings" → "Environment variables"
6. Нажмите "Deploy site"

---

## 🤖 Настройка Telegram Mini App

1. Откройте [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте: `/newapp`
3. Выберите вашего бота
4. Заполните:
   - **Title:** `Payment Gateway`
   - **Short name:** `payment`
   - **Web App URL:** `https://your-site.netlify.app/payment.html`
   - (Замените `your-site` на ваш реальный домен Netlify)
5. Готово! ✅

---

## ✅ Проверка

После деплоя проверьте:
- `https://your-site.netlify.app/health` - должен вернуть `{"status":"ok"}`
- `https://your-site.netlify.app/payment.html` - должна открыться страница оплаты

---

**Подробная инструкция:** См. `NETLIFY_DEPLOY.md`

