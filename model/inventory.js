const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    base:{
        type:Array,
    },
    sauce:{
        type:Array, 
    },
    cheese:{
        type: Array, 
    },
    veggies:{
        type:Array,
    },
    meats:{
        type: Number,
    }
});

const Inventory = mongoose.model('Inventory', inventorySchema, 'inventory');
module.exports = Inventory;