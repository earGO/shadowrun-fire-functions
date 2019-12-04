async function giveReward(req, res, db) {
  try {
    const { userId, reward } = JSON.parse(req.body);
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    let credits = userData.credits + reward;
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
