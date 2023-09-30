var myMD = require('../../models/cosplau_suit_user_model');
var sk = require('../../socket_server');

var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.SendMess = async (req, res, next) => {

    var currentdate = new Date(); 
    var datetime = "" + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

    try {
        const chat = new myMD.tb_chatModel()
        chat.content = req.body.content;
        chat.date = datetime;
        chat.id_user= req.body.id_user;
        chat.id_shop = req.body.id_shop;

        let new_chat = await chat.save()
        sock.io.emit("new tt", "Đã có thêm truyện mới. Mời bạn vào đọc truyện");
        return res.status(201).json({ chat: new_chat })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}
// sk.io.emit("chat message", "tin nhắn mới ");