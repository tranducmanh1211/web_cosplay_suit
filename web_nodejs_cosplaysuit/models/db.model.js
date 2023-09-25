const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://nguyenchamdut:lvC1Kanh5ygnYaHS@cluster0.chnbv9i.mongodb.net/?retryWrites=true&w=majority")
.catch((err) => {
    console.log("Lỗi kết nối csdl");
    console.log(err);
});
module.exports = {mongoose};