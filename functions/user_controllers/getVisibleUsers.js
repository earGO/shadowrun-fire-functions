async function getVisibleUsers(req, res, db) {
  try {
    const { userId } = JSON.parse(req.body);
    console.log(`requested visible users for ${userId}`);
    const visibleRef = await db.collection('visibility').doc(userId);
    const visibleData = await visibleRef.get();
    const visibleArray = visibleData.data().sees;
    console.log(visibleArray);
    const usersRef = await db.collection('users');
    const usersData = await usersRef.get();
    let intermediate = [];
    usersData.forEach(user => {
      const currentUser = user.data();
      if (
        visibleArray.includes(currentUser.uid) &&
        currentUser.wantToCommunicate &&
        currentUser.uid !== userId
      )
        intermediate.push(user.data());
    });
    console.log(intermediate);
    const locationsRef = db.collection('locations');
    const locationsData = await locationsRef.get();
    let locationsArray = {};
    locationsData.forEach(location => {
      const locationData = location.data();
      locationsArray[locationData.locationId] = locationData;
    });
    console.log(locationsArray[0]);
    let response = [];
    intermediate.forEach(user => {
      if (user.currentLocationId !== '') {
        const userLocation = locationsArray[user.currentLocationId]['label'];
        user.currentLocationId = userLocation;
        response.push(user);
      }
    });
    res.send({ message: 'good', users: [...response] });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad', users: [] });
  }
}

module.exports = getVisibleUsers;
