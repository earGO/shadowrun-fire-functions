async function checkMeIn(req, res, db) {
  try {
    const { userId, locationId, checkInTime } = JSON.parse(req.body);
    console.log(
      `${userId} wants to check in to ${locationId} with time ${checkInTime}`
    );
    const userRef = await db.collection('users').doc(userId);
    const locationRef = db.collection('locations').doc(locationId);
    const locationData = await locationRef.get();
    let updatedLocation = locationData.data();
    console.log(
      `precheckin location status ${updatedLocation.checkedIn[userId]}`
    );
    updatedLocation.checkedIn[userId] = checkInTime + 600000;
    console.log(`post check in ${updatedLocation.checkedIn[userId]}`);
    const timerUpdated = await locationRef.update(updatedLocation);
    const checkinDate = new Date(checkInTime);
    const checkInStringArray = checkinDate.toString().split(' ');
    const lastCheckinString = `Последний чекин ${updatedLocation.label}, ${checkInStringArray[1]}'${checkInStringArray[2]} в ${checkInStringArray[4]}`;
    const checkedIn = await userRef.update({
      currentLocationId: locationId,
      lastCheckIn: lastCheckinString,
    });
    console.log(checkedIn);
    console.log(timerUpdated);
    res.send({ message: 'good' });
  } catch (e) {
    res.send({ message: 'bad' });
  }
}

module.exports = checkMeIn;
