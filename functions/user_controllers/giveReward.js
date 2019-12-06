async function giveReward(req, res, db) {
  try {
    const { userId, reward } = JSON.parse(req.body);
    const userRef = db.collection('users').doc(userId);
    const implantsRef = db.collection('implants');
    const implantsDocs = await implantsRef.get();
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    let coeffitiend = 1;
    const { implants } = userData;
    implantsDocs.forEach(doc => {
      localData = doc.data();
      if (implants.includes(localData.id) && localData.type === 'success') {
        coeffitiend = coeffitiend + localData.coeft;
      }
    });
    let credits = userData.credits + reward * coeffitiend;
    const updated = await userRef.update({ credits: credits });
    console.log(
      `added reward of ${reward} for user ${userId} and looks like this ${updated}`
    );
    res.send({ message: 'good' });
  } catch (e) {
    res.send({ message: 'bad' });
  }
}

module.exports = giveReward;
