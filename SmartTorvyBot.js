// Authorized users, replace with your real IDs
var mqtt = require('mqtt');


var authorized_users = [
  18025531,
  000000
];


// Librerie per il collegamento alle api di telegram
//su terminale: npm install node-telegram-bot-api
var tgbot = require('node-telegram-bot-api');


// Inizializzazione del bot con il token
var token = "147183253:AAGkGQs690kUAdBaSfUPBgg5ayHJihJh_s0";
var bot = new tgbot(token, {polling:true});

bot.onText(/Menu/, function (msg) { 
  if(!isAuthorized(msg.from.id)) return; //controlla che sia l'id autorizzato
  var chatId = msg.chat.id;
  var mopts = {
      reply_markup: JSON.stringify({
        keyboard: [
    ['Torvy'],
    ['Movy','Smoky'],
    ['Help','Settings']
    ],
    one_time_keyboard:true,  //dopo che la clicchi scompare
      resize_keyboard:true,    //ridimensiona i botton
      force_reply: true
      })
    };
    bot.sendMessage(chatId, 'Let me know what you want next:', mopts);
});

bot.onText(/Torvy/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;
  var chatId = msg.chat.id;
  var topts = {
      reply_markup: JSON.stringify({
        keyboard: [
    ['Set torvy ON','Set torvy OFF','Ecomode ON','Ecomode OFF'],
	  ['Temperature','Real Feel Temperature','Humidity','Real Feel Humidity'],
    ['Set Temperature'],
    ['Battery status'],
	  ['Menu']
	  ],
        //one_time_keyboard:true,  //dopo che la clicchi scompare
        resize_keyboard:true     //ridimensiona i bottoni
      })
    };
    bot.sendMessage(chatId, 'Torvy commands:', topts);
});

bot.onText(/Set torvy ON/, function (msg) { //quando riceve il comando /torvy
        if(!isAuthorized(msg.from.id)) return;
    invio('7,1,1,1');
  var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Torvy Acceso');

});

bot.onText(/Set torvy OFF/, function (msg) { //quando riceve il comando /torvy
        if(!isAuthorized(msg.from.id)) return;
  invio('7,1,1,1');
  var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Torvy Spento');
});

bot.onText(/\Ecomode ON/, function (msg) { //quando riceve il comando /torvy
        if(!isAuthorized(msg.from.id)) return;
    invio('7,1,1,5');
  var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Ecomode On');

});

bot.onText(/\Ecomode OFF/, function (msg) { //quando riceve il comando /torvy
        if(!isAuthorized(msg.from.id)) return;
    invio('8,1,1,1');
  var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Ecomode disattivato');    
});

bot.onText(/\Set Temperature/, function (msg) { //quando riceve il comando /torvy
        if(!isAuthorized(msg.from.id)) return;
   invio('7,1,1,1');
   var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Temperature: ');   
      
});

bot.onText(/\Movy/, function (msg) { //quando riceve il comando /torvy
        if(!isAuthorized(msg.from.id)) return;  
  var chatId = msg.chat.id;
  var opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          ['Battery status','Menu']],
        resize_keyboard:true     //ridimensiona i bottoni
      })
    };
    bot.sendMessage(chatId, 'Movy commands', opts);
    
});

bot.onText(/\Batteria ,movy/, function (msg) { //quando riceve il comando /torvy
        if(!isAuthorized(msg.from.id)) return;
        invio('7,1,1,1');
  //deve ricevere lo stato della batteria   
  var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Battery Status: ');
});


bot.onText(/\Smoky/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;

  var chatId = msg.chat.id;
  var topts = {
      reply_markup: JSON.stringify({
        keyboard: [
    ['Alarm OFF','Get Gas'],
    ['Menu']
    ],
        resize_keyboard:true     //ridimensiona i bottoni
      })
    };
    bot.sendMessage(chatId, 'Smoky commands:', topts);
});

bot.onText(/\Alarm OFF/, function (msg) { 
    if(!isAuthorized(msg.from.id)) return;
  invio('7,1,1,1');
  var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Gas alarm is off');
    
});

bot.onText(/\Get Gas/, function (msg) { //quando riceve il comando /torvy
        if(!isAuthorized(msg.from.id)) return;
  invio('7,1,1,1');
  var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Gas is: '); 
});


// Controlla se l'id è autorizzato
function isAuthorized(userid) {

 for(i = 0; i < authorized_users.length; i++)
    if(authorized_users[i ] == userid) return true;

  return false;
}

function invio(mess){
  var client = mqtt.connect('tcp://localhost:1883', [{host: 'localhost', port: 1883}]);
  client.subscribe('RFM/101/13');
  client.publish('RFM/101/13', mess);
  client.end();
}
