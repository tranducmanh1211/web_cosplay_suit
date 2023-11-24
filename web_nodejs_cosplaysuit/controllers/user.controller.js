var myMD = require('../models/cosplau_suit_user_model');
var nodemailer = require('nodemailer');
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
                            console.log("a" + objU);
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
            else {
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
let OTP = "";
exports.forgotPass = async (req, res, next) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var temp = 0;
    let email = '';
    let email1 = '';
    let msg = '';
    let digits = "0123456789";

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
        if (temp === 0) {
            const exitEmail = await myMD.tb_userModel.findOne({ email: req.body.email });
            if (!exitEmail) {
                email1 = "Email does not exist in the system!"
            } else {

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'suitcosplay@gmail.com',
                        pass: 'vjzqpyqimbldcxjp'
                    }
                });

                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                var content = '';
                content += `
    <div style="text-align: center;padding-top:20dp;padding-bottom: 20px;border: 2px solid rgb(219, 83, 183);border-radius: 10px;background-color: rgb(236, 223, 235);">
                <h4 style="color: #000000;font-size: 20px;font-weight: bold;">Mã Xác Nhận Lại Mật Khẩu</h4>
                <div style="text-align: center;margin-top: 15px;margin-bottom: 15px;margin-left: 10px;margin-right: 10px;padding: 10px;background-color: #ffffff;">
                    <h6 style="font-size : 15px">Đây là mã phê duyệt xác nhận quên mật khẩu của bạn : </h6>
                    <br>
                    <h4 style="font-size: 20px;font-weight: bold;">${OTP}</h4>
                </div>
                <p style="margin-top: 20px;margin-left: 10px;margin-right: 10px;">Nếu bạn không phải là người được gửi yêu cầu này, hãy đổi mật tài khoản ngay lập tức để tránh việc truy cập trái phép...</p>
            </div>
    `;

                var mailOptions = {
                    from: 'Manh Dep Zai',
                    to: req.body.email,
                    subject: 'Mã Đăng Nhập : ' + `${OTP}`,
                    html: content
                };

                transporter.sendMail(mailOptions, async function (error, info) {
                    if (error) {
                        console.log(error);
                        msg = "Error sending email. Please try again.";
                    } else {
                        req.session.emailU = req.body.email;
                        console.log(req.session.emailU);
                        console.log('Email sent: OK');
                        msg = "Please check your email!!";
                    }

                    res.render('cosplay_suit/forgotPasswd', { email: email, email1: email1, msg: msg });
                });
            }
        } else {
            temp = 0;
            msg = "Validation error. Please check your input.";
            res.render('cosplay_suit/forgotPasswd', { email: email, email1: email1, msg: msg });
        }
    } else {
        res.render('cosplay_suit/forgotPasswd', { email: email, email1: email1, msg: msg });
    }
}
exports.otpcheck = async (req, res, next) => {
    let email = req.session.emailU;
    console.log(req.session.emailU);
    console.log(OTP);
    var temp = 0;
    let otp = '';
    let msg = '';
    if (req.method == 'POST') {
        if (String(req.body.otppass).length === 0) {
            otp = "Please do not leave your number blank!"
            temp++;
        } else if (String(req.body.otppass) !== OTP) {
            otp = "OTP code is incorrect!"
        } else {
            otp = "OTP code is corect!";
            res.redirect('/users/forgotPass/otpcheck/passwdnew');
        }
    }

    res.render('cosplay_suit/otpcheck', { otp, email: email, msg });

}
exports.passNew = async (req, res, next) => {
    let pass1 = '';
    let pass2 = '';
    let msg = '';
    var temp = 0;
    let email = req.session.emailU;
    if (req.method == 'POST') {
        if (req.body.newpass.length === 0) {
            pass1 = "Please do not leave your new password blank!"
            temp++;
        } else if (req.body.newpass.length <= 6) {
            pass1 = "New password greater than 6 characters!"
            temp++;
        } else {
            pass1 = "";
        }

        if (req.body.checknewpass.length === 0) {
            pass2 = "Please do not leave your check new password blank!"
            temp++;
        } else if (req.body.checknewpass.length <= 6) {
            pass2 = "Check new password greater than 6 characters!"
            temp++;
        } else if (!(req.body.checknewpass === req.body.newpass)) {
            pass2 = "Check new password must match New password!"
            temp++;
        } else {
            pass2 = "";
        }
        if (temp === 0) {
            try {
                const user = await myMD.tb_userModel.findOne({ email: email });
                user.passwd = req.body.newpass;
                await user.save();
                msg = "Password update successful, please log in again!";
                // res.redirect('/users');
            } catch (error) {
                console.log(error);
            }
        } else {
            temp = 0;
        }

    }
    res.render('cosplay_suit/forgotPasswdNew', { pass1, pass2,msg });
}



exports.account = async (req, res, next) => {
    let account = req.session.userU;
    res.render('cosplay_suit/account', { account: account });
}
exports.newpass = async (req, res, next) => {
    let account = req.session.userU;
    let oldpasswd = '';
    let msg = '';
    let fullname = '';
    let email = '';
    let passwd = '';
    let phone = '';
    var temp = 0;
    if (req.method == 'POST') {
        if (req.body.oldpasswd.length === 0) {
            oldpasswd = "Please do not leave your old password blank!"
            temp++;
        } else if (req.body.oldpasswd.length <= 6) {
            oldpasswd = "Old password greater than 6 characters!"
            temp++;
        } else if (!(req.body.oldpasswd === account.passwd)) {
            oldpasswd = "Old password incorrect!"
            temp++;
        } else {
            oldpasswd = "";
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
            let objMK = new myMD.tb_userModel();
            objMK.passwd = req.body.passwd;
            objMK._id = account._id;
            try {
                await myMD.tb_userModel.findByIdAndUpdate({ _id: account._id }, objMK);
                msg = "Password change successful, you need to log in again!";
                // res.redirect('/users');
            } catch (error) {
                msg = "An error occurred, please reload the page!";
                console.log(error);
            }
        } else {
            temp = 0;
        }

    }





    res.render('cosplay_suit/newpasswd', { account: account, msg, oldpasswd, passwd });
}