var myMD = require('../../models/Bill.model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.getbilldentail = async (req, res, next) => {

    const id_user = req.params.id_user;

    // Tìm danh sách hóa đơn theo idUser
    const hoaDonList = await myMD.tb_billModel.find({ id_user: id_user }).select('_id').lean();
    
    // Lấy danh sách idHoaDon từ kết quả trên
    const idHoaDonList = hoaDonList.map(hd => hd._id);

    // Tìm danh sách chi tiết hóa đơn dựa trên danh sách idHoaDon
    let id_bill = {id_bill: { $in: idHoaDonList }};
    const hoaDonChiTietList = await myMD.tb_billdetailsModel
    .find(id_bill).populate('id_bill').populate('id_product');
    
    res.json(hoaDonChiTietList);
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