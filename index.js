
var TelegramBot = require('node-telegram-bot-api');
var token = process.env.BOT_TOKEN;
var bot = new TelegramBot(token, {polling: true});
var getJSON = require('get-json');

var pary = { "1": {
    "0": "1. Укр. Мова🔰 [305]\nНеволiна О.В.",
    "1": "2. Вища математика🔢 [505]\nДiмнич Л.М.",
    "2": "3. ↔Ан. та Цифр. Схемотехнiка🔧 [309] Грузiнов\n або Осн. теор. пер. iнформ.🛰 [602]\nГудков",
    "3": "4. Iноземна Мова🔤 [420]\n Новий Вчитель"
},

 "2": {
    "0": "1. Ан. та Цифр. Схемотехнiка🔧 [309]\nГрузiнов",
    "1": "2. Осн. теор. пер. iнформ.🛰 [602]\nГудков",
    "2": "3. Осн. теор. ел. кiл🔌 [105]\nХоржан О.О.",
    "3": "4. Вища математика🔢 [505] Дiмнич Л.М.\n або Iнформатика💻 [212] Андрiйченко Т.Р."
},

 "3": {
    "0": "1. Iнформатика💻 [212]\nАндрiйченко Т.Р.",
    "1": "2. Астрономiя🔮 [404]\nБохам",
    "2": "3. Фiз-ра Кр. АЛ."
},

 "4": {
    "0": "1. Осн. теор. пер. iнформ.🛰 [602]\nГудков",
    "1": "2. ↔Ан. та Цифр. Схемотехнiка🔧 [309]\nГрузiнов",
    "2": "3. Економiка💹 [102]\nФранчук"
},

 "5": {
    "0": "1. Географiя✈ [503]\nЗульфiгарова",
    "1": "2. Безпека життэдiяльностi💀 [503]\nДорошенко",
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

    bot.sendMessage(655231019, "ID Logger: "+msg.from.first_name+" "+msg.from.last_name +" | "+msg.from.id);

    bot.onText(/\/test/, function (msg) {
        var chatId = msg.chat.id;

        bot.sendMessage(chatId, "✊ Я тут");
    });

    bot.onText(/\/say (.+)/, function (msg, match) {
        var chatId = msg.chat.id;
        var resp = match[1];
        bot.sendMessage(chatId, resp);
    });

    // bot.onText(/\/dej/, function (msg) {
    //     var chatId = msg.chat.id;

    //      getJSON(`http://yaroslav-andreev.ru/TelegaBot/TelegaBot.php?heroku&getList`).then(async function(response) {
    //         dejuriki = response;
    //         console.log(dejuriki);
            
    //         bot.sendMessage(chatId, "test: "+dejuriki);
    //         // dejuriki = JSON.parse(JSON.stringify(response));
    //     }).catch(function(error) {console.log(error);});

    // });

    if (SrtCheck() != true) {return;}
    else { 
        var srtText = text.replace(/\s/g, "");
        var otvet = "";

        for (var i = 1; i <=5; i++) {
            if (srtText.startsWith(`${i.toString()}`)) {
                for (key in pary[`${i}`]) { otvet += pary[`${i}`][`${key}`] + " | " + timeDzilin[`${key}`] +"\n\n"; }
                return bot.sendMessage(chatId, otvet);
            }
        }

        if (text == "дзвінки") {
            bot.sendMessage(chatId, "⌚ Розклад дзвiнкiв: \n\n"+ "1. 08:30 - 09:45 🕘\n2. 09:55 - 11:10 🕙\n3. 11:20 - 12:35 🕚\n4. 12:45 - 14:00 🕑");
            }
     }

    //bot.sendMessage(chatId, text);
});

bot.onText(/\/rload/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "Розклад завантажено.", {
    "reply_markup": {
        "keyboard": [["/1 Понедiлок", "/2 Вiвторок"], ["/3 Середа", "/4 Четвер"], ["/5 П'ятниця"], ["/дзвінки"]]
        }
    });
        
    });

//var time = new Date();

