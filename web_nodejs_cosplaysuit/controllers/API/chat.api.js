var myMD = require('../../models/cosplau_suit_user_model');
var sk = require('../../socket_server');

var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.SendMess = async (req, res, next) => {
    const { id_user, id_shop, content,date } = req.body;

    try {
        const newMessage = new myMD.tb_chatModel({
            id_user,
            id_shop,
            content,
            date
        });

        const savedMessage = await newMessage.save();
       
        sk.io.to(id_shop).emit("receive_message",savedMessage);
       
        res.status(201).json(savedMessage);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message }) 
    }

}
