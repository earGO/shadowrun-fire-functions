async function backgroundLocation(req, res, db) {
  try {
    const { message, userId } = JSON.parse(req.body);
    const messageRef = db.collection('globalMessages').doc(userId);
    const composedMessage = `${message}, and time is ${Date.now()}`;
    const messageSet = await messageRef.set({
      message: composedMessage,
    });
    console.log(messageSet);
    res.send({ message: 'good' });
  } catch (e) {
    res.send({ message: 'bad' });
  }
}

module.exports = backgroundLocation;
