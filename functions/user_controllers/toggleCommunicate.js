async function toggleCommunicate(req,res,db) {
    try {
        const {userId} = JSON.parse(req.body);
        console.log(`requested toggleCommunicate for ${userId}`);
        const userRef = await db.collection('users').doc(userId);
        const userDoc = await userRef.get();
        const userCommunicateStatus = userDoc.data().wantToCommunicate;
        console.log(`current Communicate: ${userCommunicateStatus}`);
        const newStatus = !userCommunicateStatus;
        console.log(`new status to be ${newStatus}`);
        let newCommunicate = await userRef.update({
            wantToCommunicate: newStatus
        });
        console.log(newCommunicate);
        res.send({message: 'good'})
    } catch (e) {
        res.send({message:'bad'})
    }
}

module.exports = toggleCommunicate;
