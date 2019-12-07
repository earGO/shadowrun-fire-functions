async function onLogin(req, res, db) {
  console.log('got request as ', req.body);
  const usersRef = db.collection('users');
  let user = {};
  try {
    user = JSON.parse(req.body).user;
    console.log('parsed user uid as: ', user.uid);
  } catch (error) {
    console.log('Something is wrong with the request', error.uid);
    res
      .sendStatus(500)
      .json(JSON.stringify({ message: 'somethng wrong with request' }));
  }
  try {
    let docRef = usersRef.doc(user.uid);
    console.log('tryin to fetch user from database');
    const fetchedUser = await docRef.get();
    console.log(`fetchedUser be like: ${fetchedUser}`);
    if (fetchedUser.data() === undefined) {
      console.log('user undefned, creating');
      console.log(user.photoUrl);
      await usersRef.doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoUrl,
        implants: [],
        lastCheckIn: '',
        messages: [],
        role: '',
        status: '',
        wantToBeHammered: false,
        wantToCommunicate: false,
        visible: false,
        credits: 0,
        currentLocationId: '',
      });
      console.log('trying to fetch newly crated user');
      const createdUser = await usersRef.doc(user.uid).get();
      const userData = await createdUser.data();
      console.log(`created user data be like ${userData}`);
      const visibilityRef = db.collection('visibility');
      const setEmptyVisibility = await visibilityRef.doc(userData.uid).set({
        sees: [],
      });
      console.log(setEmptyVisibility);
      res.send({ user: userData });
    } else {
      let fetchedUserToSend = await fetchedUser.data();
      res.send({ user: fetchedUserToSend });
    }
  } catch (error) {
    console.log('something went wrong', error);
    res.send({ msg: 'smth broken :(', error: error });
  }
}

module.exports = onLogin;
