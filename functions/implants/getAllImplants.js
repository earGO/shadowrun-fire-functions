async function getAllImplants(req, res, db) {
  try {
    const implantsRef = await db.collection('implants').get();
    let result = [];
    implantsRef.forEach(implant => {
      const data = implant.data();
      console.log(data);
      result.push(data);
    });
    res.send({ message: 'good', implants: [...result] });
  } catch (e) {
    res.send({ message: 'bad' });
  }
}

module.exports = getAllImplants;
