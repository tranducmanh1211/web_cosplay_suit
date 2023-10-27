var myMD = require('../models/cosplau_suit_user_model');


exports.homeWeb = async (req, res, next) => {
    console.log(req.session.userU);
    var username = req.session.userU.fullname;
    res.render('cosplay_suit/home',{username : username});
}




