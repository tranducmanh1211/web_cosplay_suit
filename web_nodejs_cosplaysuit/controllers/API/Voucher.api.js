var myMDDD = require('../../models/cosplay_suit_model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}


exports.getListVoucher = async (req, res, next) => {
    let dieu_kien_loc = null;
  

    if (typeof req.params.id_shop !== 'undefined') {
        dieu_kien_loc = { id_shop: req.params.id_shop };
    }
    var list = await  myMDDD.tb_voucherModel.find({id_shop: req.params.id});

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