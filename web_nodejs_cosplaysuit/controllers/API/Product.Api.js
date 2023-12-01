var myMDD = require('../../models/cosplay_suit_model');
const mongoose = require('mongoose');
var objReturn = {
    stu: 1,
    msg: 'ok'
}

var objReturn1 = {
    stu: 1,
    msg: 'ok'
}
exports.getlListSanPham = async (req, res, next) => {
    //lấy danh sách sản phẩm kèm theo tên thể loại
    var list = await myMDD.tb_productModel.find();

    res.send(list);
}
exports.getproductUser = async (req, res, next) => {
    let dieu_kien_loc = null;

    if (typeof req.params.id_shop !== 'undefined') {
        dieu_kien_loc = { id_shop: req.params.id_shop };
    }
    //lấy danh sách sản phẩm kèm theo tên thể loại
    var list = await myMDD.tb_productModel.find(dieu_kien_loc);

    res.send(list);
}
exports.AddProduct = async (req, res, next) => {

    let addCM = new myMDD.tb_productModel();
    addCM.id_shop = req.body.id_shop;
    addCM.id_category = req.body.id_category;
    addCM.nameproduct = req.body.nameproduct;
    addCM.price = req.body.price;
    addCM.amount = req.body.amount;
    addCM.image = req.body.image;
    addCM.listImage = req.body.listImage;
    addCM.listProp = req.body.listProp;
    addCM.description = req.body.description;
    addCM.size = req.body.size;
    addCM.status = req.body.status;
    addCM.sold = req.body.sold;
    addCM.time_product = req.body.time_product;
    let new_CMD = await addCM.save();
    console.log(new_CMD);
    try {
        if (new_CMD) {
            objReturn.data = addCM;
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
exports.AddProperties = async (req, res, next) => {

    let addCM = new myMDD.tb_propertiesModel();
    addCM.id_product = req.body.id_product;
    addCM.nameproperties = req.body.nameproperties;
    addCM.amount = req.body.amount;

    let new_CMD = await addCM.save();
    console.log(new_CMD);
    try {
        if (new_CMD) {
            objReturn.data = addCM;
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

exports.updateProduct = async (req, res, next) => {

    try {

        const addCM = await myMDD.tb_productModel.findById(req.params.id);

        addCM.id_shop = req.body.id_shop;
        addCM.id_category = req.body.id_category;
        addCM.nameproduct = req.body.nameproduct;
        addCM.price = req.body.price;
        addCM.amount = req.body.amount;
        addCM.image = req.body.image;
        addCM.listImage = req.body.listImage;
        addCM.listProp = req.body.listProp;
        addCM.description = req.body.description;
        addCM.size = req.body.size;
        addCM.status = req.body.status;
        addCM.sold = req.body.sold;
        addCM.time_product = req.body.time_product;

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
exports.getproperties = async (req, res, next) => {
    let dieu_kien_loc = null;
    if (typeof (req.params.id_product) != 'undefined') {
        dieu_kien_loc = { id_product: req.params.id_product };
    }
    var list = await myMDD.tb_propertiesModel.find(dieu_kien_loc);

    res.send(list);
}

exports.getlListImage = async (req, res, next) => {
    const truyen = await myMDD.tb_productModel.findById(req.params.id);

    let anhnd = truyen.listImage;

    try {
        if (anhnd) {
            objReturn.listImage = anhnd;
            objReturn.stu = 1;
            objReturn.msg = 'lấy ds thành công';
        } else {
            objReturn.stu = 0;
            objReturn.msg = 'không lấy được ds';
        }
    } catch (error) {
        objReturn.stu = 0;
        objReturn.msg = error.msg;
    }
    res.json(objReturn.listImage);
}


exports.productById = async (req, res, next) => {

    let pro = null;

    try {
        pro = await myMDD.tb_productModel.findOne({ _id: req.params.id });
        if (pro) {
            objReturn1.data = pro;
            objReturn1.stu = 1;
            objReturn1.msg = 'lấy ds thành công';
        } else {
            objReturn1.stu = 0;
            objReturn1.msg = 'không có dữ liệu'
        }
    } catch (error) {
        objReturn1.stu = 0;
        objReturn1.msg = error.msg;
    }


    res.json(objReturn1.data);

}

exports.getproductByIdShop = async (req, res, next) => {
    let dieu_kien_loc = null;

    if (typeof req.params.id_shop !== 'undefined') {
        dieu_kien_loc = { id_shop: req.params.id_shop };
    }
    var list = await myMDD.tb_productModel.find(dieu_kien_loc).limit(6);

    res.send(list);
}




exports.getproductByIdShopPage = async (req, res, next) => {
    let page = Number(req.params.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;


    let list1 = await myMDD.tb_productModel.find({ id_shop: req.params.id_shop });
    let page_length = Math.ceil(list1.length / limit);
    console.log("page",page);
    console.log("limit",limit);
    console.log("skip",skip);
    console.log("page_length",page_length);
    var list = await myMDD.tb_productModel.find({ id_shop: req.params.id_shop }).skip(skip)
    .limit(limit);

    res.json({
        dtoSanPham: list,
        page_length: page_length
    });
}

exports.getListProByIdCat = async (req, res, next) => {
    try {
        let idCat = req.params.id_category;

    
        var list = await myMDD.tb_productModel.aggregate([
            {
                $match: { id_category: new mongoose.Types.ObjectId(idCat) }
            },
            {
                $lookup: {
                    from: "comments", 
                    localField: "_id",
                    foreignField: "id_product",
                    as: "comments"
                }
            },
            {
                $project: {
                    _id: 1,
                    id_shop: 1,
                    id_category: 1,
                    nameproduct: 1,
                    price: 1,
                    amount: 1,
                    image: 1,
                    listImage: 1,
                    listProp: 1,
                    description: 1,
                    size: 1,
                    status: 1,
                    time_product: 1,
                    starCount: { $size: "$comments" }, 
                    totalStars: { $sum: "$comments.star" }, 
                    avgStars: { $avg: "$comments.star" } 
                }
            }
        ]);

        res.send(list);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};