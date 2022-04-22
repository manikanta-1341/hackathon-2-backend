const mongoose = require('mongoose')

module.exports = {
    db :{},
    async connect(){
        try{
            const client = await mongoose.connect(process.env.mongodb_url)
            // this.db = client.db("pizza")
            console.log("connection success")
        }
        catch(err){
            console.log(err)
        }
    }
    
}