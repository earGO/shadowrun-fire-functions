const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const express = require('express');
const app = express();
const db = admin.firestore();

const addToVisible = require('./user_controllers/addToVisible');
const onLogin = require('./user_controllers/onLogin');
const fetchUser = require('./user_controllers/fetchUser');
const removeFromVisible = require('./user_controllers/removeFromVisible');

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

app.post('/addToVisible',(req,res)=>addToVisible(req,res,db,admin));
app.post('/removeFromVisible',(req,res)=>removeFromVisible(req,res,db,admin));

app.post('/fetchUser',(req,res)=>fetchUser(req,res,db));

exports.api = functions.https.onRequest(app);
