
var TelegramBot = require('node-telegram-bot-api');
var token = procecc.env.BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});


bot.on("message", function (msg) {
    var chatId = msg.chat.id;
    var messageText = msg.text.toLowerCase();
    var senderId = msg.from.id;
    var msgId = msg.message_id;
    var prefix = "/";
    
    function SrtCheck() {
        //var id = "-258056732";
        var id = "-298488871";
        if (chatId == id) return true;
    }

    if (!messageText.startsWith(prefix)) return;
    text = messageText.slice(1);

    var com = ["/cmd", "/chatId", "/myId"/*, "/say + TestText"*/];

    switch(text) {
        case "cmd":
        case "команды":
        case "help": 
        case "помощь": if (SrtCheck() == true) { com.push("/пары *день недели циферкой: от 1 до 5*"); } 
        var cvCount = 0, cmdVar =""; 
        for (key in com) { cmdVar += cvCount+": " + com[key] + "\n"; cvCount++; };
         bot.sendMessage(chatId, "Команды: \n\n"+cmdVar); 
        break;
        case "chatid": bot.sendMessage(chatId, "ChatID: "+chatId);
        break;
        case "myid": bot.forwardMessage(chatId, chatId, msgId); bot.sendMessage(chatId, "Твой id: "+senderId);
        break;
        default: bot.forwardMessage(chatId, chatId, msgId); bot.sendMessage(chatId, "404: Command not found.");
        break;
    }

    bot.onText(/\/say (.+)/, function (msg, match) {
        var chatId = msg.chat.id;
        var resp = match[1];
        bot.sendMessage(chatId, resp);
    });

    var pary = { "1": {
        "0": "1. Укр. Мова",
        "1": "2. Iноземна Мова",
        "2": "3. Комп. Графiка || Фiзика",
        "3": "4. || Вища математика"
    },
    
     "2": {
        "0": "1. Основи Фiл. Знань",
        "1": "2. Фiзика",
        "2": "3. Екологiя",
        "3": "4. Художня культура"
    },
    
     "3": {
        "0": "1. Вища математика",
        "1": "2. Осн. теор. ел. кiл",
        "2": "3. Iнформатика"
    },
    
     "4": {
        "0": "1. Технологiйi",
        "1": "2. Правознавство",
        "2": "3. Фiзкультура"
    },
    
     "5": {
        "0": "1. IКГ",
        "1": "2. Фiзика",
        "2": "3. Осн. теор. ел. кiл"
    } };

    if (SrtCheck() != true) {return;}
    else { 
        var srtText = text.split(" ");
        var otvet = "";

        for (var i = 1; i <=5; i++) {
            if (srtText[1] == i.toString()) {
                for (key in pary[`${i}`]) { otvet += pary[`${i}`][`${key}`] + "\n"; }
                bot.forwardMessage(chatId, chatId, msgId); 
                return bot.sendMessage(chatId, "Пары на ваш день недели такие: \n\n"+otvet);
            }
        }
     }

    //bot.sendMessage(chatId, text);
});

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
  });
