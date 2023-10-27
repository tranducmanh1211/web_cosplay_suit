var myMD = require('../models/cosplau_suit_user_model');

exports.loginWeb = async (req, res, next) => {
    let msg = '';
    let email = '';
    let passwd = '';
    var temp = 0;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (req.method == 'POST') {
        if (req.body.email.length === 0) {
            email = "Please do not leave your email blank!"
            temp++;
        } else if (!emailRegexp.test(req.body.email)) {
            email = "Incorrect email format!"
            temp++;
        } else {
            email = "";
        }
        if (req.body.passwd.length === 0) {
            passwd = "Please do not leave your password blank!"
            temp++;
        } else if (req.body.passwd.length <= 6) {
            passwd = "Password greater than 6 characters!"
            temp++;
        } else {
            passwd = "";
        }
        if (temp === 0) {
            try {



                let objU = await myMD.tb_userModel.findOne({ email: req.body.email });
                // console.log(objU.email);
                // if(objU.equals("")){
                //     msg = "Email does not exist in the system!"
                // }
                if (!objU.equals("")) {
                    if (objU.passwd == req.body.passwd) {
                        if (objU.role == 'Admin') {
                            req.session.userU = objU;
                            console.log(req.session.userLogin);
                            return res.redirect('/users/home');
                        } else {
                            msg = " Your account is not authorized!"
                        }

                    } else {
                        msg = " Password does not match!"
                    }
                } else {

                }
            } catch (error) {
                msg = " Email does not exist in the system!"
                console.log(error);
            }
        } else {
            temp = 0;
        }

    }
    res.render('cosplay_suit/login', { msg: msg, email: email, passwd: passwd });
}


exports.dangky = async (req, res, next) => {
    let msg = '';
    let fullname = '';
    let email = '';
    let passwd = '';
    let phone = '';
    var temp = 0;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (req.method == 'POST') {
        if (req.body.fullname.length === 0) {
            fullname = "Please do not leave your name blank!"
            temp++;
        } else {
            fullname = "";
        }

        if (req.body.email.length === 0) {
            email = "Please do not leave your email blank!"
            temp++;
        } else if (!emailRegexp.test(req.body.email)) {
            email = "Incorrect email format!"
            temp++;
        } else {
            email = "";
        }

        if (req.body.phone.length === 0) {
            phone = "Please do not leave your phone blank!"
            temp++;
        } else {
            fullname = "";
        }

        if (req.body.passwd.length === 0) {
            passwd = "Please do not leave your password blank!"
            temp++;
        } else if (req.body.passwd.length <= 6) {
            passwd = "Password greater than 6 characters!"
            temp++;
        } else {
            passwd = "";
        }




        if (temp === 0) {

            const exitEmail = await myMD.tb_userModel.findOne({ email: req.body.email });
            const exitPhone = await myMD.tb_userModel.findOne({ phone: req.body.phone });


            if (exitEmail && exitPhone) {
                msg = "Email and Phone already exitst!"
            }
            else if (exitEmail || exitPhone) {
                msg = "Email or Phone already exitst!"
            }
            else  {
                let objUser = new myMD.tb_userModel();
                objUser.fullname = req.body.fullname;
                objUser.passwd = req.body.passwd;
                objUser.email = req.body.email;
                objUser.phone = req.body.phone;
                objUser.role = "Admin";
                try {
                    await objUser.save();
                    res.redirect('/users');
                } catch (error) {
                    console.log(error);
                }
            }




          

        } else {
            temp = 0;
        }


    }
    res.render('cosplay_suit/signup', { msg: msg, fullname: fullname, phone: phone, email: email, passwd: passwd });

}

