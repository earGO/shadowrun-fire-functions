async function getInstalledImplants(req, res, db) {
  try {
    res.send({ message: 'good' });
  } catch (e) {
    console.log(`${getInstalledImplants} has error: `);
    res.send({ message: 'bad' });
  }
}

module.exports = getInstalledImplants;
