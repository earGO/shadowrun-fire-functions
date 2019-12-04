const rp = require('request-promise');

async function fetchOutsideLocations(req, res, db) {
  try {
    const options = {
      uri: 'http://blincom.evarun.ru/api/v1/position/beacons',
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true, // Automatically parses the JSON string in the response
    };
    const thirdPartyResponse = await rp(options);
    console.log(thirdPartyResponse[0]);
    let batch = db.batch();
    await thirdPartyResponse.forEach(location => {
      const docId = location.id.toString();
      const label = location.label;
      const locationId =
        location['location_id'] === null
          ? 'null'
          : location['location_id'].toString();
      const bssid = location.bssid;
      const ssid = location.ssid;
      let locRef = db.collection('locations').doc(docId);
      batch.set(locRef, {
        bssid: bssid,
        ssid: ssid,
        label: label,
        locationId: locationId,
        checkedIn: {},
      });
    });
    await batch.commit();
    res.send({ message: 'good' });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = fetchOutsideLocations;
