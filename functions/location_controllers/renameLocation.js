async function renameLocation(req, res, db) {
  try {
    const { locationId, newName } = JSON.parse(req.body);
    console.log(`location ${locationId} is to be renamed to ${newName}`);
    const locationRef = db.collection('locations').doc(locationId);
    const locationData = await locationRef.get();
    let newLocation = locationData.data();
    newLocation.label = newName;
    const result = await locationRef.update(newLocation);
    console.log(`updated like ${result}`);
    res.send({ message: 'good' });
  } catch (e) {
    res.send({ message: 'bad' });
  }
}

module.exports = renameLocation;
