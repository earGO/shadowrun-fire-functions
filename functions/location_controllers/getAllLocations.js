async function getAllLocations(req, res, db) {
  try {
    const { userId } = JSON.parse(req.body);
    console.log(`getAllLocations called with userId ${userId}`);
    const locationsRef = db.collection('locations');
    const locationDocs = await locationsRef.get();
    let response = [];
    locationDocs.forEach(doc => {
      const currentLocation = doc.data();
      let lastCheckIn = new Date(
        'August 19, 1975 23:15:30 GMT+07:00'
      ).getTime();
      if (
        currentLocation.checkedIn !== undefined &&
        currentLocation.checkedIn[userId] !== undefined
      ) {
        lastCheckIn = currentLocation.checkedIn[userId];
        console.log(currentLocation.checkedIn[userId]);
      }
      response.push({
        label: currentLocation['label'],
        ssid: currentLocation['ssid'],
        locationId: currentLocation['locationId'],
        lastCheckIn: lastCheckIn,
      });
    });
    res.send({ message: 'good', locations: [...response] });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = getAllLocations;
