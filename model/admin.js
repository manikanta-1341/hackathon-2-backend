const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username:{
        type:String,
        minLength: 5,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required: true,
    },
    phone:{
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    }
});

const Admin = mongoose.model('Admin', adminSchema, 'admin');
module.exports = Admin;