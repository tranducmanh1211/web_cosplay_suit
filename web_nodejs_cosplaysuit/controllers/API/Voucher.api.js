var myMDDD = require('../../models/cosplay_suit_model');
var myDBshop = require('../../models/cosplau_suit_user_model');
var myMD = require('../../models/Bill.model');
const { ObjectId } = require('mongoose').Types;
var objReturn = {
    stu: 1,
    msg: 'ok'
}


exports.getListVoucher = async (req, res, next) => {
    let dieu_kien_loc = null;


    if (typeof req.params.id_shop !== 'undefined') {
        dieu_kien_loc = { id_shop: req.params.id_shop };
    }
    var list = await myMDDD.tb_voucherModel.find({ id_shop: req.params.id });

    res.send(list);
}
exports.AddVoucher = async (req, res, next) => {
    let addCM = new myMDDD.tb_voucherModel;
    addCM.id_shop = req.body.id_shop;
    addCM.id_user = req.body.id_user;
    addCM.discount = req.body.discount;
    addCM.amount = req.body.amount;
    addCM.content = req.body.content;
    let new_CMD = await addCM.save();
    console.log(new_CMD);
    try {
        if (new_CMD) {
            objReturn.data = addCM;
            objReturn.stu = 1;
            objReturn.msg = "Thêm thành công"
        } else {
            objReturn.stu = 0;
            objReturn.msg = "Thêm thất bại"
        }
    } catch (error) {
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }

    res.json(objReturn);
}
exports.updateProduct = async (req, res, next) => {

    try {

        const addCM = await myMDDD.tb_voucherModel.findById(req.params.id);

        addCM.id_shop = req.body.id_shop;
        addCM.id_user = req.body.id_user;
        addCM.discount = req.body.discount;
        addCM.amount = req.body.amount;
        addCM.content = req.body.content;

        const mtSave = await addCM.save();
        res.json(mtSave);
    } catch (error) {
        res.send(error)
        console.log(error);

    }

}
exports.delVoucher = async (req, res, next) => {
    try {
        await myMDDD.tb_voucherModel.findByIdAndDelete(req.params.id, req.body);
        res.send('Xoa thanh cong')
    } catch (error) {
        res.send('Error')
    }

}

exports.listUserByShop = async (req, res, next) => {
    const idshop = await myDBshop.tb_shopModel.findOne({ id_user: req.params.id }).select('_id');

    const cartlist = await myMD.tb_billModel.find({ id_shop: idshop }).select('id_user').lean();

    const idshoplist = new Set(cartlist.map(hd => String(hd.id_user)));
    const giaTriKhongTrungLap = [...idshoplist];

    //Lấy ds user từ ds không trùng
    const list = await myDBshop.tb_profileModel.find({ id_user: { $in: giaTriKhongTrungLap } }).populate('id_user');

    res.send(list);
}

exports.seenVoucher = async (req, res, next) => {
    let msg = '';
    let dieu_kien_loc = null;
    try {
    
            const seenVoucers = new myMDDD.tb_seenvoucher();
            seenVoucers.id_user = req.body.id_user;
            seenVoucers.id_voucher = req.body.id_voucher;
    
            let new_CMD = await seenVoucers.save();
            return res.status(201).json({ seenVoucher: new_CMD, msg: "Gửi voucher thành công!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Đã xảy ra lỗi!" });
    }
}
exports.listSeenByIdVoucher = async ( req, res,next)=>{
    const list = await myMDDD.tb_seenvoucher.find({id_voucher : req.params.id_voucher});

    res.json(list);
}
exports.updateVoucherSeen = async (req, res, next) => {

    try {

        const addCM = await myMDDD.tb_voucherModel.findById(req.params.id);
        addCM.amount = req.body.amount;

        const mtSave = await addCM.save();
        res.json(mtSave);
    } catch (error) {
        res.send(error)
        console.log(error);

    }
}
