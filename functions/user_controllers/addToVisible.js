async function addToVisible (req,res,db,admin){
    const {ownerId,arrayId} = JSON.parse(req.body);
    const visibilityRef = db.collection('visibility');
    try{
        let userSeesIDs = await visibilityRef.doc(arrayId);
        const testData = await userSeesIDs.get();
        if(testData.data()!==undefined){
            console.log(userSeesIDs);
            let arrUnion = await userSeesIDs.update({
                sees: admin.firestore.FieldValue.arrayUnion(ownerId)
            })
            console.log(arrUnion);
        } else {
           let newVisibility = await visibilityRef.doc(arrayId).set({
               sees:[ownerId]
           })
            console.log(newVisibility);
        }

    } catch(e){
        console.log(e)
    }
    console.log('controlVisibility working!')
    res.send('response from controlVisibility')
}

module.exports = addToVisible;
