var myMD = require('../../models/Bill.model');
var myDBshop = require('../../models/cosplau_suit_user_model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.getstatuswait = async (req, res, next) => {
    let dieu_kien_loc = null;
    const type = req.params.type;

    if (type === "user") {   
        if (typeof (req.params.id) != 'undefined') {
            dieu_kien_loc = { id_user: req.params.id};
        }
    } else if (type === "shop") {
        if (typeof (req.params.id) != 'undefined') {
            const idshop = await myDBshop.tb_shopModel.findOne({id_user: req.params.id}).select('_id');

            dieu_kien_loc = { id_shop: idshop};
        }
    }else {
        console.log('Giá trị null không tìm thấy');
    }

    // Tìm danh sách hóa đơn theo idUser
    const hoaDonList = await myMD.tb_billModel.find({$and: [dieu_kien_loc , {status: 'Wait'}]}).select('_id').lean();
    
    // Lấy danh sách idHoaDon từ kết quả trên
    const idHoaDonList = hoaDonList.map(hd => hd._id);

    // Lấy danh sách id_bill duy nhất từ bảng tb_billdetailsModel
    const distinctIdBillList = await myMD.tb_billdetailsModel.distinct('id_bill', { id_bill: { $in: idHoaDonList } });

    // Lặp qua danh sách id_bill và lấy một đối tượng cho mỗi id_bill
    const uniqueObjects = [];
    for (const idBill of distinctIdBillList) {
    const hoaDonChiTiet = await myMD.tb_billdetailsModel
        .findOne({ id_bill: idBill })
        .populate([
        { path: 'id_bill', populate: [{ path: 'id_user' }, { path: 'id_shop' }] },
        { path: 'id_product' }
        ]);

    uniqueObjects.push(hoaDonChiTiet);
    }
    
    res.json(uniqueObjects);
}

exports.getstatusPack = async (req, res, next) => {

    let dieu_kien_loc = null;
    const type = req.params.type;

    if (type === "user") {   
        if (typeof (req.params.id) != 'undefined') {
            dieu_kien_loc = { id_user: req.params.id};
        }
    } else if (type === "shop") {
        if (typeof (req.params.id) != 'undefined') {
            const idshop = await myDBshop.tb_shopModel.findOne({id_user: req.params.id}).select('_id');

            dieu_kien_loc = { id_shop: idshop};
        }
    }else {
        console.log('Giá trị null không tìm thấy');
    }

    // Tìm danh sách hóa đơn theo idUser
    const hoaDonList = await myMD.tb_billModel.find({$and: [dieu_kien_loc , {status: 'Pack'}]}).select('_id').lean();
    
    // Lấy danh sách idHoaDon từ kết quả trên
    const idHoaDonList = hoaDonList.map(hd => hd._id);

    // Lấy danh sách id_bill duy nhất từ bảng tb_billdetailsModel
    const distinctIdBillList = await myMD.tb_billdetailsModel.distinct('id_bill', { id_bill: { $in: idHoaDonList } });

    // Lặp qua danh sách id_bill và lấy một đối tượng cho mỗi id_bill
    const uniqueObjects = [];
    for (const idBill of distinctIdBillList) {
    const hoaDonChiTiet = await myMD.tb_billdetailsModel
        .findOne({ id_bill: idBill })
        .populate([
        { path: 'id_bill', populate: [{ path: 'id_user' }, { path: 'id_shop' }] },
        { path: 'id_product' }
        ]);

    uniqueObjects.push(hoaDonChiTiet);
    }
    
    res.json(uniqueObjects);
}

exports.getstatusDone = async (req, res, next) => {

    let dieu_kien_loc = null;
    const type = req.params.type;

    if (type === "user") {   
        if (typeof (req.params.id) != 'undefined') {
            dieu_kien_loc = { id_user: req.params.id};
        }
    } else if (type === "shop") {
        if (typeof (req.params.id) != 'undefined') {
            const idshop = await myDBshop.tb_shopModel.findOne({id_user: req.params.id}).select('_id');

            dieu_kien_loc = { id_shop: idshop};
        }
    }else {
        console.log('Giá trị null không tìm thấy');
    }

    // Tìm danh sách hóa đơn theo idUser
    const hoaDonList = await myMD.tb_billModel.find({$and: [dieu_kien_loc , {status: 'Done'}]}).select('_id').lean();
    
    // Lấy danh sách idHoaDon từ kết quả trên
    const idHoaDonList = hoaDonList.map(hd => hd._id);

    // Lấy danh sách id_bill duy nhất từ bảng tb_billdetailsModel
    const distinctIdBillList = await myMD.tb_billdetailsModel.distinct('id_bill', { id_bill: { $in: idHoaDonList } });

    // Lặp qua danh sách id_bill và lấy một đối tượng cho mỗi id_bill
    const uniqueObjects = [];
    for (const idBill of distinctIdBillList) {
    const hoaDonChiTiet = await myMD.tb_billdetailsModel
        .findOne({ id_bill: idBill })
        .populate([
        { path: 'id_bill', populate: [{ path: 'id_user' }, { path: 'id_shop' }] },
        { path: 'id_product' }
        ]);

    uniqueObjects.push(hoaDonChiTiet);
    }
    
    res.json(uniqueObjects);
}

exports.getstatusDelivery = async (req, res, next) => {

    let dieu_kien_loc = null;
    const type = req.params.type;

    if (type === "user") {   
        if (typeof (req.params.id) != 'undefined') {
            dieu_kien_loc = { id_user: req.params.id};
        }
    } else if (type === "shop") {
        if (typeof (req.params.id) != 'undefined') {
            const idshop = await myDBshop.tb_shopModel.findOne({id_user: req.params.id}).select('_id');

            dieu_kien_loc = { id_shop: idshop};
        }
    }else {
        console.log('Giá trị null không tìm thấy');
    }

    // Tìm danh sách hóa đơn theo idUser
    const hoaDonList = await myMD.tb_billModel.find({$and: [dieu_kien_loc , {status: 'Delivery'}]}).select('_id').lean();
    
    // Lấy danh sách idHoaDon từ kết quả trên
    const idHoaDonList = hoaDonList.map(hd => hd._id);

    // Lấy danh sách id_bill duy nhất từ bảng tb_billdetailsModel
    const distinctIdBillList = await myMD.tb_billdetailsModel.distinct('id_bill', { id_bill: { $in: idHoaDonList } });

    // Lặp qua danh sách id_bill và lấy một đối tượng cho mỗi id_bill
    const uniqueObjects = [];
    for (const idBill of distinctIdBillList) {
    const hoaDonChiTiet = await myMD.tb_billdetailsModel
        .findOne({ id_bill: idBill })
        .populate([
        { path: 'id_bill', populate: [{ path: 'id_user' }, { path: 'id_shop' }] },
        { path: 'id_product' }
        ]);

    uniqueObjects.push(hoaDonChiTiet);
    }
    
    res.json(uniqueObjects);
}

exports.AddBilldetail = async (req, res, next) => {

    let add = new myMD.tb_billdetailsModel();
        add.id_bill = req.body.id_bill;
        add.id_product = req.body.id_product;
        add.amount = req.body.amount; 
        add.size = req.body.size; 
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