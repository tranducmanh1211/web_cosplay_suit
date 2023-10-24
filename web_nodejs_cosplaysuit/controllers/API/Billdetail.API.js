var myMD = require('../../models/Bill.model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.getbilldentail = async (req, res, next) => {
    //Lấy ds đơn hàng theo id_user
    let dieu_kien_loc = null;
    if (typeof (req.params.id_bill) != 'undefined') {
        dieu_kien_loc = { id_bill: req.params.id_bill};
    }
    var list = await myMD.tb_billdetailsModel.find(dieu_kien_loc).populate('id_bill').populate('id_product');

    res.send(list);
}

exports.AddBilldetail = async (req, res, next) => {

    let add = new myMD.tb_billdetailsModel();
        add.id_bill = req.body.id_bill;
        add.id_product = req.body.id_product;
        add.amount = req.body.amount; 
        add.totalPayment = req.body.totalPayment;
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