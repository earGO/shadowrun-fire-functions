async function addToVisible (req,res,db,admin){
    try{
        const {ownerId,arrayId} = JSON.parse(req.body);
        console.log(`addToVisible called sit ${ownerId} as owner id, and ${arrayId} ass array ID`)
        const visibilityRef = db.collection('visibility');
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
           });
            console.log(newVisibility);
        }
        res.send({message:'good'})
    } catch(e){
        console.log(e);
        e!==null ? res.send({message:'bad'}) : console.log('all sweet')
    }
}

module.exports = addToVisible;
