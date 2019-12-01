async function updateUserName (req,res,db){
    try{
        const {userId,newName} = JSON.parse(req.body);
        console.log(`requested updateUserName for user ${userId} with newName as ${newName}` );
        const userRef = await db.collection('users').doc(userId);
        const newNamedUser = await userRef.update({
            name:newName
        })
        console.log(newNamedUser);
        res.send({message: 'good'});
    } catch (e) {
        res.send({message:'bad'});
    }
}

module.exports = updateUserName;
