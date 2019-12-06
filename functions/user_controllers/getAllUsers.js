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

    res.send({ users: [...intermediate], message: 'good' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'error', users: [] });
  }
}

module.exports = getAllUsers;
