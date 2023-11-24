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

exports.listCmtsForUser = async (req, res, next) => {
    let listCmts = []

    try {
        listCmts = await myMD.tb_commentsModel.find({ id_user: req.params.id_user }).populate("id_product").populate("id_user");

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
        BL.id_bill = req.body.id_bill;

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

const hasReviewed = (danhGiaList, id_product, id_user, id_bill) => {
    return danhGiaList.some((danhGia) => 
        danhGia.id_product.toString() === id_product.toString() &&
        danhGia.id_user.toString() === id_user.toString() &&
        (!id_bill || danhGia.id_bill.toString() === id_bill.toString())
    );
};

exports.getlistDHCDG = async (req, res, next) => {
    const id_user = req.params.id_user;

    try {
        const doneBills = await myMD1.tb_billModel.find({ $and: [{ id_user: id_user }, { status: 'Done' }] }).select('_id').lean();
        const idHoaDonList = doneBills.map(hd => hd._id);

        const hoaDonChiTietList = await myMD1.tb_billdetailsModel
            .find({ id_bill: { $in: idHoaDonList } })
            .populate({
                path: 'id_product',
                populate: {
                    path: 'id_shop',
                    model: 'tb_shopModel',
                },
            })
            .lean();

        const danhGiaList = await myMD.tb_commentsModel.find({ id_product: { $in: hoaDonChiTietList.map(item => item.id_product) }, id_bill: { $exists: true } }).lean();

        const chuaDanhGia = hoaDonChiTietList.filter((chiTiet) => {
            return !hasReviewed(danhGiaList, chiTiet.id_product._id, id_user, chiTiet.id_bill);
        });

        res.json(chuaDanhGia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getlistDDG = async (req, res, next) => {
    const id_user = req.params.id_user;

    try {
        const doneBills = await myMD1.tb_billModel.find({ $and: [{ id_user: id_user }, { status: 'Done' }] }).select('_id').lean();
        const idHoaDonList = doneBills.map(hd => hd._id);

        const hoaDonChiTietList = await myMD1.tb_billdetailsModel
            .find({ id_bill: { $in: idHoaDonList } })
            .populate({
                path: 'id_product',
                populate: {
                    path: 'id_shop',
                    model: 'tb_shopModel',
                },
            })
            .lean();

        const danhGiaList = await myMD.tb_commentsModel.find({ id_product: { $in: hoaDonChiTietList.map(item => item.id_product) }, id_bill: { $exists: true } }).lean();

        const daDanhGia = hoaDonChiTietList.filter((chiTiet) => {
            return hasReviewed(danhGiaList, chiTiet.id_product._id, id_user, chiTiet.id_bill);
        });

        res.json(daDanhGia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBillDetailsWithProducts = async (req, res, next) => {
    const id_user = req.params.id_user;

    const hoaDonList = await myMD1.tb_billModel.find({ $and: [{ id_user: id_user }, { status: 'Done' }] }).select('_id').lean();
    const idHoaDonList = hoaDonList.map(hd => hd._id);

    const hoaDonChiTietList = await myMD1.tb_billdetailsModel
        .find({ id_bill: { $in: idHoaDonList } })
        .populate({
            path: 'id_product',
            populate: {
                path: 'id_shop',
                model: 'tb_shopModel',
            },
        })
        .lean();

    const danhGiaList = await myMD.tb_commentsModel.find({ id_product: { $in: hoaDonChiTietList.map(item => item.id_product) }, id_bill: { $exists: true } }).lean();

    const daDanhGia = [];
    const chuaDanhGia = [];

    hoaDonChiTietList.forEach((chiTiet) => {
        const coDanhGia = hasReviewed(danhGiaList, chiTiet.id_product._id, id_user, chiTiet.id_bill);

        if (coDanhGia) {
            daDanhGia.push(chiTiet);
        } else {
            chuaDanhGia.push(chiTiet);
        }
    });

    res.json({ daDanhGia, chuaDanhGia });
};
