var db = require('./db.model');
const mongoose = require("mongoose");
const cosplay_user = require('./cosplau_suit_user_model');

const tb_category = new db.mongoose.Schema(
    {
        name: { type: String, require: true },
        imageCategory: { type: String },
        time_category: { type: String, require: true }
    },
    {
        collection: "categorys"
    }
);

const tb_product = new db.mongoose.Schema(
    {
        id_shop: { type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_shopModel' },
        id_category: { type: db.mongoose.Schema.Types.ObjectId, ref: 'categoryModel' },
        nameproduct: { type: String, require: true },
        price: { type: Number, require: true },
        amount: { type: Number, require: true },
        image: { type: String, require: true },
        listImage: { type: Array, require: true },
        listProp: { type: Array, require: true },
        description: { type: String, require: true },
        size: { type: String, require: true },
        status: { type: Boolean, require: true },
        sold: { type: Number, require: true },
        time_product: { type: String, require: true }
    },
    {
        collection: 'products'
    }
);

const tb_properties = new db.mongoose.Schema(
    {
        nameproperties: { type: String, require: true },
        amount: { type: String, require: true }
    },
    {
        collection: 'properties'
    }

);

const tb_comments = new db.mongoose.Schema(
    {
        id_product: { type: db.mongoose.Schema.Types.ObjectId, ref: 'prodcutModel' },
        id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel' },
        content: { type: String, require: true },
        time: { type: String, require: true },
        image: { type: Array },
        star: { type: Number, require: true },
        id_bill: { type: db.mongoose.Schema.Types.ObjectId, ref: 'bill' }
    },
    {
        collection: 'comments'
    }
);
const tb_voucher = new db.mongoose.Schema(
    {
        id_shop: { type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_shopModel' },
        discount: { type: String, require: true },
        amount: { type: String, require: true },
        content: { type: String, require: true }
    },
    {
        collection: 'voucher'
    }
);

const tb_seen_voucher = new db.mongoose.Schema(
    {
        id_voucher: { type: db.mongoose.Schema.Types.ObjectId, ref: 'voucherModel'},
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
        amount : {type : String,require : true}
    },
    {
        collation : "seenVoucher"
    }
)

//tạo model
let tb_commentsModel = db.mongoose.model('commentsModel', tb_comments);
let tb_categoryModel = db.mongoose.model('categoryModel', tb_category);
let tb_productModel = db.mongoose.model('prodcutModel', tb_product);
let tb_propertiesModel = db.mongoose.model('properties', tb_properties);
let tb_voucherModel = db.mongoose.model('voucherModel', tb_voucher);

module.exports = { tb_categoryModel, tb_productModel, tb_propertiesModel, tb_commentsModel, tb_voucherModel };