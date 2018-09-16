var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = process.env.BOT_TOKEN;
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

// Мой айди (Создателя бота): ID: 655231019

// bot.on('edited.message', function(msg) {
//     var chatId = msg.chat.id;
//     var senderId = msg.from.id;
//     var senderName = msg.from.username;
//     var msgText = msg.text;
   
//     bot.sendMessage(chatId, senderName + " удалил сообщение: " + msgText + "\nЕго айди: " + senderId);
//   });

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
bot.onText(/!скажи (.+)/, function (msg, match) {
    var chatId = msg.chat.id;
    var resp = match[1];
    bot.sendMessage(chatId, resp);
});

bot.onText(/!id/, function (msg) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, "ChatID: "+chatId);
});

bot.onText(/!мой id/, function (msg) {
    var chatId = msg.chat.id;
    var userId = msg.from.id;
    bot.reply(chatId, "ID: "+userId);
});

var pary1 = {
    "0": "1. Укр. Мова",
    "1": "2. Iноземна Мова",
    "2": "3. Комп. Графiка || Фiзика",
    "3": "4. || Вища математика"
};

var pary2 = {
    "0": "1. Основи Фiл. Знань",
    "1": "2. Фiзика",
    "2": "3. Екологiя",
    "3": "4. Художня культура"
};

var pary3 = {
    "0": "1. Вища математика",
    "1": "2. Осн. теор. ел. кiл",
    "2": "3. Iнформатика"
};

var pary4 = {
    "0": "1. Технологiйi",
    "1": "2. Правознавство",
    "2": "3. Фiзкультура"
};

var pary5 = {
    "0": "1. IКГ",
    "1": "2. Фiзика",
    "2": "3. Осн. теор. ел. кiл"
};

var com = ["1: скажи", "2: пары *день недели*"];

bot.onText(/!команды/, function (msg) {
    var chatId = msg.chat.id;
    var text = "";

    for (key in com) { text += com[key] + "\n"; }

    bot.sendMessage(chatId, "Команды: "+"\n\n"+text);
});

bot.onText(/!пары понедельник/, function (msg) { if (chatId != -258056732) return;
    var chatId = msg.chat.id;
    var text = "";
    
    for (key in pary1) { text += pary1[key] + "\n"; }
    
    bot.sendMessage(chatId, text);
});

bot.onText(/!пары вторник/, function (msg) { if (chatId != -258056732) return;
    var chatId = msg.chat.id;
    var text = "";
    
    for (key in pary2) { text += pary2[key] + "\n"; }
    
    bot.sendMessage(chatId, text);
});

bot.onText(/!пары среда/, function (msg) { if (chatId != -258056732) return;
    var chatId = msg.chat.id;
    var text = "";
    
    for (key in pary3) { text += pary3[key] + "\n"; }
    
    bot.sendMessage(chatId, text);
});

bot.onText(/!пары четверг/, function (msg) { if (chatId != -258056732) return;
    var chatId = msg.chat.id;
    var text = "";
    
    for (key in pary4) { text += pary4[key] + "\n"; }
    
    bot.sendMessage(chatId, text);
});

bot.onText(/!пары пятница/, function (msg) { if (chatId != -258056732) return;
    var chatId = msg.chat.id;
    var text = "";
    
    for (key in pary5) { text += pary5[key] + "\n"; }
    
    bot.sendMessage(chatId, text);
});

// Простая команда без параметров.
// bot.on('message', function (msg) {
//     var chatId = msg.chat.id;
//     bot.sendMessage(chatId, chatId);
// });

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
  });
