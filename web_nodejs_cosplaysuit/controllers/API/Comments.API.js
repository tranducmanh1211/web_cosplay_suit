var myMD = require('../../models/cosplay_suit_model');
var myMD1 = require('../../models/Bill.model');
var objReturn = {
    stu: 1,
    msg: 'ok'
}

exports.listCmts = async (req, res, next) => {

    let listCmts = []

    try {
        listCmts = await myMD.tb_commentsModel.find({ id_product: req.params.id_pro }).populate("id_user");

        if (listCmts) {
            objReturn.data = listCmts;
            objReturn.status = 1;
            objReturn.msg = 'lấy ds thành công';
        } else {
            objReturn.status = 0;
            objReturn.msg = 'không có  dữ liệu'
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    res.json(objReturn.data);
}

exports.addCmts = async (req, res, next) => {

    try {
        var currentdate = new Date();
        var datetime = "" + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        const BL = new myMD.tb_commentsModel(req.body);
        BL.content = req.body.content;
        BL.time = datetime;
        BL.id_product = req.body.id_product;
        BL.id_user = req.body.id_user;
        BL.image = req.body.image;
        BL.star = req.body.star;

        let new_Cmts = await BL.save()
        return res.status(201).json({ new_Cmts })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}


exports.delCmts = async (req, res, next) => {
    try {
        await myMD.tb_commentsModel.findByIdAndDelete(req.params.id, req.body);
        res.send('Xoa thanh cong')
    } catch (error) {
        res.send('Error')
    }

}
exports.getlistDHCDG = async (req, res, next) => {
    const id_user = req.params.id_user;


    const hoaDonList = await myMD1.tb_billModel.find({ $and: [{ id_user: id_user }, { status: 'Done' }] }).select('_id').lean();


    const danhGiaList = await myMD.tb_commentsModel.find({ id_user: id_user }).lean();


    const donHangChuaDanhGia = hoaDonList.filter((hoaDon) => {
        const idProduct = hoaDon._id;
        return !danhGiaList.some((danhGia) => danhGia.id_product.toString() === idProduct.toString());
    });
    const donHangChuaDanhGiaWithProducts = await myMD1.tb_billdetailsModel
        .find({ id_bill: { $in: donHangChuaDanhGia.map((hoaDon) => hoaDon._id) } })
        .populate('id_product')
        .lean();
    res.json(donHangChuaDanhGiaWithProducts);

}

exports.getlistDDG = async (req, res, next) => {
    const id_user = req.params.id_user;

    const hoaDonList = await myMD1.tb_billModel.find({ $and: [{ id_user: id_user }, { status: 'Done' }] }).select('_id').lean();

    const danhGiaList = await myMD.tb_commentsModel.find({ id_user: id_user }).lean();

    const donHangDaDanhGia = hoaDonList.filter((hoaDon) => {
        const idProduct = hoaDon._id;
        return danhGiaList.some((danhGia) => danhGia.id_product.toString() === idProduct.toString());
    });


    const donHangDaDanhGiaWithProducts = await myMD1.tb_billdetailsModel
        .find({ id_bill: { $in: donHangDaDanhGia.map((hoaDon) => hoaDon._id) } })
        .populate('id_product')
        .lean();

    res.json(donHangDaDanhGiaWithProducts);

}

exports.getBillDetailsWithProducts = async (req, res, next) => {
    const id_user = req.params.id_user;

    // Tìm danh sách hóa đơn đã hoàn thành của người dùng
    const hoaDonList = await myMD1.tb_billModel.find({ $and: [{ id_user: id_user }, { status: 'Done' }] }).select('_id').lean();

    // Lấy danh sách idBill từ kết quả trên
    const idBillList = hoaDonList.map((hoaDon) => hoaDon._id);

    // Tìm danh sách đánh giá của người dùng
    const danhGiaList = await myMD.tb_commentsModel.find({ id_user: id_user }).lean();

    // Lọc ra danh sách đơn hàng đã hoàn thành và đã được đánh giá
    const donHangDaDanhGia = hoaDonList.filter((hoaDon) => {
        const idProduct = hoaDon._id;
        return danhGiaList.some((danhGia) => danhGia.id_product.toString() === idProduct.toString());
    });

    // Lấy danh sách đơn hàng đã hoàn thành và chưa được đánh giá
    const donHangChuaDanhGia = hoaDonList.filter((hoaDon) => {
        const idProduct = hoaDon._id;
        return !danhGiaList.some((danhGia) => danhGia.id_product.toString() === idProduct.toString());
    });

    res.json({
        donHangDaDanhGia,
        donHangChuaDanhGia,
    });
};
