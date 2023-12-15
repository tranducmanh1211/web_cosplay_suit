var myvitrunggian = require('../../models/vitrunggian.model');
var myMD = require('../../models/Bill.model');
var myDBshop = require('../../models/cosplau_suit_user_model');
var objReturn = {
    stu: 1,
    msg: 'ok'
}

exports.getwallet = async (req, res, next)=>{
    let dieu_kien_loc = null;
    if (typeof (req.params.iduser) != 'undefined') {
        dieu_kien_loc = { id_user: req.params.iduser};
    }   
    var listwallet = await myvitrunggian.tb_walletModel.findOne(dieu_kien_loc);
    res.json(listwallet);
}
exports.AddWallet = async (req, res, next) => {

    let add = new myvitrunggian.tb_walletModel();
        add.id_user = req.body.id_user;
        add.money = req.body.money;
        add.currency = req.body.currency;
        add.passwd = req.body.passwd; 
    let new_CMD = await add.save();
    console.log(new_CMD);
    try{
        if(new_CMD){
            objReturn.data = add;
            objReturn.stu = 1;
            objReturn.msg = "Thêm thành công"
        }else{
            objReturn.stu = 0;
            objReturn.msg = "Thêm thất bại"
        }
    }catch(error){
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }

    res.json(objReturn);
}
exports.UpWalletAdmin = async (req, res, next) => {
    const totalPaymentWithDiscount = parseFloat(req.body.money);
    //tìm _id wallet của selman thực hiện sửa luôn
    let idwalletselman = await myvitrunggian.tb_walletModel.findOne({id_user: "6561f52b685f243b220b498b"});
    const idWalletselmanString = idwalletselman._id.toString();
    const moneyValueselman = parseFloat(idwalletselman.money);
    let suawalletselman = new myvitrunggian.tb_walletModel();
        suawalletselman.money += totalPaymentWithDiscount;
    let a3 = await myvitrunggian.tb_walletModel.findByIdAndUpdate(idWalletselmanString, { money: moneyValueselman + totalPaymentWithDiscount }, req.body);
    res.json(a3);
}
exports.Getlichsuthuchien = async (req, res, next) => {
    const idshop = await myDBshop.tb_shopModel.findOne({id_user: req.params.id_user}).select('_id');
    console.log("idshop" + idshop);
    //lấy danh sách id_thanhtoan
    const hoaDonList = await myMD.tb_billModel.find({id_shop: idshop}).select('_id').lean();
    console.log("hoaDonList" + hoaDonList);
    // Lấy danh sách id_thanhtoan từ kết quả trên
    const idHoaDonList = hoaDonList.map(hd => hd._id);
    console.log("idHoaDonList" + idHoaDonList);
    const listhistory = await myvitrunggian.tb_transaction_historyModel.find({ id_bill: { $in: idHoaDonList } })
    .populate([
        { path: 'id_bill', populate: [{ path: 'id_user' }, { path: 'id_shop' }, { path: 'id_address' }, { path: 'id_thanhtoan' }] },
        { path: 'implementer' },
        { path: 'receiver_wallet' },
        { path: 'sender_wallet' }
        ]);
    console.log("listhistory" + listhistory);
    res.json(listhistory);

}