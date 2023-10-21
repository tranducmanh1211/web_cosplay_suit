var myMDD = require('../../models/cosplau_suit_user_model');
//sdasdasdsd
var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.getlListShop = async (req, res, next) => {
    //lấy danh sách sản phẩm kèm theo tên thể loại

    let dieu_kien_loc = null;

    if (typeof (req.query.id_user) != 'undefined') {
        dieu_kien_loc = { id_user: req.query.id_user};
    }
    var list = await myMDD.tb_shopModel.find(dieu_kien_loc);
    res.send(list);
}


