const { Client } = require('dialogflow');
const venom = require('venom-bot');
const pbUtil = require('pb-util');
const fs = require('fs');


function getPrivateKey() {
    const privateKey = fs.readFileSync('./botagent.json');
    return JSON.parse(privateKey.toString());
  }
  
  const privateKey = getPrivateKey();
  
  async function sendMessageToDialogflow(sessionId, message) {
    const sessionClient = new Client({ credentials: privateKey });
    const sessionPath = sessionClient.projectAgentSessionPath('botchad-qnkq', sessionId);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'pt-BR'
        }
      }
    };
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
  }

  async function onMessage(message) {
    const sessionId = message.from;
    const text = message.body.toLowerCase();
    if (text === 'Olá') {
      const response = await sendMessageToDialogflow(sessionId, 'Olá');
      await client.sendText(message.from, response);
    }
  }
  

  venom.create().then((client) => {
    client.onMessage(onMessage);
  }).catch((error) => console.error(error));
  
  