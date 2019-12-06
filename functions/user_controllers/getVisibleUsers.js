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
    res.send({ message: 'good', users: [...intermediate] });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad', users: [] });
  }
}

module.exports = getVisibleUsers;
