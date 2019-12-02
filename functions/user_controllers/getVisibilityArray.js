async function getVisibilityArray(req, res, db) {
  try {
    console.log('getVisibilityArray called with body:', req.body);
    const { ownerId } = JSON.parse(req.body);
    console.log('getVisibilityArray function called with id:', ownerId);
    if (ownerId !== undefined) {
      const visiblilityRef = await db.collection('visibility');
      const visiblilityDoc = await visiblilityRef.get();
      let visArray = [];
      visiblilityDoc.forEach(doc => {
        const tempData = doc.data();
        if (tempData.sees.includes(ownerId)) {
          visArray.push(doc.id);
        }
      });
      console.log(visArray);
      res.send({ visibility: [...visArray], message: 'good' });
    } else {
      res.send({ visibility: [], message: 'good' });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = getVisibilityArray;
