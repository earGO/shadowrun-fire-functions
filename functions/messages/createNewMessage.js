async function createNewMessage(req, res, db) {
  try {
    const { body, title } = JSON.parse(req.body);
    console.log(`creating new message with title ${title} and body ${body}`);
    const messagesRef = db.collection('globalMessages');
    const addedMessage = await messagesRef.add({ body: body, title: title });
    const newMessageId = addedMessage.id;
    const userRef = db.collection('users');
    const usersDocs = userRef.get();
    let batch = db.batch();
    (await usersDocs).forEach(doc => {
      const localData = doc.data();
      let { messages, uid } = localData;
      messages.push(newMessageId);
      batch.update(userRef.doc(uid), { messages: messages });
    });
    const batchWrite = await batch.commit();
    console.log(batchWrite);
    res.send({ message: 'good' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = createNewMessage;
