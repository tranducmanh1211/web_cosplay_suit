var myMD = require('../../models/Bill.model');
var myDBshop = require('../../models/cosplau_suit_user_model');
var mydbproduct = require('../../models/cosplay_suit_model');

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
exports.getdskhach = async (req, res, next) => {
    //Lấy ds khach theo id_user
    const idshop = await myDBshop.tb_shopModel.findOne({id_user: req.params.id}).select('_id');
    
    // Tìm danh sách iduser theo idshop
    const cartlist = await myMD.tb_billModel.find({ id_shop: idshop }).select('id_user').lean();

    // Lấy danh sách iduser từ kết quả trên, loại bỏ giá trị trùng
    const idshoplist = new Set(cartlist.map(hd => String(hd.id_user)));
    const giaTriKhongTrungLap = [...idshoplist];

    //Lấy ds user từ ds không trùng
    const list = await myDBshop.tb_profileModel.find({id_user: { $in: giaTriKhongTrungLap }}).populate('id_user');

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
exports.upsoluongproduct = async(req, res, next) => {
    //Lấy danh sách từ trên app gửi về, idList phải đúng tên
    const idList = req.body;
    //lấy danh sách từ list trên
    const idlistcart = await myMD.tb_cartoderModel.find({_id: { $in: idList }}).select('id_product').lean();
    // Lấy danh sách idprodcut từ kết quả trên 
    const idshoplist = idlistcart.map(hd => hd.id_product);

    const listcart = await myMD.tb_cartoderModel.find({ _id: { $in: idList } });
    const listproduct = await mydbproduct.tb_productModel.find({ _id: { $in: idshoplist }});

    // Tính toán giảm số lượng cho các sản phẩm có id_properties và nameproperties giống nhau
    const updatedListProduct = listproduct.map(async product => {
        // Tìm thông tin tương ứng trong listcart
        const correspondingCartItem = listcart.find(cartItem => cartItem.id_product.equals(product._id));

        if (correspondingCartItem) {
            // Lặp qua listProp để kiểm tra id_properties và nameproperties
            product.listProp.forEach(prop => {
                const correspondingPropInCart = correspondingCartItem.id_properties === prop.nameproperties;
                
                if (correspondingPropInCart) {
                    // Trừ amount trong listProp từ amount trong tb_cartoder
                    prop.amount -= correspondingCartItem.amount;
                }
            });
            product.amount -= correspondingCartItem.amount;
            // product.sold += correspondingCartItem.amount;
        }
        let upsoluongproduct = await mydbproduct.tb_productModel.findByIdAndUpdate(product._id, product);
        return updatedListProduct;
    });
}

exports.upproductsl = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const nameproperties = req.body.nameproperties; // Giá trị của trường nameproperties cần cập nhật
        const newAmount = req.body.amount; // Giá trị mới cho trường amount

        // Lấy thông tin sản phẩm từ tb_productModel
        const existingProduct = await mydbproduct.tb_productModel.findByIdAndUpdate({_id: _id});
        existingProduct.amount -= newAmount;
        existingProduct.sold += newAmount;
        existingProduct.listProp.forEach(prop => {
            const correspondingPropInCart = nameproperties === prop.nameproperties;
            
            if (correspondingPropInCart) {
                prop.amount -= newAmount;
            }
        });
        const updatedProduct = await existingProduct.save();
        console.log(updatedProduct);

        return res.status(200).json({
            data: updatedProduct,
            stu: 1,
            msg: "Sửa thành công"
        });
    } catch (error) {
        console.error("Error in upproductsl:", error);
        return res.status(500).json({ stu: 0, msg: "Internal server error" });
    }
};



