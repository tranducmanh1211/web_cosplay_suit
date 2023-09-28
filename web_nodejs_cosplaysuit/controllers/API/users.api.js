var myMD = require('../../models/cosplau_suit_user_model');

var objReturn = {
    status: 1,
    msg: 'ok'
}



exports.login = async (req, res, next) => {
    let msg = "Dang nhap thanh cong";
    if ((req.body.email || req.body.phone) && req.body.passwd) {
        let user = await myMD.tb_userModel.findOne(req.body);
        if (user) {
            res.send(user);
            // msg = "Dang nhap thanh cong"
        } else {
            res.send("");
        }
    } else {
        res.send("");
    }
}

exports.loginUser = async (req,res,next) => {
    let list = null;
    try {
        list = await myMD.tb_userModel.findOne({email : req.params.email});


        if(list){
            objReturn.data = list;
            objReturn.status = 1;
            objReturn.msg = "Lay du lieu thanh cong"
        }
        else{
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
    try {
        const nd = new myMD.tb_userModel(req.body);
        nd.phone = req.body.phone;
        nd.passwd = req.body.passwd;
        nd.email = req.body.email;
        nd.fullname = req.body.fullname;
        nd.role = req.body.role;
        
        let new_u = await nd.save();
        return res.status(201).json({ nd: new_u });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}