async function checkMeIn(req, res, db) {
  try {
    const { userId, locationId, checkInTime, timezoneOffset } = JSON.parse(
      req.body
    );
    console.log(
      `${userId} wants to check in to ${locationId} with time ${checkInTime}`
    );
    console.log(`timezone time is ${timezoneOffset}`);
    const correctionData = timezoneOffset.split('').slice(0, 2);
    let timeForCheckinString;
    const triedParseHours = parseInt(correctionData[1]);
    if (triedParseHours && triedParseHours > 0) {
      const correctorHours = parseInt(correctionData[1]);
      console.log(`corrected by ${correctorHours} hours`);
      console.log(`date without Correction ${new Date(checkInTime)}`);
      const correctorMilliseconds = correctorHours * 3600000;
      timeForCheckinString = new Date(
        correctionData[0] === '-'
          ? checkInTime - correctorMilliseconds
          : checkInTime + correctorMilliseconds
      );
    } else {
      const correctorHoursPlus = parseInt(correctionData[0]);
      const correctorMillisecondsPlus = correctorHoursPlus * 3600000;
      timeForCheckinString = new Date(checkInTime + correctorMillisecondsPlus);
    }
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
    const checkInStringArray = timeForCheckinString.toString().split(' ');
    const lastCheckinString = `Последний чекин ${updatedLocation.label}, ${checkInStringArray[1]}'${checkInStringArray[2]} в ${checkInStringArray[4]}`;
    console.log(lastCheckinString);
    const checkedIn = await userRef.update({
      currentLocationId: locationId,
      lastCheckIn: lastCheckinString,
    });
    console.log(checkedIn);
    console.log(timerUpdated);
    res.send({ message: 'good' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = checkMeIn;
