'use strict';
const hectareometro = require('./hectareometro');

// Import the Dialogflow module from the Actions on Google client library.
const {
    dialogflow
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

app.intent('HectareometroIntent', (conv, { hectareas, location }) => {
    const response = hectareometro.calculate(hectareas, location.city);
    conv.close(response);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
