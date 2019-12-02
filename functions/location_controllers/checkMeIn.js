async function checkMeIn(req, res, db) {
  try {
    const { userId, locationId } = JSON.parse(req.body);
    console.log(`${userId} wants to check in to ${locationId}`);
    const userRef = await db.collection('users').doc(userId);
    const checkedIn = await userRef.update({
      currentLocationId: locationId,
    });
    console.log(checkedIn);
    res.send({ message: 'good' });
  } catch (e) {
    res.send({ message: 'bad' });
  }
}

module.exports = checkMeIn;
