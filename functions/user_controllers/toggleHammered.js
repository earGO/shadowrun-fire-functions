async function toggleHammered (req,res,db){
    try {
        const {userId} = JSON.parse(req.body);
        console.log(`requested setHammered for ${userId}`);
        const userRef = await db.collection('users').doc(userId);
        const userDoc = await userRef.get();
        const userHammeredStatus = userDoc.data().wantToBeHammered;
        console.log(`current Hammered: ${userHammeredStatus}`);
        const newHamStatus = !userHammeredStatus;
        console.log(`new status to be ${newHamStatus}`);
        let newHammered = await userRef.update({
            wantToBeHammered: newHamStatus
        });
        console.log(newHammered);
        res.send({message: 'good'})
    } catch (e) {
        res.send({message:'bad'})
    }
}

module.exports = toggleHammered;
