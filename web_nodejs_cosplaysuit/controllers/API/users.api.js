const { response } = require('express');
var myMD = require('../../models/cosplau_suit_user_model');

const accountSid = 'ACb85dcbf3db4f48feab2d902ca8de87e9';
const authToken = 'b2af5e0125f2fada83f59357cdb3a887';
const client = require('twilio')(accountSid, authToken);

var objReturn = {
    status: 1,
    msg: 'ok'
}
var objReturn1 = {
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
                if (user.__v === 0) {
                    res.status(201).json({ user: user, message: "Sign Up Successfull!" });
                } else {
                    res.json({ message: "Your account has been disabled.Can not login!" });
                }
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
exports.regShopApp = async (req, res, next) => {
    //asdas

    const exitId_user = await myMD.tb_shopModel.findOne({ id_user: req.body.id_user });



    try {
        if (exitId_user) {
            return res.json({ response: "Account has been registered!" });
        }

        const shop = await myMD.tb_shopModel();
        shop.nameshop = req.body.nameshop;
        shop.address = req.body.address;
        shop.id_user = req.body.id_user;
        let newshop = await shop.save();
        return res.status(201).json({ shop: newshop, response: "Register Successfull!" });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ response: "Something went wrong!" });
    }

}
exports.updateRoleUser = async (req, res, next) => {
    let idrole = req.params.id_user;

    let updateRole = new myMD.tb_userModel();
    updateRole.role = req.body.role;

    let new_role = await myMD.tb_userModel.findByIdAndUpdate(idrole, req.body);
    console.log(new_role);
    try {
        if (new_role) {
            objReturn.data = new_role;
            objReturn.stu = 1;
            objReturn.msg = 'Sửa thành công';
        } else {
            objReturn.stu = 0;
            objReturn.msg = "Sửa thất bại";
        }
    } catch (error) {
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }
    res.json(objReturn);
}


exports.userById = async (req, res, next) => {

    let User = null;

    try {
        User = await myMD.tb_userModel.findOne({ _id: req.params.id });
        if (User) {
            objReturn1.data = User;
            objReturn1.status = 1;
            objReturn1.msg = 'lấy ds thành công';
        } else {
            objReturn1.status = 0;
            objReturn1.msg = 'không có  dữ liệu'
        }
    } catch (error) {
        objReturn1.status = 0;
        objReturn1.msg = error.msg;
    }


    res.json(objReturn1.data);

}
exports.updatePasswd = async (req, res, next) => {
    try {
        const user = await myMD.tb_userModel.findById(req.params.id);
        user.passwd = req.body.passwd;

        const uSave = await user.save();
        res.json(uSave);
    } catch (error) {
        res.send(error);
    }
}
exports.forgotPasswd = async ( req, res, next) =>{
    try {
        const user = await myMD.tb_userModel.findOne({phone : req.params.phone});     
        user.passwd = req.body.passwd;
        
        const uSave = await user.save();
        res.json(uSave);
    } catch (error) {
        res.send(error)
    }
}
exports.seenOTP = async (req, res, next) => {
    let phoneUser;
    try {
        const { phone } = req.body;

        phoneUser = await myMD.tb_userModel.findOne({ phone });

        let digits = "0123456789";
        let OTP = "";

        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        await client.messages.create({
            body: `Mạnh đẹp zai hơn Bình thật sự  ${OTP}`,
            messagingServiceSid: "MG572ad512b5cdae64f82467201f07d364",
            to: `+84${phone}`
        }).then(message => {
            console.log(message.sid);
            return res.status(200).json({ msg: "Message Sent Successfully" });
        }).catch(error => {
            console.error(error);
            return res.status(500).json({ error: "Error sending message" });
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
}
exports.diachiById = async (req, res, next) => {

    let User = null;

    try {
        User = await myMD.tb_profileModel.findOne({ id_user: req.params.id }).populate('id_user');
        if (User) {
            objReturn1.data = User;
            objReturn1.status = 1;
            objReturn1.msg = 'lấy ds thành công';
        } else {
            objReturn1.status = 0;
            objReturn1.msg = 'không có  dữ liệu'
        }
    } catch (error) {
        objReturn1.status = 0;
        objReturn1.msg = error.msg;
    }


    res.json(objReturn1.data);

}
exports.updatediachi  = async (req, res, next) => {
    try {
        const user = await myMD.tb_profileModel.findById(req.params.id);
        user.fullname = req.body.fullname;
        user.email=req.body.email;
        user.phone=req.body.phone;
        user.diachi=req.body.diachi;
        const uSave = await user.save();
        res.json(uSave);
    } catch (error) {
        res.send(error);
    }
}
exports.updiachi  = async (req, res, next) => {
    let addCM = new myMD.tb_profileModel(res.body);
  
    addCM.id_user= req.body.id_user;
    addCM.fullname = req.body.fullname;
    addCM.email = req.body.email;
    addCM.phone = req.body.phone;
    addCM.diachi = req.body.diachi;

    let new_CMD = await addCM.save();
    console.log(new_CMD);
    try {
        if (new_CMD) {
            objReturn.data = addCM;
            objReturn.stu = 1;
            objReturn.msg = "thanhcong"
        } else {
            objReturn.stu = 0;
            objReturn.msg = "thatbai"
        }
    } catch (error) {
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }

    res.json(objReturn);
}