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
exports.regShopApp = async (req, res, next) => {
   
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
        if(new_role){
            objReturn.data = new_role;
            objReturn.stu = 1;
            objReturn.msg = 'Sửa thành công';
        }else{
            objReturn.stu = 0;
            objReturn.msg = "Sửa thất bại";
        }
    } catch (error) {
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }
    res.json(objReturn);
}