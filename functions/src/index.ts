import * as functions from "firebase-functions";
import { WebClient } from '@slack/web-api';

const bot = new WebClient(functions.config().slack.token);
const { PubSub } = require('@google-cloud/pubsub');
const pubsubClient = new PubSub();

export const myBot = functions.https.onRequest( (req, res) => {

    // Validate Signature
    verifySlackSignature(req); // See snippet above for implementation

    const data = JSON.stringify(req.body);
    const dataBuffer = Buffer.from(data);

    await pubsubClient
            .topic('slack-channel-join')
            .publisher()
            .publish(dataBuffer);


    res.sendStatus(200);
  
  });
  