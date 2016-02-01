var mqtt = require('mqtt');
var emoji= require('node-emoji');
var tgbot = require('node-telegram-bot-api');

//various emoji, still more to add
var rewind= emoji.get('rewind');
var sunglasses=emoji.get('sunglasses');
var sorriso= emoji.get('grin');
var batteria=emoji.get('battery');  //non vuole funzionare
var frecciaindietro=emoji.get('arrow_left');
var sunny=emoji.get('sunny');
var moon=emoji.get('new_moon');
var erba=emoji.get('leaves');
var erbasecca=emoji.get('fallen_leaf');


var authorized_users = [
  111111,
  000000
];


// Inizializzazione del bot con il token
var token = "YOUR TOKEN BOT";
var bot = new tgbot(token, {polling:true});

bot.onText(/\Menu/, function (msg) {  //quando riceve il comando menu
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
    bot.sendMessage(chatId, 'Let me know what you want next: '+ sorriso, mopts);
});

bot.onText(/\Torvy/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;
  var chatId = msg.chat.id;
  var topts = {
      reply_markup: JSON.stringify({
        keyboard: [
    [sunny + '\ntorvy ON', moon + '\ntorvy OFF',erba + '\neco ON',erbasecca + '\neco OFF'],
	 ['Temperature','Real Feel Temperature','Humidity','Real Feel Humidity'],
    ['Set Temperature'],
    ['Battery status'],
	 [rewind + 'Menu']
	 ],
        resize_keyboard:true    
      })
    };
    bot.sendMessage(chatId, 'Torvy commands:' + sunglasses, topts);
});

bot.onText(/torvy ON/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;
    invio('7,1,1,1');
  var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Torvy Acceso');

});

bot.onText(/torvy OFF/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;
  invio('7,1,1,1');
  var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Torvy Spento');
});

bot.onText(/\eco ON/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;
    invio('7,1,1,5');
  var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Ecomode On');

});

bot.onText(/\eco OFF/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;
    invio('8,1,1,1');
  var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Ecomode disattivato');    
});

bot.onText(/\Set Temperature/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;
   invio('7,1,1,1');
   var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Temperature: ');   
      
});

bot.onText(/\Movy/, function (msg) {
        if(!isAuthorized(msg.from.id)) return;  
  var chatId = msg.chat.id;
  var opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          ['Battery status'],
	['Menu']],
        resize_keyboard:true    
      })
    };
    bot.sendMessage(chatId, 'Movy commands', opts);
    
});

bot.onText(/\Battery status/, function (msg) { 
        if(!isAuthorized(msg.from.id)) return;
        invio('7,1,1,1');
  //deve ricevere lo stato della batteria   
  var chatId = msg.chat.id;
    bot.sendMessage(chatId,battery+ ' Battery Status: ');
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
        resize_keyboard:true     
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

bot.onText(/\Get Gas/, function (msg) { 
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
