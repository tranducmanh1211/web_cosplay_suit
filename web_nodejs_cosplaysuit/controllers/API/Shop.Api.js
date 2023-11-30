var myMDD = require('../../models/cosplau_suit_user_model');
//sdasdasdsd
var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.getlListShop = async (req, res, next) => {
    //lấy danh sách sản phẩm kèm theo tên thể loại

    let dieu_kien_loc = null;
    if (typeof (req.params.id_user) != 'undefined') {
        dieu_kien_loc = { id_user: req.params.id_user };
    }
    var list = await myMDD.tb_shopModel.find(dieu_kien_loc);
    res.send(list);
}
exports.getlListShop1 = async (req, res, next) => {
    //lấy danh sách sản phẩm kèm theo tên thể loại

 
    var list = await myMDD.tb_shopModel.find().populate('id_user');
    res.send(list);
}

exports.getShopById = async (req, res, next) => {
    try {
        var shop = await myMDD.tb_shopModel
            .findOne({ _id: req.params.id })
            .select('id_user');

        if (!shop) {
            return res.status(404).json({ message: 'Không tìm thấy cửa hàng' });
        }

        res.status(200).json({ id_user: shop.id_user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi server' });
    }
}
exports.getShopById1 = async (req, res, next) => {
    try {
        var shop = await myMDD.tb_shopModel
            .findOne({ _id: req.params.id });

        if (!shop) {
            return res.status(404).json({ message: 'Không tìm thấy cửa hàng' });
        }

        res.status(200).json(shop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi server' });
    }
}

