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
    console.log(thirdPartyResponse);
    const arrayOfBatches = await thirdPartyResponse.map(async location => {
      const docId = location.id.toString();
      const label = location.label;
      const locationId = location['location_id'].toString();
      const bssid = location.bssid;
      const ssid = location.ssid;
      let locRef = await db
        .collection('locations')
        .doc(docId)
        .set({
          bssid: bssid,
          ssid: ssid,
          label: label,
          locationId: locationId,
        });

      console.log(docId);
      return locRef;
    });
    const resolved = await Promise.all(arrayOfBatches);
    res.send({ message: 'good', resolved });
  } catch (e) {
    console.log(e);
    res.send({ message: 'bad' });
  }
}

module.exports = fetchOutsideLocations;
