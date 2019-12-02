async function hideFromEveryone(req, res, db) {
  try {
    const { userId } = JSON.parse(req.body);
    const visibilityRef = db.collection('visibility');
    const allEntries = await visibilityRef.get();
    let batch = db.batch();
    await allEntries.forEach(entry => {
      const sees = entry.data().sees;
      const entryId = entry.id;
      if (sees.includes(userId)) {
        const indexOfUser = sees.indexOf(userId);
        sees.splice(indexOfUser, 1);
        let entryRef = visibilityRef.doc(entryId);
        batch.update(entryRef, { sees: sees });
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

module.exports = hideFromEveryone;
