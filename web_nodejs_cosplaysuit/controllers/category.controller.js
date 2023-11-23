var myMD = require('../models/cosplay_suit_model');


exports.theloai = async (req, res, next) => {


    //tạo chức năng lọc dữ liệu trên danh sách
    let dieu_kien_loc = null;

    if (typeof (req.query.name) != 'undefined') {
        dieu_kien_loc = { price: req.query.name };
    }

    var list = await myMD.tb_categoryModel.find(dieu_kien_loc);
    //    var list = await myMD.spModel.find(dieu_kien_loc).populate('id_theloai').sort({ _id: 1 });

    res.render('navigation_view/quanlytheloai', { listTL: list });
}

exports.addTL = async (req, res, next) => {

    let msg = ''; 

    if (req.method == 'POST') {

        let obj = new myMD.tb_categoryModel();
        obj.name = req.body.name;
        try {
            let new_sp = await obj.save();
            console.log(new_sp);
            msg = 'Đã thêm thành công';

        } catch (error) {
            msg = 'Lỗi ' + error.message();
            console.log(error);
        }
    }

    res.render('navigation_view/quanlytheloai', { msg: msg });
}