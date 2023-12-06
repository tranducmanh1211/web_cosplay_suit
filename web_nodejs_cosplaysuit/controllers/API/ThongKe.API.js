var myMD = require('../../models/Bill.model');


exports.getBillTke = async (req, res, next) => {
    //Lấy ds đơn hàng theo id_user
    let dieu_kien_loc = null;
    if (typeof (req.params.id_shop) != 'undefined') {
        dieu_kien_loc = { id_shop: req.params.id_shop};
    }
    var list = await myMD.tb_billModel.find({$and: [dieu_kien_loc , {status: 'Done'}]})
    .populate('id_shop').populate('id_user').populate('id_address').populate('id_thanhtoan');

    res.send(list);
}