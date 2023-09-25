var db = require('./db.model');
const mongoose = require("mongoose");
const tb_category = new db.mongoose.Schema(
    {
        name: {type: String, require: true},
    },
    {
        collection: "categorys"
    }
);

const tb_user = new db.mongoose.Schema(
    {
        username: {type: String, require: true},
        passwd: {type: String, require: true},
        phone: {type: Number, require: true},
        email: {type: String, require: true},
        fullname:{type: String, require: true},
        role: {type: String, require: true},
    },
    {
        collection: 'users'
    }
);

const tb_shop = new db.mongoose.Schema(
    {
        nameshop: {type: String, require: true},
        address: {type: String, require: true},
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tbchuyentranhModel'}
    },
    {
        collection: 'shops'
    }
);

const tb_product = new db.mongoose.Schema(
    {
        id_shop: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tbchuyentranhModel'},
        id_category: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tbchuyentranhModel'},
        nameproduct: {type: String, require: true},
        price: {type: Number, require: true},
        amount: {type: String, require: true},
        image: {type: String, require: true},
        description: {type:String, require: true}
    },
    {
        collection: 'products'
    }
);

//tạo model
let tb_categoryModel = mongoose.model('categoryModel', tb_category);
let tb_shopModel = db.mongoose.model('shopModel', tb_shop);
let tb_productModel = db.mongoose.model('prodcutModel', tb_product);
let tb_userModel = db.mongoose.model('userModel', tb_user);

module.exports = {tb_categoryModel};