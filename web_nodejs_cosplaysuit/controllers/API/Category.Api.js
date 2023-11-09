var myMD = require('../../models/cosplay_suit_model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.AddCategory = async (req, res, next) => {

    let addCm = new myMD.tb_categoryModel();
    addCm.name = req.body.name;
    let new_cm = await addCm.save();
    console.log(new_cm);
    try {
        if (new_cm) {
            objReturn.data = addCm;
            objReturn.stu = 1;
            objReturn.msg = "Thêm thành công"
        } else {
            objReturn.stu = 0;
            objReturn.msg = "Thêm thất bại"
        }
    } catch (error) {
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }

    res.json(objReturn);
}
exports.getCategory = async (req, res, next) => {
    //lấy danh sách sản phẩm kèm theo tên thể loại
    var list = await myMD.tb_categoryModel.find();

    res.send(list);
}