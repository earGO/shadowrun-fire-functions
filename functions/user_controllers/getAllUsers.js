async function getAllUsers (req,res,db,admin){
    try{
        const {userId} = JSON.parse(req.body);
        const usersRef = db.collection('users');
        const userDocs = await usersRef.get();
        console.log('getAllUsers called');
        let response = []
        userDocs.forEach(doc=>{
            const currentUser = doc.data();
            if(currentUser.uid!==userId){
                response.push(doc.data());
            }
        });
        res.send({users:response,message:'good'})
    } catch(e){
        console.log(e);
        res.send({message:'error'})
    }

}

module.exports = getAllUsers;
