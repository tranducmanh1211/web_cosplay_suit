var db = require('./db.model');
const mongoose = require("mongoose");

const tb_user = new db.mongoose.Schema(
    {
       
        phone: {type: String, require: true},
        email: {type: String, require: true},
        fullname:{type: String, require: true},
        passwd: {type: String, require: true},
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
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'}
    },
    {
        collection: 'shops'
    }
);

let tb_userModel = db.mongoose.model('tb_userModel', tb_user);
let tb_shopModel = db.mongoose.model('tb_shopModel', tb_shop);

module.exports = {tb_userModel,tb_shopModel};