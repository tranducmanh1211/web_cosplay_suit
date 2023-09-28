var db = require('./db.model');
const mongoose = require("mongoose");


const tb_category = new db.mongoose.Schema(
    {
        name: {type: String, require: true},
        time_category : {type : String,require : true}
    },
    {
        collection: "categorys"
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
        description: {type:String, require: true},
        time_product : {type : String,require : true}
    },
    {
        collection: 'products'
    }
);

//tạo model
let tb_categoryModel = mongoose.model('categoryModel', tb_category);

let tb_productModel = db.mongoose.model('prodcutModel', tb_product);

module.exports = {tb_categoryModel,tb_productModel};