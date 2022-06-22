const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const bdchat = require('./chatbot.json')

const client = new Client();

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    bdchat.chat.map((msgchat, index) => {
        let recebida = msg.body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let pergBaseBot = msgchat.perg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        if (recebida == pergBaseBot) {
            msg.reply(`*BOT Zézinho diz:* ${msgchat.resp}`);
        }else if(recebida.indexOf(pergBaseBot) !== -1){
            msg.reply(`*BOT Zézinho diz:* posso estar enganado, mas ${msgchat.resp}`);
        }
    })        
});

client.initialize();