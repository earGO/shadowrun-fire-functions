
async function experimental(req, res, db) {
    try {
        const skillsTemplatesRef = db.collection('skillsTemplates').where('type','==','nonDigital');
        const skillsTemplatesDocs = await skillsTemplatesRef.get();
        const trueTemplatesData=[];
        skillsTemplatesDocs.forEach(doc=>{
            const docData = doc.data();
            if(docData.copy===true){
                trueTemplatesData.push(doc.data())
            }
                    })
        console.log(trueTemplatesData)

        res.send({message: 'good'});

    } catch (e) {

        console.log(`experimental has error: ${e}`)
        res.send({message: 'bad'});
    }
}

module.exports = experimental;
