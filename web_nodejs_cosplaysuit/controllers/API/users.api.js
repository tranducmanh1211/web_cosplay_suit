var myMD = require('../../models/cosplau_suit_user_model');

var objReturn = {
    status: 1,
    msg: 'ok'
}



exports.login = async (req, res, next) => {
    let msg = "Dang nhap thanh cong";

    try {

        const exitEmail = await myMD.tb_userModel.findOne({ email: req.body.email });
        const exitPhone = await myMD.tb_userModel.findOne({ phone: req.body.phone });
        if (!exitPhone) {
            return res.json({ message: "Phone number not found!" });
        }
        if (req.body.phone && req.body.passwd) {
            let user = await myMD.tb_userModel.findOne(req.body);
            if (user) {
                res.status(201).json({ user: user, message: "Sign Up Successfull!" });
                // msg = "Dang nhap thanh cong"
            } else {
                res.json({ message: "Password is incorrect!" });
            }
        }


    } catch (error) {
        console.log(error);
    }

}


exports.loginUser = async (req, res, next) => {
    let list = null;
    try {
        list = await myMD.tb_userModel.findOne({ email: req.params.email });

        if (list) {
            objReturn.data = list;
            objReturn.status = 1;
            objReturn.msg = "Lay du lieu thanh cong"
        }
        else {
            objReturn.status = 0;
            objReturn.msg = "Lay du lieu khong thanh cong"
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error;
    }
    return res.status(201).json(objReturn.data);
}



exports.regApp = async (req, res, next) => {




    let msg = "";




    try {


        const exitEmail = await myMD.tb_userModel.findOne({ email: req.body.email });
        const exitPhone = await myMD.tb_userModel.findOne({ phone: req.body.phone });


        if (exitEmail && exitPhone) {
            return res.json({ message: "Email and Phone already exitst!" });
        }
        if (exitEmail) {
            return res.json({ message: "Email already exitst!" });
        }
        if (exitPhone) {
            return res.json({ message: "Phone already exitst!" });
        }

        const user = new myMD.tb_userModel(req.body);
        user.phone = req.body.phone;
        user.passwd = req.body.passwd;
        user.email = req.body.email;
        user.fullname = req.body.fullname;
        user.role = req.body.role;
        let new_u = await user.save();
        return res.status(201).json({ user: new_u, message: "Sign Up Successfull!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }





}