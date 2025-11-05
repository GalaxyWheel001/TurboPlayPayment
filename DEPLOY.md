# Инструкция по деплою на Netlify

## Подготовка к деплою

1. **Убедитесь, что проект готов:**
   - Все файлы находятся в репозитории
   - `netlify.toml` настроен
   - `netlify/functions/` содержит все функции

2. **Переменные окружения:**
   - `MOONPAY_API_KEY` - API ключ MoonPay (опционально)
   - `ALLOWED_ORIGIN` - разрешенный домен для CORS (опционально)
   - `ALLOWED_HOST` - разрешенный хост для callback (опционально)

## Деплой через Netlify UI

1. Зайдите на [netlify.com](https://www.netlify.com)
2. Нажмите "Add new site" → "Import an existing project"
3. Подключите ваш Git репозиторий (GitHub, GitLab, Bitbucket)
4. Настройки сборки:
   - **Build command:** `npm install` (или оставьте пустым)
   - **Publish directory:** `public`
5. Перейдите в "Site settings" → "Environment variables"
6. Добавьте переменные окружения:
   - `MOONPAY_API_KEY` (если есть)
   - `ALLOWED_ORIGIN` (если нужно)
   - `ALLOWED_HOST` (если нужно)
7. Нажмите "Deploy site"

## Деплой через Netlify CLI

1. Установите Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Войдите в Netlify:
```bash
netlify login
```

3. Инициализируйте сайт:
```bash
netlify init
```

4. Добавьте переменные окружения:
```bash
netlify env:set MOONPAY_API_KEY "your_key_here"
netlify env:set ALLOWED_ORIGIN "https://your-domain.com"
```

5. Деплой:
```bash
netlify deploy --prod
```

## Настройка Telegram Mini App

После деплоя:

1. Получите URL вашего сайта (например: `https://your-site.netlify.app`)

2. В Telegram Bot:
   - Откройте [@BotFather](https://t.me/botfather)
   - Используйте команду `/newapp` или `/editapp`
   - Выберите вашего бота
   - Укажите:
     - **Title:** Payment Gateway
     - **Short name:** payment
     - **Description:** Secure payment gateway for Telegram
     - **Photo:** загрузите иконку (192x192 или 512x512)
     - **Web App URL:** `https://your-site.netlify.app/payment.html`
     - **Animation:** опционально

3. Создайте кнопку для Mini App:
```javascript
// В вашем боте создайте кнопку
{
  text: "💳 Pay",
  web_app: {
    url: "https://your-site.netlify.app/payment.html"
  }
}
```

## Проверка работы

1. Проверьте health endpoint:
   - `https://your-site.netlify.app/health`

2. Проверьте API endpoints:
   - `https://your-site.netlify.app/api/providers`
   - `https://your-site.netlify.app/api/create-payment` (POST)

3. Откройте Mini App в Telegram и протестируйте платеж

## Troubleshooting

- **Ошибка 404 на /api/:** Проверьте `netlify.toml` и правильность redirects
- **CORS ошибки:** Добавьте ваш домен в `ALLOWED_ORIGIN`
- **Функции не работают:** Проверьте логи в Netlify Dashboard → Functions → Logs

