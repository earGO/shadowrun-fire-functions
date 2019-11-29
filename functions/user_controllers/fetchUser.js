async function fetchUser(req,res,db){
    console.log('got request as ',req.body);
    const usersRef = db.collection('users');
    let uid='';
    try{
        let request = JSON.parse(req.body);
        uid=request.uid;
    } catch (e) {
        res.sendStatus(500).json('error parsing request body');
    }
    try{
        let docRef = usersRef.doc(uid);
        console.log('tryin to fetch user from database')
        const fetchedUser = await docRef.get();
        const userData = await fetchedUser.data();
        console.log(`fetchedUser be like: ${userData}`)
        res.send({user:userData});
    } catch (e) {
        res.sendStatus(417).json('error fetching user from database');
    }
}

module.exports = fetchUser;
