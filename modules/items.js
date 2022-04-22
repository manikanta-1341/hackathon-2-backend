const Item = require('../model/pizzas')
const Inventory = require('../model/pizzas')
const mongoose = require('mongoose')
const User = require('../model/users')
module.exports.getProduct = async (req, res, next) => {
    try{
        const response = await Item.find({})
        res.send(response)
    }
    catch(err){
        res.send(err)
    }
}



module.exports.create = async (req, res, next) => {
    const new_pizza = new Item({ ...req.body.pizza })
    // console.log(new_pizza)
    const check = await Item.findOne({ name: new_pizza.name, size: new_pizza.size })
    console.log(check)

    try {
        if (!check) {
            const response = await new_pizza.save()
            res.send(response)
        }
        else{
        res.status(500).send({ msg: "already exists change parameters and try" })

        }
    }
    catch (err) {
        res.send(err)
    }



}
module.exports.update = async (req, res, next) => {
    try{
        console.log("body:::",req.body)
        const _id = mongoose.Types.ObjectId(req.body.id)
        const keys = Object.keys(req.body)
        keys.map(async (e) =>{
            console.log(e,req.body.e)
            var response = await User.findByIdAndUpdate(_id,{e : req.body.e})
        })
        res.send("in update")
    }
    catch (err) {
        // console.log(err)
        res.send(err)
    }

}

module.exports.delete = async (req, res, next) => {
    try{
        const response = await Item.findByIdAndRemove({_id : mongoose.Types.ObjectId(req.params.id)})
        res.send(response)
    }
    catch (err) {
        // console.log(err)
        res.send(err)
    }
}

module.exports.inventory = async (req, res, next ) =>{
    try{
        const id = req.params.id
        const data = await inventory.find().toArray();
        data.map((e) =>{
            e
        })
        for (var i=0;i<req.body.length; i++){
        var response = await Inventory.findByIdAndUpdate({_id : mongoose.Types.ObjectId(req.params.id)})
        }
        res.send(response)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
}