async function dismissOneMessage(req, res, db) {
  try {
    const { userId, messageId } = JSON.parse(req.body);
    console.log(`${userId} tries to dismiss message ${messageId}`);
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    const userMessages = userData.messages;
    const indexOfMessage = userMessages.indexOf(messageId);
    userMessages.splice(indexOfMessage, 1);
    const updated = await userRef.update({ messages: userMessages });
    console.log(updated);
    const messagesRef = db.collection('globalMessages');
    const messagesDoc = await messagesRef.get();
    let result = [];
    messagesDoc.forEach(doc => {
      const localId = doc.id;
      const localData = doc.data();
      console.log(localData);
      if (userMessages.includes(localId)) {
        result.push(localData);
      }
    });
    console.log(result);

    res.send({ message: 'good', messages: result });
  } catch (e) {
    console.log(`${dismissOneMessage} has error: ${e}`);
    res.send({ message: 'bad' });
  }
}

module.exports = dismissOneMessage;
