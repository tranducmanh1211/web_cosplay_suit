exports.yeu_cau_login = (req,res,next) => {

    if(req.session.userU){
        next();
    }else{
        res.redirect('/users');
    }

}
exports.yeu_cau_otp = (req,res,next) => {

    if(req.session.emailU){
        next();
    }else{
        res.redirect('/users/forgotPass');
    }

}