var myMD = require('../../models/cosplau_suit_user_model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}



exports.login = async (req, res, next) => {
    let msg = "Dang nhap thanh cong";
    if ((req.body.email || req.body.phone) && req.body.passwd) {
        let user = await myMD.tb_userModel.findOne(req.body);
        if (user) {
            res.send(msg);
            msg = "Dang nhap thanh cong"
        } else {
            res.send("");
        }
    } else {
        res.send("");
    }
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