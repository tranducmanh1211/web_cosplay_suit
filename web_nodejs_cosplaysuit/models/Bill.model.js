var db = require('./db.model');
const mongoose = require("mongoose");

const tb_cartoder = new db.mongoose.Schema(
    {
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
        id_product: {type: db.mongoose.Schema.Types.ObjectId, ref: 'prodcutModel'},
        amount: {type: Number, require: true},
        totalPayment: {type: Number, require: true},
        id_properties : {type: String, require: true}
    },
    {
        collection: "cartorders"
    }
);

const tb_bill = new db.mongoose.Schema(
    {
        id_shop: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_shopModel'},
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
        timestart: {type: String, require: true},
        timeend: {type: String, require: true},
        ma_voucher: {type: String, require: true},
        status: {type: String, require: true},
        totalPayment: {type: Number, require: true}
    },
    {
        collection: 'bills'
    }
);

const tb_billdetails = new db.mongoose.Schema(
    {
        id_bill: {type: db.mongoose.Schema.Types.ObjectId, ref: 'bill'},
        id_product: {type: db.mongoose.Schema.Types.ObjectId, ref: 'prodcutModel'},
        amount: {type: Number, require: true},
        size: {type: String, require: true},
        totalPayment: {type: Number, require: true}
    },
    {
        collection: 'billdetails'
    }
);
const tb_thanhtoan = new db.mongoose.Schema(
    {
        id_bill: {type: db.mongoose.Schema.Types.ObjectId, ref: 'bill'},
        totalPayment: {type: Number, require: true},
        CardType: {type: String, require: true},
        vnp_BankTranNo: {type: String, require: true},
        vnp_BankCode: {type: String, require: true},
        vnp_OrderInfo: {type: String, require: true},
        vnp_PayDate: {type: String, require: true},
        vnp_TmnCode: {type: String, require: true},
        vnp_TxnRef: {type: String, require: true},
        vnp_SecureHash: {type: String, require: true}
    },
    {
        collection: 'thanhtoan'
    }
)

const tb_address = new db.mongoose.Schema(
    {
        id_bill: {type: db.mongoose.Schema.Types.ObjectId, ref: 'bill'},
        address: {type: String, require: true},
        phone: {type: String, require: true},
        fullname: {type: String, require: true}
    },
    {
        collection: 'address'
    }
)
//tạo model
let tb_cartoderModel = db.mongoose.model('cartoder', tb_cartoder);
let tb_billModel = db.mongoose.model('bill', tb_bill);
let tb_billdetailsModel = db.mongoose.model('billdetails', tb_billdetails);
let tb_thanhtoanModel = db.mongoose.model('billdetails', tb_thanhtoan);
let tb_addressModel = db.mongoose.model('billdetails', tb_address);


module.exports = {tb_cartoderModel,tb_billModel, tb_billdetailsModel, tb_thanhtoanModel, tb_addressModel};