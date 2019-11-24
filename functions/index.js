const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const express = require('express');
const app = express();
const db = admin.firestore();

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


app.post('/onLogin', async (req, res) => {
    console.log(req.body);
    const usersRef = db.collection('users');
    try {
        const user = JSON.parse(req.body).user;
        const {uid,email,displayName,photoUrl} = user;
        let result = await usersRef.where('uid', '==', uid).get();
        if(result.empty){
            console.log('no such user');
            await usersRef.doc(uid).set({
                uid:uid,
                email:email,
                name:displayName,
                avatar:photoUrl,
            });
            try{
                const createdUser = await usersRef.where('uid','==',uid)
                    .get();
                const userData = createdUser.docs[0].data();
                res.status(201).json({message:'created user',user:userData});
            } catch (error){
                console.log(error);
                res.send(error)
            }


        } else {
            const user = result.docs[0].data();
            console.log(user);
            res.status(201).json({mesage:'found user',user:user});
        }
    } catch(error) {
        console.log('Something is wrong with the request', error.uid);
        res.sendStatus(500).json({message:'somethng wrong with request'});
    }
});

exports.api = functions.https.onRequest(app);
