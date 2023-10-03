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
    console.log(new_CMD);
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

exports.updateProduct = async (req, res, next) => {

    try {

        const addCM = await myMDD.tb_productModel.findById(req.params.id);

        addCM.id_shop=req.body.id_shop;
        addCM.id_category=req.body.id_category;
        addCM.nameproduct=req.body.nameproduct;
        addCM.price=req.body.price;
        addCM.amount=req.body.amount;
        addCM.image=req.body.image;
        addCM.description=req.body.description;
        addCM.time_product=req.body.time_product;
        
        const mtSave = await addCM.save();
        res.json(mtSave);
    } catch (error) {
        res.send(error)
        console.log(error);

    }

}
exports.delProduct = async (req, res, next) => {
    try {
        await myMDD.tb_productModel.findByIdAndDelete(req.params.id, req.body);
        res.send('Xoa thanh cong')
    } catch (error) {
        res.send('Error')
    }

}

