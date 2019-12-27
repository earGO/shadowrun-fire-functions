async function sendCloudDataMessage(req, res, admin) {
  try {
    const deviceToken =
      'ejl8B-aHnjE:APA91bGyzNC_E-iqb7VUcgMNbk4LLE_Z_iYVpF-Vlg1kJs1FF5qbeXym_VegANJHuMV0LCoBKMawBHYMj6w510Y5sewaxCLXewyen-P0xnSMYICY4I3Effh5g2PLoztpv8b3Z8eVb6GE';
    const payload = {
      data: {
        message: 'printme',
      },
    };
    const options = {
      priority: 'high',
    };
    const result = await admin
      .messaging()
      .sendToTopic('bqbqb', payload, options);
    res.send({ message: 'good', result });
  } catch (e) {
    console.log(`${sendCloudDataMessage} has error: ${e}`);
    res.send({ message: 'bad' });
  }
}

module.exports = sendCloudDataMessage;
