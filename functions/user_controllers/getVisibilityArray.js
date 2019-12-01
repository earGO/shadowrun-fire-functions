async function getVisibilityArray (req,res,db){
    try{
        console.log('getVisibilityArray called with body:', req.body)
        const {ownerId} = JSON.parse(req.body);
        console.log('getVisibilityArray function called with id:',ownerId);
        if(ownerId!==undefined){
            const visiblilityRef = await db.collection('visibility').doc(ownerId);
            const visiblilityDoc = await visiblilityRef.get();
            const sees = visiblilityDoc.data()
            console.log(sees.sees);
            res.send({visibility:sees.sees,message:'good'});
        } else {
            res.send({visibility:[],message:'good'})
        }

    } catch (e) {
        console.log(e)
        res.send({message:'bad'})

    }

}

module.exports = getVisibilityArray;
