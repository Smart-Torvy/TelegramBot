// Authorized users, replace with your real IDs
var authorized_users = [
111111,
];

// Librerie per il collegamento alle api di telegram
//su terminale: npm install node-telegram-bot-api
var tgbot = require('node-telegram-bot-api');

// inizializziamo i relay/led tramite la libreria onoff
//var Gpio = require('onoff').Gpio, //libreria onoff
//  led1 = new Gpio(2, 'out'), //led settato come output
//  relay1 = new Gpio(3, 'out');

// Spegniamo i relay/led ad ogni avvio del server da rasp
//led1.writeSync(0);
//relay1.writeSync(0);


// Inizializzazione del bot con il token
var token = "YOUR BOT TOKEN HERE";
var bot = new tgbot(token, {polling:true});

bot.on('message', function (msg) {
  var chatId = msg.chat.id;

if(!isAuthorized(chatId)) return;

  bot.onText(/\/torvy/, function (msg) { //quando riceve il comando /torvy
    var opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [
          ['ON','OFF']],
        one_time_keyboard:true,  //dopo che la clicchi scompare
        resize_keyboard:true     //ridimensiona i bottoni
      })
    };
    bot.sendMessage(chatId, 'ACCESO O SPENTO?', opts);
});
});
// Controlla se l'id è autorizzato
function isAuthorized(userid) {

 for(i = 0; i < authorized_users.length; i++)
    if(authorized_users[i ] == userid) return true;

  return false;
}
