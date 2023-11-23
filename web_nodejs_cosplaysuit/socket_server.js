const io = require("socket.io")();

const socketapi = {
    io: io
};
var myMD = require('./models/cosplau_suit_user_model');


io.on('connection', (socket) => {

    console.log("Client connected : " + socket.id);

    socket.on('join', (room) => {
        socket.join(room);
    });

    socket.on('send_message', async (msg) => {
        console.log('Received:', msg);

        const newMessage = new myMD.tb_chatModel({
            id_user: msg.id_user,
            id_shop: msg.id_shop,
            content: msg.content,
            date: msg.date
        });

        const savedMessage = await newMessage.save();

        socket.broadcast.to(msg.id_shop).emit('receive_message', savedMessage);

        //   socket.broadcast.emit (gửi dữ liệu cho tất cả client trong room trừ người gửi)
    });

    socket.on('new msg', async (msg) => {
        console.log('Received:', msg);

        client.on('new msg',(data)=>{
            //nhận dữ liệu từ client gửi lên
            console.log("New msg: "+data);
            //gửi phản hồi
            client.emit('new msg', "Server đã nhận rồi nè: "+data);
        });
    

        //   socket.broadcast.emit (gửi dữ liệu cho tất cả client trong room trừ người gửi)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



module.exports = socketapi;