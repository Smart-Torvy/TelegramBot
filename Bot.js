// Vanno inseriti gli id autorizzati (usare il botid.js per ottenere l'id)
var authorized_users = [
  111111111,
];

// Librerie per il collegamento alle api di telegram(node)
var Bot = require('node-telegram-bot');

// inizializziamo i relay/led tramite la libreria onoff
var Gpio = require('onoff').Gpio, //libreria onoff
  led1 = new Gpio(2, 'out'), //led settato come output
  relay1 = new Gpio(3, 'out');

// Spegniamo i relay/led ad ogni avvio del server da rasp
led1.writeSync(0);
relay1.writeSync(0);


// Inizializzazione del bot con il token
var bot = new Bot({
  token: '147183253:AAGkGQs690kUAdBaSfUPBgg5ayHJihJh_s0' //token di smarttorvy bot
});

// Attach event on every received message 
bot.on('message', function (message) {
  parseMessage(message);
});

// Start the bot
bot.start();
console.log("SmarttorvyBOT ready!");

// Function that handles a new message
function parseMessage(message) {

  if(!isAuthorized(message.from.id)) return;

  switch(true) {
  
    case message.text == "/torvy_gettemp":
      bot.sendMessage({
        chat_id: message.chat.id,
        text: 'La temperatura attuale è di: ' + t + '°C',  //è da implementare mqtt
      });
      break;

    case message.text == "/torvy_gethum":
      bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Umidità attuale: ' + h + '%',   //idem ^
      });
      break;

    case message.text == "/getouts":  //per vedere lo stato dei led/relay collegati alla raspberry 
    if(relay1.readSync == "0") {
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Il relay 1 è spento,\n',
        });
        else if(relay1.readSync == "1"){
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Il relay 1 è acceso,\n',
        });
       if(led1.readSync == "0") {
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Il led 1 è spento.',
        });
        else if(led1.readSync == "1"){
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Il led 1 è acceso.',
        });
      break;

    case /^\/torvy/.test(message.text):  //quando mandiamo un messaggio es: /torvy on
      var command = message.text.replace("/torvy ", ""); //Sto cercando il modo di inserire una tastiera
      if(command.toLowerCase() == "on") {
        relay1.writeSync(1);
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Torvy acceso',
        });
      } else if(command.toLowerCase() == "off") {  //quando inviamo il messaggio /torvy off
        relay1.writeSync(0);
        bot.sendMessage({
          chat_id: message.chat.id,
          text: ' Torvy spento',
        });
      } else
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Comando sconosciuto: ' + command,
        });    
    break;
  }
}


// Controlla se l'id è autorizzato
function isAuthorized(userid) {

  for(i = 0; i < authorized_users.length; i++) 
    if(authorized_users[i ] == userid) return true;
 
  return false;
}
