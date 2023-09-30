var myMDD = require('../../models/cosplay_suit_model');

var objReturn = {
    stu: 1,
    msg: 'ok'
}
exports.getlListSanPham = async (req, res, next) => {
    //lấy danh sách sản phẩm kèm theo tên thể loại
    var list = await myMDD.tb_productModel.find();

    res.send(list);
}
exports.AddProduct = async (req, res, next) => {

    let addCM = new myMDD.tb_productModel();
        addCM.id_shop=req.body.id_shop;
        addCM.id_category=req.body.id_category;
        addCM.nameproduct=req.body.nameproduct;
        addCM.price=req.body.price;
        addCM.amount=req.body.amount;
        addCM.image=req.body.image;
        addCM.description=req.body.description;
        addCM.time_product=req.body.time_product;
    let new_CMD = await addCM.save();
    console.log(new_CM);
    try{
        if(new_CMD){
            objReturn.data = addCM;
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