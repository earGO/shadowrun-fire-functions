const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const express = require('express');
const app = express();
const db = admin.firestore();

const controlVisibility = require('./user_controllers/controlVisibility');
const onLogin = require('./user_controllers/onLogin')

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send({uid:'Unauthorized on first check'});
        return;
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch(e) {
        // res.status(403).send({uid:'Unauthorized on second check',idToken});
        next();
        return;
    }
};

// app.use(authenticate);


app.post('/onLogin',(req,res)=> onLogin(req,res,db));

app.post('/controlVisibility',controlVisibility);

exports.api = functions.https.onRequest(app);
