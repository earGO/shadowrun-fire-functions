const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const express = require('express');
const app = express();
const db = admin.firestore();

const getAllUsers = require('./user_controllers/getAllUsers');
const addToVisible = require('./user_controllers/addToVisible');
const onLogin = require('./user_controllers/onLogin');
const fetchUser = require('./user_controllers/fetchUser');
const removeFromVisible = require('./user_controllers/removeFromVisible');
const getVisibilityArray = require('./user_controllers/getVisibilityArray');
const getVisibleUsers = require('./user_controllers/getVisibleUsers');
const toggleHammered = require('./user_controllers/toggleHammered');
const toggleCommunicate = require('./user_controllers/toggleCommunicate');
const updateUserName = require('./user_controllers/updateUserName');
const makeVisibleToAll = require('./user_controllers/makeVisibleToAll');
const hideFromEveryone = require('./user_controllers/hideFromEveryone');
const addFieldToAllUsers = require('./user_controllers/addFieldToAllUsers');

/** locations controllers */
const fetchOutsideLocations = require('./location_controllers/fetchOutsideLocations');
const clearAllButBlincomAndTest = require('./location_controllers/clearAllButBlincomAndTest');
const getAllLocations = require('./location_controllers/getAllLocations');
const getLocationById = require('./location_controllers/getLocationById');
const checkMeIn = require('./location_controllers/checkMeIn');
const backgroundLocation = require('./location_controllers/backgroundLocation');
const giveReward = require('./user_controllers/giveReward');

/** implants controller */
const getAllImplants = require('./implants/getAllImplants');
const buyImplant = require('./implants/buyImplant');

const authenticate = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    res.status(403).send({ uid: 'Unauthorized on first check' });
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (e) {
    // res.status(403).send({uid:'Unauthorized on second check',idToken});
    next();
    return;
  }
};

// app.use(authenticate);

app.post('/getAllUsers', (req, res) => getAllUsers(req, res, db));
app.post('/onLogin', (req, res) => onLogin(req, res, db));
app.post('/getVisibilityArray', (req, res) => getVisibilityArray(req, res, db));
app.post('/getVisibleUsers', (req, res) => getVisibleUsers(req, res, db));
app.post('/addToVisible', (req, res) => addToVisible(req, res, db, admin));
app.post('/removeFromVisible', (req, res) =>
  removeFromVisible(req, res, db, admin)
);
app.post('/toggleHammered', (req, res) => toggleHammered(req, res, db));
app.post('/toggleCommunicate', (req, res) => toggleCommunicate(req, res, db));
app.post('/updateUserName', (req, res) => updateUserName(req, res, db));
app.post('/fetchUser', (req, res) => fetchUser(req, res, db));
app.post('/makeVisibleToAll', (req, res) => makeVisibleToAll(req, res, db));
app.post('/hideFromEveryone', (req, res) => hideFromEveryone(req, res, db));
app.post('/giveReward', (req, res) => giveReward(req, res, db));
app.post('/addFieldToAllUsers', (req, res) => addFieldToAllUsers(req, res, db));

app.get('/fetchOutsideLocations', (req, res) =>
  fetchOutsideLocations(req, res, db)
);
app.post('/getAllLocations', (req, res) => getAllLocations(req, res, db));
app.get('/clearAllButBlincomAndTest', (req, res) =>
  clearAllButBlincomAndTest(req, res, db)
);
app.post('/getLocationById', (req, res) => getLocationById(req, res, db));
app.post('/checkMeIn', (req, res) => checkMeIn(req, res, db));
app.post('/backgroundLocation', (req, res) => backgroundLocation(req, res, db));

app.get('/getAllImplants', (req, res) => getAllImplants(req, res, db));
app.post('/buyImplant', (req, res) => buyImplant(req, res, db));

exports.api = functions.https.onRequest(app);
