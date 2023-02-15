const venom = require('venom-bot');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const projectId = 'botchad-qnkq'; // Coloque o ID do seu projeto Dialogflow aqui
const sessionId = uuid.v4();

// Inicializa o cliente Dialogflow a partir do arquivo JSON
const config = require('./botagent.json');
const sessionClient = new dialogflow.SessionsClient({
  projectId: projectId,
  credentials: config,
});
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

// Configura o Venom Bot
venom.create().then((client) => {
  // Aguarda as mensagens recebidas
  client.onMessage(async (message) => {
    if (message.body === 'oi') {
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message.body,
            languageCode: 'pt-BR',
          },
        },
      };

      // Envia a mensagem para o Dialogflow
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;

      if (result.intent.displayName === 'Olá') {
        // Atualiza a intent no Dialogflow
        const intent = await sessionClient.getIntent({
          name: `projects/${projectId}/agent/intents/${result.intent.name}`,
        });
        const updatedIntent = {
          name: intent[0].name,
          displayName: intent[0].displayName,
          messages: [...intent[0].messages, { text: { text: 'Sua mensagem atualizada.' } }],
        };
        const [operation] = await sessionClient.updateIntent({
          intent: updatedIntent,
        });
        await operation.promise();
      }

      // Envia a mensagem de resposta de volta para o usuário
      client.sendText(message.from, result.fulfillmentText);
    }
  });
});
