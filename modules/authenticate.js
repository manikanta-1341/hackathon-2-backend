const User = require('../model/users')
const Admin = require('../model/admin')
const mongo = require('../shared/connect');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require('nodemailer');
module.exports.userLogin = async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password
        // console.log(username, password);
        let existuser = await User.findOne({username : username})
        // console.log(existuser,password);
        if(!existuser){
            return res.status(500).send({msg : "invalid username"})
        }
        let isvalid = await bcrypt.compare(password, existuser.password)
        if(!isvalid){
            return res.status(500).send({msg :"invalid password"})
        }
        const token = jwt.sign({existuser}, process.env.SECRET_KEY,{expiresIn : '1hr'})
        res.status(200).send(token)
    }
    catch (err) {
        console.log(err)
        res.status(405).send("failed")
    }

}
module.exports.adminLogin = async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password
        // console.log(username, password);
        let existadmin = await Admin.findOne({username : username})
        // console.log(existadmin,password);
        if(!existadmin){
            return res.status(500).send({msg : "invalid username"})
        }
        let isvalid = await bcrypt.compare(password, existadmin.password)
        if(!isvalid){
            return res.status(500).send({msg :"invalid password"})
        }
        const token = jwt.sign({existadmin}, process.env.SECRET_KEY,{expiresIn : '1hr'})
        res.status(200).send(token)
    }
    catch (err) {
        console.log(err)
        res.status(405).send("failed")
    }

}

module.exports.passwordReset = async (req, res, next) => {
    try {
        // console.log("in password reset func", req.body.email);
        const email = req.body.email
        const user = await User.findOne({ email: email })
        console.log("user",user,user._id)
        if (user) {
            const randomString = await bcrypt.genSalt(6)
            let user_update =await User.findOneAndUpdate({_id : user._id})
            user_update.string = randomString
            let result = await user_update.save()
            console.log(user_update)
            var transporter = mailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'office@gmail.com',
                    pass: 'password'
                }
            });
            let info = await transporter.sendMail({
                from: 'office@gmail.com', // sender address
                to: user.email, // list of receivers
                subject: "Password Reset", // Subject line
                text: `http://localhost:3002/string/${user._id}/?${randomString}`, // plain text body
            }, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).send(result)
        }
        else {
            res.send("not matched")
        }
    }
    catch (err) {
        console.log(err)
        res.send("failed")
    }

}

module.exports.verify = async (req, res, next) => {
    try{
        
        const stringfromdb = await User.findOne({_id : req.params.id})
        const stringfromuser = req.query.string
        if(stringfromdb === stringfromuser){
            res.send({msg : "matched"})

        }
        else{
            res.send({msg : "invalid request"})
        }
    }
    catch(err){
        res.send(err)
    }
}

module.exports.adminpasswordreset = async (req, res, next) =>{
    try {
        // console.log("in password reset func", req.body.email);
        const email = req.body.email
        const admin = await Admin.findOne({ email: email })
        console.log("admin",admin,admin._id)
        if (admin) {
            const randomString = await bcrypt.genSalt(6)
            let admin_update =await Admin.findOneAndUpdate({_id : admin._id})
            admin_update.string = randomString
            let result = await admin_update.save()
            console.log(admin_update)
            var transporter = mailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'office@gmail.com',
                    pass: 'password'
                }
            });
            let info = await transporter.sendMail({
                from: 'office@gmail.com', // sender address
                to: admin.email, // list of receivers
                subject: "Password Reset", // Subject line
                text: `http://localhost:3002/string/${admin._id}/?${randomString}`, // plain text body
            }, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).send(result)
        }
        else {
            res.send("not matched")
        }
    }
    catch (err) {
        console.log(err)
        res.send("failed")
    }
}

module.exports.adminverify = async (req, res, next) => {
    try{
        
        const stringfromdb = await User.findOne({_id : req.params.id})
        const stringfromadmin = req.query.string
        if(stringfromdb === stringfromuser){
            res.send({msg : "matched"})

        }
        else{
            res.send({msg : "invalid request"})
        }
    }
    catch(err){
        res.send(err)
    }
}