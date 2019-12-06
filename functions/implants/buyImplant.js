async function buyImplant(req, res, db) {
  try {
    const { userId, implantId } = JSON.parse(req.body);
    console.log(`requested purcahse of implant ${implantId} by user ${userId}`);
    const implantRef = db.collection('implants');
    const userRef = db.collection('users');
    const implantDoc = await implantRef.doc(implantId).get();
    const userDoc = await userRef.doc(userId).get();
    const implantData = implantDoc.data();
    const userData = userDoc.data();
    const { price, type } = implantData;
    let status = '';
    if (type === 'status') {
      status = 'Великолепный бегущий';
    }
    const { credits, implants } = userData;
    const newCredits = credits - price;
    implants.push(implantId);
    await userRef.doc(userId).update({
      credits: newCredits,
      implants: implants,
      status: status,
    });

    res.send({ message: 'good' });
  } catch (e) {
    res.send({ message: 'bad' });
  }
}

module.exports = buyImplant;
