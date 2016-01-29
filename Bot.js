// Authorized users, replace with your real IDs
var authorized_users = [
  111111,
  000000
];


// Librerie per il collegamento alle api di telegram
//su terminale: npm install node-telegram-bot-api
var tgbot = require('node-telegram-bot-api');

// inizializziamo i relay/led tramite la libreria onoff
//libreria onoff
//var Gpio = require('onoff').Gpio, 
//  led1 = new Gpio(2, 'out'), //led settato come output
//  relay1 = new Gpio(3, 'out');

// Spegniamo i relay/led ad ogni avvio del bot da rasp
//led1.writeSync(0);
//relay1.writeSync(0);


// Inizializzazione del bot con il token
var token = "YOUR BOT TOKEN";
var bot = new tgbot(token, {polling:true});

//se attivato il terminale legge tutti i messaggi inviati al bot
/* bot.onText('message', function (msg)
{
    console.log(message);
}); */


 //quando riceve il comando /torvy
 //bot.onText(/\/torvy/, function (msg) {
bot.onText('TORVY', function (msg) { //da testare il funzionamento del riconoscimento del messaggio "TORVY"
        if(!isAuthorized(msg.from.id)) return; //controlla che sia l'id autorizzato
  var chatId = msg.chat.id;
  var opts = {
      reply_to_message_id: msg.message_id, //ti quota il messaggio che hai inviato
      reply_markup: JSON.stringify({
        keyboard: [
          ['ON','OFF']
          ['MENU']],
        one_time_keyboard:true,  //dopo che la clicchi scompare
        resize_keyboard:true     //ridimensiona i bottoni
      })
    };
    bot.sendMessage(chatId, 'ACCESO O SPENTO?', opts);
    bot.onText('MENU', function(msg){    //da testare, come la riga 36
      menu(chatId);
    }
});

// Controlla se l'id è autorizzato
function isAuthorized(userid) {

 for(i = 0; i < authorized_users.length; i++)
    if(authorized_users[i ] == userid) return true;

  return false;
}

void function Menu(cID){
  var kmenu = {
      //reply_to_message_id: msg.message_id, //ti quota il messaggio che hai inviato
      reply_markup: JSON.stringify({
        keyboard: [
          ['TORVY']
          ['SMOKY','MOVY']
          ['HELP','SETTINGS']],
        one_time_keyboard:true,  //dopo che la clicchi scompare
        resize_keyboard:true     //ridimensiona i bottoni
      })
    };
    bot.sendMessage(cID, 'Serve altro?', kmenu);
}
  
}
