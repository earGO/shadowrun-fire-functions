async function onLogin  (req, res,db) {
    console.log(req.body);
    const usersRef = db.collection('users');
    try {
        const user = JSON.parse(req.body).user;
        const {uid,email,displayName,photoUrl} = user;
        let result = await usersRef.where('uid', '==', uid).get();
        if(result.empty){
            console.log('no such user');
            await usersRef.doc(uid).set({
                uid:uid,
                email:email,
                name:displayName,
                avatar:photoUrl,
                wantToBeHammered:false,
                wantToCommunicate:false,
            });
            try{
                const createdUser = await usersRef.where('uid','==',uid)
                    .get();
                const userData = createdUser.docs[0].data();
                res.status(201).json({message:'created user',user:userData});
            } catch (error){
                console.log(error);
                res.send(error)
            }
        } else {
            const user = result.docs[0].data();
            console.log(user);
            res.status(201).json({mesage:'found user',user:user});
        }
    } catch(error) {
        console.log('Something is wrong with the request', error.uid);
        res.sendStatus(500).json({message:'somethng wrong with request'});
    }
};

module.exports = onLogin;
