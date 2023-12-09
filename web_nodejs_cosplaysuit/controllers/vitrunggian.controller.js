var myMD = require('../models/Bill.model');

// Hàm định dạng số tiền
function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

function formatPrice(price) {
    return formatCurrency(price);
}

exports.getHome = async (req, res, next) => {
    try {
        let username = req.session.userU.fullname;
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 7;
        let skip = (page - 1) * limit;

        let nameShopCondition = {};
        if (req.query.nameShop) {
            const keyword = req.query.nameShop;
            const regex = new RegExp('.*' + keyword + '.*', 'i');
            nameShopCondition = { 'id_shop.nameshop': regex };
        }

        var listDH = await myMD.tb_billModel.find({
            status: "Done",
            ...nameShopCondition
        })
        .populate({
            path: 'id_shop',
            model: 'tb_shopModel'
        })
        .populate({
            path: 'id_user',
            model: 'tb_userModel'
        })
        .populate({
            path: 'id_thanhtoan',  // Update the field to check for thanhtoan
            model: 'thanhtoan'
        })
        .skip(skip)
        .limit(limit);

        if (listDH.length === 0) {
            return res.render('navigation_view/quanlydonhang', { listDH: [], username: username, page_length: 1, page: 1 });
        }

        const totalBillDetailsArray = await Promise.all(
            listDH.map(async (bill) => {
                const countBillDetails = await myMD.tb_billdetailsModel.countDocuments({ id_bill: bill._id });
                return countBillDetails;
            })
        );

        // Thêm trường kiểm tra thanh toán khi nhận hàng dưới dạng chuỗi và định dạng số tiền
        listDH = listDH.map((bill, index) => {
            const paymentMethod = bill.id_thanhtoan ? "Thanh toán bằng VNPay" : "Thanh toán khi nhận hàng";
            return {
                ...bill._doc,
                totalBillDetails: totalBillDetailsArray[index],
                paymentMethod: paymentMethod,
                totalPaymentFormatted: formatPrice(bill.totalPayment),
            };
        });

        // Tính đúng số lượng trang
        let page_length = Math.ceil(totalBillDetailsArray.length / limit);

        // Kiểm tra nếu page vượt quá page_length, gán page bằng page_length
        if (page > page_length) {
            page = page_length;
        }

        res.render('vitrunggian/thanhtoantruoc', { listDH: listDH, username: username, page_length: page_length, page: page });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Lỗi khi truy vấn dữ liệu từ MongoDB.');
    }
};
exports.getthanhtoansau = async (req, res, next) => {
    res.render('thanhtoansau');
};
exports.getlichsuthuchien = async (req, res, next) => {
    res.render('lichsuthuchien');
};