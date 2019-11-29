async function removeFromVisible(req,res,db,admin){
    const {ownerId,arrayId} = JSON.parse(req.body);
    const visibilityRef = db.collection('visibility');
    try{
        let userSeesIDs = await visibilityRef.doc(arrayId);
        const testData = await userSeesIDs.get();
        if(testData.data()!==undefined){
            console.log(userSeesIDs);
            let arrRemove = await userSeesIDs.update({
                sees: admin.firestore.FieldValue.arrayRemove(ownerId)
            })
            console.log(arrRemove);
        } else {
            let newVisibility = await visibilityRef.doc(arrayId).set({
                sees:[]
            })
            console.log(newVisibility);
        }

    } catch(e){
        console.log(e)
    }
    console.log('controlVisibility working!')
    res.send('response from removeFromVisible')
}

module.exports = removeFromVisible;
