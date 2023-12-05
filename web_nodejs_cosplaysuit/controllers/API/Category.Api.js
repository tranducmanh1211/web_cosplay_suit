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

    var list = await myMD.tb_categoryModel.find();

    res.send(list);
}
exports.getCategoryCtsp = async (req, res, next) => {

    let dieu_kien_loc = {};

    if (typeof req.params._id !== 'undefined') {
        dieu_kien_loc.id = req.params._id;
    }

    var list = await myMD.tb_categoryModel.findOne(dieu_kien_loc);

    res.send(list);
}