function checkDay() { var date = new Date(); if (date.getHours() < 4 || date.getHours() >= 5) return;  var id = -258056732;
    switch(date.getDay()) {
        case 1: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "4" && dateMinutes == "20") { bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["1"]["0"]} | ${timeDzilin["0"]}\n\n${pary["1"]["1"]} | ${timeDzilin["1"]}\n\n${pary["1"]["2"]} | ${timeDzilin["2"]}\n\n${pary["1"]["3"]} | ${timeDzilin["3"]}`);
        getJSON(`http://yaroslav-andreev.ru/TelegaBot/TelegaBot.php?heroku&getList`).then(async function(response) {
            dejuriki = response;
            console.log(dejuriki);
            
            bot.sendMessage(id, "📌 Сьогоднi черговi: "+dejuriki+" ♻");
            // dejuriki = JSON.parse(JSON.stringify(response));
        }).catch(function(error) {console.log(error);});
    }
        else return;
        break;
        case 2: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "4" && dateMinutes == "20") { bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["2"]["0"]} | ${timeDzilin["0"]}\n\n${pary["2"]["1"]} | ${timeDzilin["1"]}\n\n${pary["2"]["2"]} | ${timeDzilin["2"]}\n\n${pary["2"]["3"]} | ${timeDzilin["3"]}`);
        getJSON(`http://yaroslav-andreev.ru/TelegaBot/TelegaBot.php?heroku&getList`).then(async function(response) {
            dejuriki = response;
            console.log(dejuriki);
            
            bot.sendMessage(id, "📌 Сьогоднi черговi: "+dejuriki+" ♻");
            // dejuriki = JSON.parse(JSON.stringify(response));
        }).catch(function(error) {console.log(error);});
    }
        else return;
        break;
        case 3: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "4" && dateMinutes == "20") { bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["3"]["0"]} | ${timeDzilin["0"]}\n\n${pary["3"]["1"]} | ${timeDzilin["1"]}\n\n${pary["3"]["2"]} | ${timeDzilin["2"]}`);
        getJSON(`http://yaroslav-andreev.ru/TelegaBot/TelegaBot.php?heroku&getList`).then(async function(response) {
            dejuriki = response;
            console.log(dejuriki);
            
            bot.sendMessage(id, "📌 Сьогоднi черговi: "+dejuriki+" ♻");
            // dejuriki = JSON.parse(JSON.stringify(response));
        }).catch(function(error) {console.log(error);}); 
    }
        else return;
        break;
        case 4: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "4" && dateMinutes == "20") { bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["4"]["0"]} | ${timeDzilin["0"]}\n\n${pary["4"]["1"]} | ${timeDzilin["1"]}\n\n${pary["4"]["2"]} | ${timeDzilin["2"]}`);
        getJSON(`http://yaroslav-andreev.ru/TelegaBot/TelegaBot.php?heroku&getList`).then(async function(response) {
            dejuriki = response;
            console.log(dejuriki);
            
            bot.sendMessage(id, "📌 Сьогоднi черговi: "+dejuriki+" ♻");
            // dejuriki = JSON.parse(JSON.stringify(response));
        }).catch(function(error) {console.log(error);});
    }
        else return;
        break;
         case 5: var dateHours = new Date().getHours(); var dateMinutes = new Date().getMinutes();
        if (dateHours == "4" && dateMinutes == "20") { bot.sendMessage(id, `Cьогодi будуть такi пари:\n\n ${pary["5"]["0"]} | ${timeDzilin["0"]}\n\n${pary["5"]["1"]} | ${timeDzilin["1"]}\n\n${pary["5"]["2"]} | ${timeDzilin["2"]}`);
        getJSON(`http://yaroslav-andreev.ru/TelegaBot/TelegaBot.php?heroku&getList`).then(async function(response) {
            dejuriki = response;
            console.log(dejuriki);
            
            bot.sendMessage(id, "📌 Сьогоднi черговi: "+dejuriki+" ♻");
            // dejuriki = JSON.parse(JSON.stringify(response));
        }).catch(function(error) {console.log(error);});
    }
        else return;
        break; 
    } //console.log(`${date.getDay()} - ${dateHours}:${dateMinutes}`);

}

setInterval(checkDay, 60000);

bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
  });

// var questions = [
//     {
//       title:'Сколько параметров можно передать функции ?',
//       buttons: [
//           [{ text: 'Ровно столько, сколько указано в определении функции.', callback_data: '0_1' }],
//           [{ text: 'Сколько указано в определении функции или меньше.', callback_data: '0_2' }],
//           [{ text: 'Сколько указано в определении функции или больше.', callback_data: '0_3' }],
//           [{ text: 'Любое количество.', callback_data: '0_4' }]
//         ],
//       right_answer: 4
//     },
//   ];
  
//   function getRandomQuestion(){
//     return questions[Math.floor(Math.random()*questions.length)];
//   }
  
//   function newQuestion(msg){
//     var arr = getRandomQuestion();
//     var text = arr.title;
//     var options = {
//       reply_markup: JSON.stringify({
//         inline_keyboard: arr.buttons,
//         parse_mode: 'Markdown'
//       })
//     };
//     chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
//     bot.sendMessage(chat, text, options);
//   }
  
//   bot.onText(/\/start_test/, function (msg, match) {
//     newQuestion(msg);
//   });
  
//   bot.on('callback_query', function (msg) {
//     var answer = msg.data.split('_');
//     var index = answer[0];
//     var button = answer[1];
  
//     if (questions[index].right_answer==button) {
//       bot.sendMessage(msg.from.id, 'Ответ верный ✅');
//     } else {
//       bot.sendMessage(msg.from.id, 'Ответ неверный ❌');
//     }
  
//     bot.answerCallbackQuery(msg.id, 'Вы выбрали: '+ msg.data, true);
//     newQuestion(msg);
//   });

// Сайт для копирования смайлов: https://apps.timwhitlock.info/emoji/tables/unicode
