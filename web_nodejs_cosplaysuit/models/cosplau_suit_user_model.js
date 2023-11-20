var db = require('./db.model');
const mongoose = require("mongoose");

const tb_user = new db.mongoose.Schema(
    {
        image: {type:String,require:false},
        phone: {type: String, require: true},
        email: {type: String, require: true},
        fullname:{type: String, require: true},
        passwd: {type: String, require: true},
        role: {type: String, require: true},
    },
    {
        collection: 'User'
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


const tb_chat = new db.mongoose.Schema(
    {
        content: {type: String, require: true},
        date: {type: String, require: true},
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
        id_shop: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_shopModel'}
    },
    {
        collection: 'chat'
    }
);

const tb_favorite = new db.mongoose.Schema(
    {
        tb_user : {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
        tb_product : {type: db.mongoose.Schema.Types.ObjectId, ref: 'prodcutModel'}
    },
    {
        collection : 'favorite'
    }
);

const tb_profile = new db.mongoose.Schema(
    {
      
        phone: {type: String, require: false},
        diachi: {type: String, require: false},
        email: {type: String, require: false},
        fullname:{type: String, require: false},
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
  
    },
    {
        collection: 'Profile'
    }
);

let tb_profileModel = db.mongoose.model('tb_profileModel', tb_profile);
let tb_userModel = db.mongoose.model('tb_userModel', tb_user);
let tb_shopModel = db.mongoose.model('tb_shopModel', tb_shop);
let tb_chatModel = db.mongoose.model('tb_chatModel', tb_chat);

let tb_favoriteModel = db.mongoose.model('tb_favoriteModel',tb_favorite);


module.exports = {tb_userModel,tb_shopModel,tb_chatModel,tb_favoriteModel,tb_profileModel};