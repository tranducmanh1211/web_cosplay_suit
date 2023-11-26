var myMD = require('../models/cosplau_suit_user_model');
var myUser = require('../models/cosplay_suit_model');

exports.homeWeb = async (req, res, next) => {
    console.log(req.session.userU);
    var username = req.session.userU.fullname;
    res.render('cosplay_suit/home', { username: username });
}

exports.quanlyKH = async (req, res, next) => {
    // var username = req.session.userU.fullname;
    let username = req.session.userU.fullname;
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 8;
    let skip = (page - 1) * limit;
    let dieu_Kien = {};
    let dieu_kien_fullname = {};

    if (typeof (req.query.email) != 'undefined') {
        if (!isNaN(req.query.email)) {
            console.log('Người dùng đã nhập số.');
            dieu_Kien = { phone: new RegExp('.*' + req.query.email + '.*') };
        } else if (typeof req.query.email === 'string') {
            console.log('Người dùng đã nhập chữ.');
            dieu_Kien = { email: new RegExp('.*' + req.query.email + '.*') };
        } else {
            console.log('Người dùng đã nhập giá trị không hợp lệ.');
        }
    }


    if (typeof (req.query.name) != 'undefined') {
        dieu_kien_fullname = { fullname: req.query.name }
    }
    let list = await myMD.tb_userModel.find({ role: { $ne: "Admin" } });
    let page_length = Math.ceil(list.length / limit);
    //page_length = 3

    let listUser = await myMD.tb_userModel.find({ $and: [{ role: { $ne: "Admin" } }, dieu_Kien] })
        .sort(dieu_kien_fullname)
        .skip(skip)
        .limit(limit);

    console.log(listUser);
    if (req.method == 'POST') {
        let v = req.body.id__v;
        let id = req.body.id_user;
        console.log(v);
        let objU = new myMD.tb_userModel();
        if (v == 0) {
            objU.__v = 1;
        } else {
            objU.__v = 0;
        }



        objU._id = id;

        try {
            await myMD.tb_userModel.findByIdAndUpdate({ _id: id }, objU);

        } catch (error) {
            msg = 'loi';
            console.log(error);
        }
        res.redirect('/users/home/quanlykhachhang');
        return;
    }

    res.render('navigation_view/quanlykhachhang', { username: username, listUser: listUser, page_length: page_length, page: page, email: req.query.email });
}

exports.quanlyKHVoHieuHoa = async (req, res, next) => {
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
    let page_length = Math.ceil(list.length / limit);
    //page_length = 3

    let listUser = await myMD.tb_userModel.find({ $and: [{ role: { $ne: "Admin" } }, dieu_Kien] })
        .skip(skip)
        .limit(limit);
    let v = req.body.id__v;
    let id = req.body.id_user;
    console.log(v);
    if (req.method == 'POST') {
        let objU = new myMD.tb_userModel();
        if (v == 0) {
            objU.__v = 1;
        } else {
            objU.__v = 0;
        }



        objU._id = id;

        try {
            await myMD.tb_userModel.findByIdAndUpdate({ _id: id }, objU);

            res.redirect('/users/home/quanlykhachhang');
        } catch (error) {
            msg = 'loi';
            console.log(error);
        }
    }




    res.render('navigation_view/quanlykhachhang', { username: username, listUser: listUser, page_length: page_length, page: page });
}


exports.quanlyKHbyID = async (req, res, next) => {
    let list = await myMD.tb_userModel.findOne({ _id: req.params._id });

    res.json(list);
}
exports.deleteKHbyID = async (req, res, next) => {
    let id = req.params.id;
    try {

        await myMD.tb_userModel.findByIdAndDelete(id, req.body);
        res.redirect('/users/home/quanlykhachhang');

    } catch (error) {

    }
    res.render('navigation_view/quanlykhachhang');
}

exports.getProduct = async (req, res, next) => {
    let username = req.session.userU.fullname;
    let dieu_kien_loc = null;
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    if (typeof req.query.nameproduct !== 'undefined') {
        const keyword = req.query.nameproduct;
        const regex = new RegExp('.*' + keyword + '.*', 'i');
        dieu_kien_loc = { nameproduct: regex };
    }

    try {
        var list = await myUser.tb_productModel.find()
        let page_length = Math.ceil(list.length / limit);

        var list = await myUser.tb_productModel.find(dieu_kien_loc).skip(skip).populate('id_shop').populate('id_category')
            .limit(limit);;
        res.render('cosplay_suit/home', { listProduct: list, username: username, page_length: page_length, page: page });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Lỗi khi truy vấn dữ liệu từ MongoDB.');
    }
};


