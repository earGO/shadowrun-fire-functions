async function makeVisibleToAll(req, res, db) {
  try {
    const { userId } = JSON.parse(req.body);
    const visibilityRef = db.collection('visibility');
    const allEntries = await visibilityRef.get();
    let batch = db.batch();
    await allEntries.forEach(entry => {
      const sees = entry.data().sees;
      const entryId = entry.id;
      if (!sees.includes(userId) && entryId !== userId) {
        let newSees = [...sees];
        newSees.push(userId);
        let entryWriteRef = visibilityRef.doc(entryId);
        batch.update(entryWriteRef, { sees: newSees });
      }
    });
    const batchAll = await batch.commit();
    console.log(batchAll);
    res.send({ message: 'good' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = makeVisibleToAll;
