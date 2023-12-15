var db = require('./db.model');
const mongoose = require("mongoose");

const tb_transaction_history = new db.mongoose.Schema(
    {
        id_bill: { type: db.mongoose.Schema.Types.ObjectId, ref: 'bill' },
        sender_wallet: { type: db.mongoose.Schema.Types.ObjectId, ref: 'walletModel' },
        receiver_wallet: { type: db.mongoose.Schema.Types.ObjectId, ref: 'walletModel' },
        status: { type: String, require: true },
        transaction_amount: { type: String, require: true },
        implementer: { type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel'},
        time_transaction: { type: String ,require: true},
    },
    {
        collection: "transaction_history"
    }
);
const tb_wallet = new db.mongoose.Schema(
    {
        id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: 'tb_userModel' },
        money: { type: String ,require: true },
        currency: { type: String, require: true },
        passwd: { type: String, require: true }
    },
    {
        collection: "wallets"
    }
);
const tb_banklink = new db.mongoose.Schema(
    {
        id_wallet: { type: db.mongoose.Schema.Types.ObjectId, ref: 'walletModel' },
        account_number: { type: String, require: true },
        card_type: { type: String ,require: true }
    },
    {
        collection: "backlink"
    }
);

//tạo model
let tb_banklinkModel = db.mongoose.model('banklinkModel', tb_banklink);
let tb_walletModel = db.mongoose.model('walletModel', tb_wallet);
let tb_transaction_historyModel = db.mongoose.model('transaction_historyModel', tb_transaction_history);
module.exports = { tb_banklinkModel, tb_walletModel, tb_transaction_historyModel};