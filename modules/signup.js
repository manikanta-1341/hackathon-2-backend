const User = require('../model/users')
const Admin = require('../model/admin')
const mongo = require('../shared/connect');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.userSignup = async (req, res, next) => {
    const new_user = new User({ ...req.body.user })
    const exituser = await User.findOne({ email: req.body.user.email })
    console.log(exituser)
    if (!exituser) {
        try {
            const salt = await bcrypt.genSalt(6)
            new_user.password = await bcrypt.hash(new_user.password, salt)
            var response = await new_user.save();
            res.send(response);
        }
        catch (err) {
            res.send(err);
        }
    }
    else{
        res.send("user already exists")
    }
}

module.exports.adminSignup = async (req, res, next) => {
    const new_admin = new Admin({ ...req.body.admin })
    const exitadmin = await Admin.findOne({ email: req.body.admin.email })
    console.log(exitadmin)
    if (!exitadmin) {
        try {
            const salt = await bcrypt.genSalt(6)
            new_admin.password = await bcrypt.hash(new_admin.password, salt)
            var response = await new_admin.save();
            res.send(response);
        }
        catch (err) {
            res.send(err);
        }
    }
    else{
        res.send("admin already exists")
    }


}
