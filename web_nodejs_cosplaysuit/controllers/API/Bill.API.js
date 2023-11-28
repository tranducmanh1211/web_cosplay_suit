var myMD = require('../../models/Bill.model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.getbill = async (req, res, next) => {
    //lấy danh sách sản phẩm kèm theo tên thể loại
    var list = await myMD.tb_cartoderModel.find();

    res.send(list);
}

exports.getUserbill = async (req, res, next) => {
    //Lấy ds đơn hàng theo id_user
    let dieu_kien_loc = null;
    if (typeof (req.params.id_user) != 'undefined') {
        dieu_kien_loc = { id_user: req.params.id_user};
    }
    var list = await myMD.tb_billModel.find(dieu_kien_loc).populate('id_shop').populate('id_user');

    res.send(list);
}

exports.AddBill = async (req, res, next) => {

    let add = new myMD.tb_billModel();
        add.id_user = req.body.id_user;
        add.id_shop = req.body.id_shop;
        add.timestart = req.body.timestart;
        add.timeend = req.body.timeend;
        add.status = req.body.status; 
        add.totalPayment = req.body.totalPayment;
        add.vnp_TxnRef = req.body.vnp_TxnRef;
        add.ma_voucher = req.body.ma_voucher;
    let new_CMD = await add.save();
    res.json(new_CMD);
}

exports.updateBill = async (req, res, next) => {
    let _id = req.params.id;

    let sua = new myMD.tb_billModel();
        sua.status = req.body.status; 
        sua.timeend = req.body.timeend;

    let newcart = await myMD.tb_billModel.findByIdAndUpdate(_id, req.body);
        try{
            if(newcart){
                objReturn.data = newcart;
                objReturn.stu = 1;
                objReturn.msg = "Sửa thành công"
            }else{
                objReturn.stu = 0;
                objReturn.msg = "Sửa thất bại"
            }
        }catch(error){
            objReturn.stu = 0;
            objReturn.msg = error.msg;
        }
    res.json(objReturn);
}

