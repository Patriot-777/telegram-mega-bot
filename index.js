
var TelegramBot = require('node-telegram-bot-api');
var token = process.env.BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});

var pary = { "1": {
    "0": "1. Укр. Мова🔰 [305]\nНеволiна О.В.",
    "1": "2. Iноземна Мова🔤 [420]\nЗозуля Т.I.",
    "2": "3. ↔IКГ || Фiзика🔪 [503]|[418]\nДорошенко Л.В.||П'яних I.М.",
    "3": "4. | Вища математика🔢 [505]\nДiмнич Л.М. |"
},

 "2": {
    "0": "1. Основи Фiл. Знань🎩 [413]\nIванишина В.В.",
    "1": "2. Фiзика💀 [418]\nП'яних I.М.",
    "2": "3. Екологiя🍀 [407]\nГайдай Я.М.",
    "3": "4. Художня культура🎨 [005]\nРемезовський М.В."
},

 "3": {
    "0": "1. Вища математика🔢 [505]\nДiмнич Л.М.",
    "1": "2. Осн. теор. ел. кiл🔌 [105]\nХоржан О.О.",
    "2": "3. Iнформатика💻 [212]\nАндрiйченко Т.Р."
},

 "4": {
    "0": "1. Технологiї📡 [408]\nНелуп В.М.",
    "1": "2. Правознавство☝ [406]\nЗульфiгарова Н.О.",
    "2": "3. Фiзкультура🏃 [Возле 418]\nОлександер Т.В. & Красильнюк О.I."
},

 "5": {
    "0": "1. IКГ↔ [503]\nДорошенко Л.В.",
    "1": "2. Фiзика💀 [418]\nП'яних I.М.",
    "2": "3. Осн. теор. ел. кiл🔌 [105]\nХоржан О.О."
} };

var timeDzilin = {"0": "08:30 - 09:45 🕘",
"1": "09:55 - 11:10 🕙",
"2": "11:20 - 12:35 🕚",
"3":  "12:45 - 14:00 🕑"
};

bot.on("message", function (msg) {

    var prefix = "/";

    if (!msg.text.startsWith(prefix)) return;
    var text = msg.text.slice(1).toLowerCase();
    
    var chatId = msg.chat.id;
    var senderId = msg.from.id;
    var msgId = msg.message_id;
    var time = new Date();
    
    function SrtCheck() {
        var id = -258056732;
        //var id = 655231019
        //var id = -298488871;
        if (chatId == id) return true;
        else return false;
    }

    var com = ["/cmd 📋", "/acc 📃", "/chatInfo 📄"/*, "/say + TestText"*/];

    switch(text) {
        case "cmd":
        case "команды":
        case "help": 
        case "помощь": if (SrtCheck() == true) { com.push("/пари *цифра дня недiлi* 💬"); com.push("/час 🔔"); } 
        var cvCount = 0, cmdVar =""; 
        for (key in com) { cmdVar += cvCount+": " + com[key] + "\n"; cvCount++; };
         bot.sendMessage(chatId, "Commands: \n\n"+cmdVar); 
        break;
        case "chatinfo": 
        bot.sendMessage(chatId, `Title: ${msg.chat.title}\nType: ${msg.chat.type}\nId: ${msg.chat.id}`);
        break;
        case "acc": bot.forwardMessage(chatId, chatId, msgId);
         bot.sendMessage(chatId, `👕Username: ${msg.from.first_name} ${msg.from.last_name}\n👖Твой id: ${senderId}`);
        break;
        case "time":  var dateHours = new Date().getHours();
        var dateMinutes = new Date().getMinutes(); bot.sendMessage(chatId, "Time: " + `${dateHours}:${dateMinutes}`); 
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

    if (SrtCheck() != true) {return;}
    else { 
        var srtText = text.replace(/\s/g, "");
        var otvet = "";

        for (var i = 1; i <=5; i++) {
            if (srtText == i.toString()) {
                for (key in pary[`${i}`]) { otvet += pary[`${i}`][`${key}`] + " | " + timeDzilin[`${key}`] +"\n\n"; }
                bot.forwardMessage(chatId, chatId, msgId); 
                return bot.sendMessage(chatId, "✊ Пари на ваш день недiлi такi: \n\n"+otvet);
            }
        }

        if (text == "час") {
            bot.forwardMessage(chatId, chatId, msgId); 
            bot.sendMessage(chatId, "⌚ Розклад дзвiнкiв: \n\n"+ "1. 08:30 - 09:45 🕘\n2. 09:55 - 11:10 🕙\n3. 11:20 - 12:35 🕚\n4. 12:45 - 14:00 🕑");
        }
     }

    //bot.sendMessage(chatId, text);
});

//var time = new Date();

function checkDay() { var date = new Date(); if (date.getHours() <= 4 || date.getHours() >= 12) return;  var id = -258056732;
    switch(date.getDay()) {
        case 1: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "5" && dateMinutes == "20") bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["1"]["0"]} | ${timeDzilin["0"]}\n\n${pary["1"]["1"]} | ${timeDzilin["1"]}\n\n${pary["1"]["2"]} | ${timeDzilin["2"]}\n\n${pary["1"]["3"]} | ${timeDzilin["3"]}`);
        else return;
        break;
        case 2: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "5" && dateMinutes == "20") bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["2"]["0"]} | ${timeDzilin["0"]}\n\n${pary["2"]["1"]} | ${timeDzilin["1"]}\n\n${pary["2"]["2"]} | ${timeDzilin["2"]}\n\n${pary["2"]["3"]} | ${timeDzilin["3"]}`);
        else return;
        break;
        case 3: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "5" && dateMinutes == "20") bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["3"]["0"]} | ${timeDzilin["0"]}\n\n${pary["3"]["1"]} | ${timeDzilin["1"]}\n\n${pary["3"]["2"]} | ${timeDzilin["2"]}`);
        else return;
        break;
        case 4: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "5" && dateMinutes == "20") bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["4"]["0"]} | ${timeDzilin["0"]}\n\n${pary["4"]["1"]} | ${timeDzilin["1"]}\n\n${pary["4"]["2"]} | ${timeDzilin["2"]}`);
        else return;
        break;
        case 5: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "5" && dateMinutes == "20") bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["5"]["0"]} | ${timeDzilin["0"]}\n\n${pary["5"]["1"]} | ${timeDzilin["1"]}\n\n${pary["5"]["2"]} | ${timeDzilin["2"]}`);
        else return;
        break;
    } //console.log(`${date.getDay()} - ${dateHours}:${dateMinutes}`);

}

setInterval(checkDay, 60000);

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
  });

// Сайт для копирования смайлов: https://apps.timwhitlock.info/emoji/tables/unicode
