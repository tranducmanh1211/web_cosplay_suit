var myMD = require('../models/cosplau_suit_user_model');
var myUser = require('../models/cosplay_suit_model');

exports.homeWeb = async (req, res, next) => {
    console.log(req.session.userU);
    var username = req.session.userU.fullname;
    res.render('cosplay_suit/home',{username : username});
}

exports.quanlyNguoiBan = async (req, res, next) => {
    // var username = req.session.userU.fullname;
    let username = req.session.userU.fullname;
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    let dieu_Kien = {};
    if (typeof (req.query.email) != 'undefined') {
        dieu_Kien = { email: new RegExp('.*' + req.query.email + '.*') };
    }
    let list = await myMD.tb_userModel.find();
    let page_length = Math.ceil(list.length/limit); 
    //page_length = 3

    let listUser = await myMD.tb_userModel.find({$and: [{role: "Salesman"}, dieu_Kien]})
    .skip(skip)
    .limit(limit);
  
   
    
    res.render('navigation_view/quanlynguoiban',{username : username,listUser : listUser,page_length : page_length,page : page});
}
exports.quanlyNguoiBanbyID = async (req,res,next)=>{
    let list = await myMD.tb_userModel.findOne({_id : req.params._id});

    res.json(list);
}



