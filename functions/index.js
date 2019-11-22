const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const express = require('express');
const app = express();

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send({message:'Unauthorized on first check'});
        return;
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch(e) {
        // res.status(403).send({message:'Unauthorized on second check',idToken});
        next();
        return;
    }
};

app.use(authenticate);

app.post('/test', async (req, res) => {
    const message = JSON.parse(req.body).message;
    try {
        res.status(201).json({message: message});
    } catch(error) {
        console.log('Error detecting sentiment or saving message', error.message);
        res.sendStatus(500);
    }
});

exports.api = functions.https.onRequest(app);
