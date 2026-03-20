{\rtf1\ansi\ansicpg1252\cocoartf2580
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 AppleColorEmoji;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww25400\viewh16000\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const fetch = require('node-fetch');\
const TelegramBot = require('node-telegram-bot-api');\
require('dotenv').config();\
\
// Inserisci qui il tuo TOKEN e CHAT ID nel file .env\
const TOKEN = process.env.TOKEN;\
const CHAT_ID = process.env.CHAT_ID;\
\
if (!TOKEN || !CHAT_ID) \{\
    console.error("
\f1 \uc0\u10060 
\f0  Devi impostare TOKEN e CHAT_ID nel file .env");\
    process.exit(1);\
\}\
\
const bot = new TelegramBot(TOKEN, \{ polling: false \});\
\
let previousContent = '';\
\
async function checkPage() \{\
    try \{\
        const response = await fetch('https://web118sud.uslnordovest.toscana.it/live118/default.aspx');\
        const text = await response.text();\
\
        if (previousContent && text !== previousContent) \{\
            console.log('
\f1 \uc0\u9888 \u65039 
\f0  Pagina cambiata! Invio messaggio Telegram...');\
            await bot.sendMessage(CHAT_ID, '
\f1 \uc0\u9888 \u65039 
\f0  La pagina del 118 \'e8 cambiata! Controlla il sito: https://web118sud.uslnordovest.toscana.it/live118/default.aspx');\
        \}\
\
        previousContent = text;\
    \} catch (error) \{\
        console.error('Errore fetch:', error);\
    \}\
\}\
\
// Controlla ogni 30 secondi\
setInterval(checkPage, 30000);\
checkPage();}