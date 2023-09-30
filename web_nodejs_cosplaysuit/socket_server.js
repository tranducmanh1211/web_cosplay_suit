const io = require("socket.io")();

const socketapi = {
io: io
};
var myMD = require('./models/cosplau_suit_user_model');


io.on('connection',  (socket) => {
    console.log('a user connected');
    console.log("Client connected : " + socket.id);

    socket.on('receive_message', async (msg) => {

        const { id_user, id_shop, content,date } = msg;
        const newMessage = new myMD.tb_chatModel({
            id_user,
            id_shop,
            content,
            date
          });
      
          const savedMessage = await newMessage.save();
      
          io.emit('receive_message', savedMessage);
          console.log("chat ",msg);
        //   socket.broadcast.emit (gửi dữ liệu cho tất cả client trừ người gửi)
        // dữ liệu từ app gửi lên
        console.log("chat msg: " + msg);
     
        //gửi phản hồi 
        socket.emit('receive_message', "Server: " + msg);
    });

    // socket.on('receive_message', function(data){
    //     console.log('Received:', data);
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



module.exports = socketapi;