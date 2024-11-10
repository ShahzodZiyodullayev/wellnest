const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");
require("dotenv").config();

// Express app yaratish
const app = express();
app.use(cors());
const port = 5000; // Server porti


// Telegram bot tokenini kiriting
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// /start komandasi yuborilganda, Web App URLni yuborish
bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id;

    // Web App URLni foydalanuvchiga yuboramiz
    bot.sendMessage(chatId, "Xush kelibsiz! Web Appga o'ting:", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Open App",
                        web_app: {
                            url: process.env.TELEGRAM_WEB_APP_URL,
                        },
                    },
                ],
            ],
        },
    });
});

// Express serverni ishga tushirish
app.listen(port, () => {
    console.log(`Server ${port}-portda ishlamoqda`);
});
