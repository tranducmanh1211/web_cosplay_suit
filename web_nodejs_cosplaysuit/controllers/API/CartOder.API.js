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
exports.AddCartOder = async (req, res, next) => {

    let add = new myMD.tb_cartoderModel();
        add.id_user = req.body.id_user;
        add.id_product = req.body.id_product;
        add.amount = req.body.amount;
        add.properties = req.body.properties; 
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

