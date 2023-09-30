var myMD = require('../models/cosplau_suit_user_model');

exports.loginWeb = async (req,res,next)=>{



    res.render('cosplay_suit/login');
}