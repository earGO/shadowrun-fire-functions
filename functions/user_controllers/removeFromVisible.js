async function removeFromVisible(req,res,db,admin){
    try{
        const {ownerId,arrayId} = JSON.parse(req.body);
        console.log(`removeFromVisible called sit ${ownerId} as owner id, and ${arrayId} ass array ID`)
        const visibilityRef = db.collection('visibility');
        let userSeesIDs = await visibilityRef.doc(arrayId);
        const testData = await userSeesIDs.get();
        if(testData.data()!==undefined){
            console.log(userSeesIDs);
            let arrRemove = await userSeesIDs.update({
                sees: admin.firestore.FieldValue.arrayRemove(ownerId)
            })
            console.log(arrRemove);
            res.send({message:'good'})
        } else {
            let newVisibility = await visibilityRef.doc(arrayId).set({
                sees:[]
            })
            console.log(newVisibility);
            res.send({message:'good'})
        }

    } catch(e){
        console.log(e)
        res.send({message:'bad'})
    }
}

module.exports = removeFromVisible;
