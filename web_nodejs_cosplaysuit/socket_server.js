const io = require("socket.io")();

const chat = require('./controllers/API/chat.api');
const socketapi = {
io: io
};



io.on('connection', (socket) => {
    console.log('a user connected');
    console.log("Client connected : " + client.id);

    socket.on('chat message', (msg) => {
        
        chat.AddMess
        .then((message) => {
            io.emit('chat message', message);
        })
        .catch((err)=>{
            console.error("Error while saving message: ", err);
        })
        
        // dữ liệu từ app gửi lên
        console.log("chat msg: " + msg);
        //gửi phản hồi 
        socket.emit('chat message', "Server: " + msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



module.exports = socketapi;