var myMD = require('../models/Bill.model');
var myMDvitrunggian = require('../models/vitrunggian.model');

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

        //Tìm kiếm theo tên shop
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
        listDH = listDH.filter(bill => bill.id_thanhtoan &&
             bill.id_thanhtoan.vnp_CardType && 
             bill.id_thanhtoan.vnp_CardType.toLowerCase().includes('atm') &&
             bill.id_thanhtoan.status === 'NotDisbursed');

        if (listDH.length === 0) {
            return res.render('vitrunggian/thanhtoantruoc', { listDH: [], username: username, page_length: 1, page: 1 });
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
        listDH = listDH.filter(bill => bill.id_thanhtoan &&
            bill.id_thanhtoan.vnp_CardType && 
            bill.id_thanhtoan.vnp_CardType.toLowerCase().includes('atm') &&
            bill.id_thanhtoan.status === 'Disbursed');

        if (listDH.length === 0) {
            return res.render('vitrunggian/thanhtoansau', { listDH: [], username: username, page_length: 1, page: 1 });
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

        res.render('vitrunggian/thanhtoansau', { listDH: listDH, username: username, page_length: page_length, page: page });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Lỗi khi truy vấn dữ liệu từ MongoDB.');
    }
};
exports.getlichsuthuchien = async (req, res, next) => {
    try {
        let username = req.session.userU.fullname;
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 7;
        let skip = (page - 1) * limit;

        let nameShopCondition = {};
        if (req.query.fullname) {
            const keyword = req.query.fullname;
            const regex = new RegExp('.*' + keyword + '.*', 'i');
            nameShopCondition = { 'implementer.fullname': regex };
        }

        var listDH = await myMDvitrunggian.tb_transaction_historyModel.find({
            ...nameShopCondition
        })
        .populate({
            path: 'sender_wallet',
            model: 'walletModel',
            populate: {
                path: 'id_user',
                model: 'tb_userModel'
              }
        })
        .populate({
            path: 'receiver_wallet',
            model: 'walletModel',
            populate: {
                path: 'id_user', 
                model: 'tb_userModel'
              }
        })
        .populate({
            path: 'id_thanhtoan',  // Update the field to check for thanhtoan
            model: 'thanhtoan'
        }).populate({
            path: 'implementer',  // Update the field to check for thanhtoan
            model: 'tb_userModel'
        })
        .skip(skip)
        .limit(limit);
        console.log(listDH);
        // Tính đúng số lượng trang
        let page_length = Math.ceil(listDH.length / limit);

        // Kiểm tra nếu page vượt quá page_length, gán page bằng page_length
        if (page > page_length) {
            page = page_length;
        }

        res.render('vitrunggian/lichsuthuchien', { listDH: listDH, username: username, page_length: page_length, page: page });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Lỗi khi truy vấn dữ liệu từ MongoDB.');
    }
};
exports.giaingan = async (req, res, next) =>{
    try {
        let dieu_kien_loc = null;
        if (typeof (req.params.id_bill) != 'undefined') {
            dieu_kien_loc = { _id: req.params.id_bill};
        }
        //1.sửa số tiền của 2 bảng wallet

            //Tính số tiền thanh toán        
            let billw = await myMD.tb_billModel.findOne(dieu_kien_loc);
            const id_user = billw.id_user;
            const id_thanhtoan = billw.id_thanhtoan;
            const totalPaymentWithDiscount = billw.totalPayment;
            //sửa trạng thái của bảng thanh toán
            let suaPay = new myMD.tb_thanhtoanModel();

            const statusUpdate = { status: "Disbursed" };
            let thanhtoan = await myMD.tb_thanhtoanModel.findByIdAndUpdate(id_thanhtoan, statusUpdate, { new: true });
            console.log("thanhtoan", thanhtoan);

            if (billw) {
                const discountExists = billw.discount != null && !isNaN(parseFloat(billw.discount));
                if (discountExists) {
                    const discount = parseFloat(billw.discount);
                    totalPaymentWithDiscount = billw.totalPayment - (billw.totalPayment * (discount / 100));
                }
            }

            //tìm _id wallet của admin thực hiện sửa luôn
            let idwalletadmin = await myMDvitrunggian.tb_walletModel.findOne({id_user: "6561f52b685f243b220b498b"});
            const idWalletAdminString = idwalletadmin._id.toString();
            const moneyValueadmin = idwalletadmin.money; // Giá trị money từ trường database là chuỗi
            let suawalletadmin = new myMDvitrunggian.tb_walletModel();
                suawalletadmin.money -= totalPaymentWithDiscount;
            let a2= await myMDvitrunggian.tb_walletModel.findByIdAndUpdate(idWalletAdminString, { money: moneyValueadmin - totalPaymentWithDiscount }, req.body);
            console.log("a2"+a2);

            //tìm _id wallet của selman thực hiện sửa luôn
            let idwalletselman = await myMDvitrunggian.tb_walletModel.findOne({id_user: id_user});
            const idWalletselmanString = idwalletselman._id.toString();
            const moneyValueselman = parseFloat(idwalletselman.money);
            let suawalletselman = new myMDvitrunggian.tb_walletModel();
                suawalletselman.money += totalPaymentWithDiscount;
            let a3 = await myMDvitrunggian.tb_walletModel.findByIdAndUpdate(idWalletselmanString, { money: moneyValueselman + totalPaymentWithDiscount }, req.body);
            console.log("a3"+a3);

        //2. thêm bảng lịch sử giao dịch
        let add = new myMDvitrunggian.tb_transaction_historyModel();
            const idthanhtoan = suaPay._id;
            add.id_thanhtoan = idthanhtoan;
            //người gửi
            add.sender_wallet = idWalletAdminString;
            //người nhận
            add.receiver_wallet = idWalletselmanString;
            add.status = "Thành công";
            //người thực hiện
            let username = req.session.userU._id;
            add.implementer = username;
            //thêm số tiền giao dịch
            add.transaction_amount = totalPaymentWithDiscount;
            //thêm ngày giờ hiện tại
            const currentTime = new Date();

            const day = currentTime.getDate();
            const month = currentTime.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
            const year = currentTime.getFullYear();
            
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();
            
            // Định dạng thành dd/mm/yyyy hh/mm/ss
            const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            
            add.time_transaction = formattedTime;
            
        await add.save();
        // res.render('vitrunggian/thanhtoantruoc');
        res.status(200).json({ success: true, message: 'Giao dịch thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra' });
    }
}