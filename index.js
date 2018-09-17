
var TelegramBot = require('node-telegram-bot-api');
var token = process.env.BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});

var time;

bot.on("message", function (msg) {
    var chatId = msg.chat.id;
    var messageText = msg.text.toLowerCase();
    var senderId = msg.from.id;
    var msgId = msg.message_id;
    var prefix = "/";
    
    function SrtCheck() {
        var id = "-258056732";
        //var id = "-298488871";
        if (chatId == id) return true;
    }

    if (!messageText.startsWith(prefix)) return;
    text = messageText.slice(1);

    var com = ["/cmd 📋", "/acc 📃", "/chatInfo 📄"/*, "/say + TestText"*/];
    var timeDzilin = {"0": "08:30 - 09:45 🕘",
    "1": "09:55 - 11:10 🕙",
    "2": "11:20 - 12:35 🕚",
    "3":  "12:45 - 14:00 🕑"
};

    switch(text) {
        case "cmd":
        case "команды":
        case "help": 
        case "помощь": if (SrtCheck() == true) { com.push("/пары *день недели циферкой: от 1 до 5* 💬"); com.push("/время звонков 🔔"); } 
        var cvCount = 0, cmdVar =""; 
        for (key in com) { cmdVar += cvCount+": " + com[key] + "\n"; cvCount++; };
         bot.sendMessage(chatId, "Команды: \n\n"+cmdVar); 
        break;
        case "chatinfo": 
        bot.sendMessage(chatId, `Title: ${msg.chat.title}\nType: ${msg.chat.type}\nId: ${msg.chat.id}`);
        break;
        case "acc": bot.forwardMessage(chatId, chatId, msgId);
         bot.sendMessage(chatId, `👕Username: ${msg.from.first_name} ${msg.from.last_name}\n👖Твой id: ${senderId}`);
        break;
        // default: bot.forwardMessage(chatId, chatId, msgId); bot.sendMessage(chatId, "404: Command not found.");
        // break;
    }

    bot.onText(/\/test/, function (msg) {
        var chatId = msg.chat.id;

        bot.sendMessage(chatId, "✊");
    });

    bot.onText(/\/say (.+)/, function (msg, match) {
        var chatId = msg.chat.id;
        var resp = match[1];
        bot.sendMessage(chatId, resp);
    });

    var pary = { "1": {
        "0": "1. Укр. Мова🔰 [305]\n👩Неволiна О.В.",
        "1": "2. Iноземна Мова🔤 [420]\n👩Зозуля Т.I.",
        "2": "3. ↔IКГ || Фiзика🔪 [503]|[418]\n👩Дорошенко Л.В.||П'яних I.М.",
        "3": "4. | Вища математика🔢 [505]\n👩Дiмнич Л.М. |"
    },
    
     "2": {
        "0": "1. Основи Фiл. Знань🎩 [413]\n👩Iванишина В.В.",
        "1": "2. Фiзика💀 [418]\n👩П'яних I.М.",
        "2": "3. Екологiя🍀 [null]\n👩null",
        "3": "4. Художня культура🎨 [005]\n👨Ремезовський М.В."
    },
    
     "3": {
        "0": "1. Вища математика🔢 [505]\n👩Дiмнич Л.М.",
        "1": "2. Осн. теор. ел. кiл🔌 [null]\n👨Хоржан О.О.",
        "2": "3. Iнформатика💻 [null]\n👩Андрiйченко Т.Р."
    },
    
     "4": {
        "0": "1. Технологiї📡 [null]\n👨Нелуп В.М.",
        "1": "2. Правознавство☝ [null]\n👩Зульфiгарова Н.О.",
        "2": "3. Фiзкультура🏃 [Возле 418]\n👨Олександер Т.В. & 👩Красильнюк О.I."
    },
    
     "5": {
        "0": "1. IКГ↔ [503]\n👩Дорошенко Л.В.",
        "1": "2. Фiзика💀 [418]\n👩П'яних I.М.",
        "2": "3. Осн. теор. ел. кiл🔌 [null]\n👨Хоржан О.О."
    } };

    //time = new Date(msg.date);

    // function checkDay() {
    
    //     for (var i = 1; i <=5; i++) {
    //         if (time.getDay() == i) {
    //             for (key in pary[`${i}`]) { otvet += pary[`${i}`][`${key}`] + "\n"; }
    //             bot.forwardMessage(chatId, chatId, msgId); 
    //             return bot.sendMessage(chatId, "Пары на ваш день недели такие: \n\n"+otvet);
    //         }
    //     }
    // } console.log(checkDay());

    if (SrtCheck() != true) {return;}
    else { 
        var srtText = text.split(" ");
        var otvet = "";

        for (var i = 1; i <=5; i++) {
            if (srtText[1] == i.toString()) {
                for (key in pary[`${i}`]) { otvet += pary[`${i}`][`${key}`] + " | " + timeDzilin[`${key}`] +"\n\n"; }
                bot.forwardMessage(chatId, chatId, msgId); 
                return bot.sendMessage(chatId, "✊ Пары на ваш день недели такие: \n\n"+otvet);
            }
        }

        if (text == "время звонков") {
            bot.forwardMessage(chatId, chatId, msgId); 
            bot.sendMessage(chatId, "⌚ Расписание звонков: \n\n"+ "1. 08:30 - 09:45 🕘\n2. 09:55 - 11:10 🕙\n3. 11:20 - 12:35 🕚\n4. 12:45 - 14:00 🕑");
        }
     }

    //bot.sendMessage(chatId, text);
});

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
  });

// Сайт для копирования смайлов: https://apps.timwhitlock.info/emoji/tables/unicode
