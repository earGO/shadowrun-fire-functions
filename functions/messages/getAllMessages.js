async function getAllMessages(req, res, db) {
  try {
    const { userId } = JSON.parse(req.body);
    console.log(`${userId} tries to fetch it's messages`);
    const userRef = await db
      .collection('users')
      .doc(userId)
      .get();
    const userData = await userRef.data();
    const { messages } = userData;

    const messagesRef = db.collection('globalMessages');
    const messagesDoc = await messagesRef.get();
    let result = [];
    messagesDoc.forEach(doc => {
      const localId = doc.id;
      const localData = doc.data();
      console.log(localData);
      if (messages.includes(localId)) {
        result.push(localData);
      }
    });
    console.log(result);

    res.send({ message: 'good', messages: result });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = getAllMessages;
