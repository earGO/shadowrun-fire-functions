async function getAllLocations(req,res,db){
    try{
        const locationsRef = db.collection('locations');
        const locationDocs = await locationsRef.get();
        console.log('getAllLocations called');
        let response = []
        locationDocs.forEach(doc=>{
            const currentLocation = doc.data();
            response.push(currentLocation);

        });
        res.send({message:'good',locations:[...response]});
    } catch (e) {
        console.log(e);
        res.send({message:'bad'});
    }
}

module.exports=getAllLocations;
