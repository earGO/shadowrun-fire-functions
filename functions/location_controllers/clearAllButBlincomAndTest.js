async function clearAllButBlincomAndTest(req, res, db) {
  try {
    const locationsRef = db.collection('locations');
    const locationsToDelete = await locationsRef.get();
    let batch = db.batch();
    locationsToDelete.forEach(doc => {
      const data = doc.data();
      if (
        parseInt(data.locationId) > 30 ||
        parseInt(data.locationId) === null ||
        parseInt(data.locationId) === undefined
      ) {
        let deleteRef = locationsRef.doc(data.locationId);
        batch.delete(deleteRef);
      }
    });
    const batchResult = await batch.commit();
    console.log(batchResult);
    res.send({ message: 'good' });
  } catch (e) {
    res.send({ message: 'bad' });
  }
}

module.exports = clearAllButBlincomAndTest;
