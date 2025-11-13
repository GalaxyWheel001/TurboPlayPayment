# Инструкция по созданию Telegram Mini App

## Шаг 1: Создание Telegram бота

1. Откройте [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям:
   - Укажите имя бота (например: "Payment Gateway Bot")
   - Укажите username бота (например: "payment_gateway_bot")

4. Сохраните токен бота (он понадобится для настройки)

## Шаг 2: Создание Mini App

1. В [@BotFather](https://t.me/botfather) отправьте команду `/newapp`
2. Выберите вашего бота из списка
3. Заполните данные:
   - **Title:** Payment Gateway
   - **Short name:** payment (только латинские буквы и подчеркивания)
   - **Description:** Secure payment gateway for Bitcoin transactions
   - **Photo:** загрузите иконку (рекомендуется 512x512px)
   - **Web App URL:** `https://your-site.netlify.app/payment.html`
   - **Animation:** опционально (можно пропустить)

4. Сохраните URL вашего Mini App

## Шаг 3: Пример кода бота (Node.js)

```javascript
const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, '👋 Добро пожаловать в Payment Gateway!', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '💳 Открыть платеж',
            web_app: {
              url: 'https://your-site.netlify.app/payment.html'
            }
          }
        ]
      ]
    }
  });
});

// Команда /pay
bot.onText(/\/pay/, (msg) => {
  const chatId = msg.chat.id;
  const amount = parseFloat(msg.text.split(' ')[1]) || 50;
  
  bot.sendMessage(chatId, `💰 Создать платеж на ${amount} USD`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `💳 Оплатить ${amount} USD`,
            web_app: {
              url: `https://your-site.netlify.app/payment.html?amount=${amount}`
            }
          }
        ]
      ]
    }
  });
});

// Обработка callback от Mini App
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app.data);
  
  bot.sendMessage(chatId, `✅ Платеж создан!\nID: ${data.paymentId}`);
});
```

## Шаг 4: Пример кода бота (Python)

```python
import telebot
from telebot import types

bot = telebot.TeleBot('YOUR_BOT_TOKEN')

@bot.message_handler(commands=['start'])
def send_welcome(message):
    keyboard = types.InlineKeyboardMarkup()
    button = types.InlineKeyboardButton(
        text='💳 Открыть платеж',
        web_app=types.WebAppInfo(url='https://your-site.netlify.app/payment.html')
    )
    keyboard.add(button)
    
    bot.reply_to(message, '👋 Добро пожаловать в Payment Gateway!', reply_markup=keyboard)

@bot.message_handler(commands=['pay'])
def create_payment(message):
    try:
        amount = float(message.text.split()[1]) if len(message.text.split()) > 1 else 50
    except:
        amount = 50
    
    keyboard = types.InlineKeyboardMarkup()
    button = types.InlineKeyboardButton(
        text=f'💳 Оплатить {amount} USD',
        web_app=types.WebAppInfo(
            url=f'https://your-site.netlify.app/payment.html?amount={amount}'
        )
    )
    keyboard.add(button)
    
    bot.reply_to(message, f'💰 Создать платеж на {amount} USD', reply_markup=keyboard)

@bot.message_handler(content_types=['web_app_data'])
def handle_web_app(message):
    data = message.web_app.data
    bot.reply_to(message, f'✅ Платеж создан!\nДанные: {data}')

bot.polling()
```

## Шаг 5: Тестирование

1. Найдите вашего бота в Telegram
2. Отправьте `/start`
3. Нажмите на кнопку "💳 Открыть платеж"
4. Mini App должен открыться в Telegram
5. Протестируйте создание платежа

## Параметры URL

Вы можете передавать параметры через URL:

- `?amount=100` - сумма платежа
- `?currency=EUR` - валюта
- `?wallet=bc1q...` - адрес кошелька
- `?network=bitcoin` - сеть (по умолчанию bitcoin)

Пример:
```
https://your-site.netlify.app/payment.html?amount=100&currency=USD
```

## Безопасность

1. **Валидация данных:** Всегда проверяйте данные от пользователя
2. **HTTPS:** Используйте только HTTPS для Mini App URL
3. **CORS:** Настройте CORS в Netlify Functions
4. **Rate Limiting:** Уже реализовано в функциях

## Дополнительные ресурсы

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Telegram Web App API](https://core.telegram.org/bots/webapps)

