async function getLocationById(req, res, db) {
    try {
        const {locationId} = JSON.parse(req.body);
        const locationsRef = db.collection('locations').doc(locationId);
        const fetchedLocation = await locationsRef.get();
        const locationData = await fetchedLocation.data();
        console.log(locationData);
        res.send({message: 'good',location:locationData});
    }
    catch(e)  {
        res.send({message: 'bad'});
    }
}

module.exports = getLocationById;
