async function addFieldToAllUsers(req, res, db) {
  try {
    const { fieldName, fieldContent } = JSON.parse(req.body);
    console.log(typeof fieldContent);
    const userRef = db.collection('users');
    const userDocs = await userRef.get();
    let batch = db.batch();
    userDocs.forEach(userDoc => {
      const data = userDoc.data();
      const uid = data.uid;
      const batchRef = userRef.doc(uid);
      const newField = data[fieldName];
      let updatedUser = data;
      if (newField === undefined) {
        updatedUser[fieldName] = fieldContent;
      }
      batch.update(batchRef, updatedUser);
    });
    const batched = await batch.commit();
    console.log(`batched fields to users with ${batched}`);
    res.send({ message: 'good' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = addFieldToAllUsers;
