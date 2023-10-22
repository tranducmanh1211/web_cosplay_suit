var myMD = require('../../models/Bill.model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.getCartOder = async (req, res, next) => {
    //lấy danh sách sản phẩm kèm theo tên thể loại
    var list = await myMD.tb_cartoderModel.find();

    res.send(list);
}

exports.getUserCartOder = async (req, res, next) => {
    //Lấy ds giỏ hàng theo id_user
    let dieu_kien_loc = null;
    if (typeof (req.params.id_user) != 'undefined') {
        dieu_kien_loc = { id_user: req.params.id_user};
    }
    var list = await myMD.tb_cartoderModel.find(dieu_kien_loc).populate('id_user');

    res.send(list);
}

exports.AddCartOder = async (req, res, next) => {

    let add = new myMD.tb_cartoderModel();
        add.id_user = req.body.id_user;
        add.product_id = req.body.product_id;
        add.amount = req.body.amount;
        add.properties_id = req.body.properties_id; 
    let new_CMD = await add.save();
    console.log(new_CMD);
    try{
        if(new_CMD){
            objReturn.data = add;
            objReturn.stu = 1;
            objReturn.msg = "Thêm thành công"
        }else{
            objReturn.stu = 0;
            objReturn.msg = "Thêm thất bại"
        }
    }catch(error){
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }

    res.json(objReturn);
}

exports.updateCartOder = async (req, res, next) => {
    let id = req.params.id;

    let sua = new myMD.tb_cartoderModel();
        sua.amount = req.body.amount;
        sua.properties = req.body.properties; 

    let newcart = await myMD.tb_cartoderModel.findByIdAndUpdate(id, req.body);
        try{
            if(newcart){
                objReturn.data = newcart;
                objReturn.stu = 1;
                objReturn.msg = "Sửa thành công"
            }else{
                objReturn.stu = 0;
                objReturn.msg = "Sửa thất bại"
            }
        }catch(error){
            objReturn.stu = 0;
            objReturn.msg = error.msg;
        }
    res.json(objReturn);
}

exports.deleteCartOder = async (req, res, next) => {
    let deletecart = await myMD.tb_cartoderModel.findByIdAndDelete(req.params.id, req.body);
    console.log(deletecart);
    try {
        if(deletecart){
            objReturn.data = deletecart;
            objReturn.stu = 1;
            objReturn.msg = 'Xóa thành công';
        }else{
            objReturn.stu = 0;
            objReturn.msg = "Xóa thất bại";
        }
    } catch (error) {
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }
    res.json(objReturn);

}

