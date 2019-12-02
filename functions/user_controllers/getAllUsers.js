async function getAllUsers(req, res, db, admin) {
  try {
    const { userId } = JSON.parse(req.body);
    const usersRef = db.collection('users');
    const userDocs = await usersRef.get();
    console.log('getAllUsers called');
    let intermediate = [];
    userDocs.forEach(doc => {
      const currentUser = doc.data();
      if (currentUser.uid !== userId) {
        intermediate.push(doc.data());
      }
    });
    const locationsRef = db.collection('locations');
    const locationsData = await locationsRef.get();
    let locationsArray = {};
    locationsData.forEach(location => {
      const locationData = location.data();
      locationsArray[locationData.locationId] = locationData;
    });
    let response = [];
    intermediate.forEach(user => {
      if (user.currentLocationId !== '') {
        const userLocation = locationsArray[user.currentLocationId]['label'];
        user.currentLocationId = userLocation;
        response.push(user);
      } else {
        response.push(user);
      }
    });
    res.send({ users: [...response], message: 'good' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'error', users: [] });
  }
}

module.exports = getAllUsers;
