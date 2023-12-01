var myMD = require('../models/cosplay_suit_model');

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://duantotnghiepcosplaysuit.appspot.com',
});

const bucket = admin.storage().bucket();
const multer = require('multer');
const upload = multer().single('imageCategory');
const upload1 = multer().single('imageCategoryChuong');


exports.gettheloai = async (req, res, next) => {
    let username = req.session.userU.fullname;
    let dieu_kien_loc = null;
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    if (typeof req.query.name !== 'undefined') {
        const keyword = req.query.name;
        const regex = new RegExp('.*' + keyword + '.*', 'i');
        dieu_kien_loc = { name: regex };
    }

    try {
        var list = await myMD.tb_categoryModel.find(dieu_kien_loc)
        let page_length = Math.ceil(list.length / limit);

        var list = await myMD.tb_categoryModel.find(dieu_kien_loc).skip(skip)
            .limit(limit);
        res.render('navigation_view/quanlytheloai', { listTL: list, username: username, page_length: page_length, page: page });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Lỗi khi truy vấn dữ liệu từ MongoDB.');
    }
};

exports.addTL = async (req, res, next) => {

    let username = req.session.userU.fullname;

    upload(req, res, async function (err) {
        if (err) {
            console.error(err);
            return res.send('Lỗi khi xử lý dữ liệu form.');
        }

        try {
            if (req.method == 'POST') {
                const file = req.file;
                if (!file) {
                    return res.status(400).send('Vui lòng chọn một file ảnh.');
                }

                const imageName = `${Date.now()}_${file.originalname}`;
                const imageFile = bucket.file(imageName);
                const stream = imageFile.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });

                stream.on('error', (error) => {
                    console.error(error);
                    return res.status(500).send('Lỗi khi tải lên ảnh.');
                });

                stream.on('finish', async () => {

                    const [url] = await imageFile.getSignedUrl({ action: 'read', expires: '01-01-3000' });

                    var currentdate = new Date();
                    var datetime =
                        currentdate.getDate() +
                        '/' +
                        (currentdate.getMonth() + 1) +
                        '/' +
                        currentdate.getFullYear() +
                        ' ' +
                        currentdate.getHours() +
                        ':' +
                        currentdate.getMinutes();

                    let obj = new myMD.tb_categoryModel();
                    obj.name = req.body.name;
                    obj.time_category = datetime;
                    obj.imageCategory = url;

                    try {
                        let new_sp = await obj.save();
                        console.log(new_sp);

                        const currentPage = req.query.page || 1;

                        res.redirect(`/category/getCategory?page=${currentPage}`);
                    } catch (error) {
                        console.error(error);
                        return res.status(500).send('Lỗi khi lưu vào MongoDB.');
                    }
                });

                stream.end(file.buffer);
            } else {
                var list = await myMD.tb_categoryModel.find();
                res.render('navigation_view/quanlytheloai', { listTL: list, username: username });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Lỗi khi xử lý dữ liệu.');
        }
    });
};

exports.delTL = async (req, res, next) => {
    let idTL = req.params.idTL;
    console.log(`Deleting category with ID: ${idTL}`);

    try {
        await myMD.tb_categoryModel.findByIdAndDelete(idTL, req.body);
        console.log(`Category with ID ${idTL} deleted successfully.`);
        console.log(`Deleting category with ID: ${idTL}`);
        const result = await myMD.tb_categoryModel.findByIdAndDelete(idTL, req.body);
        console.log(result);

        const currentPage = req.query.page || 1;
        res.redirect(`/category/getCategory?page=${currentPage}`);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Lỗi khi xóa dữ liệu.');
    }
};

exports.editTL = async (req, res, next) => {
    let idTL = req.params.idTL;
    upload1(req, res, async function (err) {
        if (err) {
            console.error(err);
            return res.send('Lỗi khi xử lý dữ liệu form.');
        }
        try {
            let objTL = await myMD.tb_categoryModel.findById(idTL);
            console.log("manh: ",objTL.name);    
            if (req.method === 'POST') {
                const newName = req.body.name;

                // Nếu có file ảnh được chọn
                if (req.file) {
                    const file = req.file;
                    console.log("manh:", file);
                    const imageName = `${Date.now()}_${file.originalname}`;
                    const imageFile = bucket.file(imageName);
                    const stream = imageFile.createWriteStream({
                        metadata: {
                            contentType: file.mimetype,
                        },
                    });

                    stream.on('error', (error) => {
                        console.error(error);
                        return res.status(500).send('Lỗi khi tải lên ảnh.');
                    });

                    stream.on('finish', async () => {
                        const [url] = await imageFile.getSignedUrl({ action: 'read', expires: '01-01-3000' });
                        objTL.name = newName;
                        objTL.imageCategory = url;
                        await objTL.save();

                        const currentPage = req.query.page || 1;
                        res.redirect(`/category/getCategory?page=${currentPage}`);
                    });

                    stream.end(file.buffer);
                } else {
                    // Nếu không có file ảnh, chỉ cập nhật tên
                    objTL.name = newName;
                    await objTL.save();

                    const currentPage = req.query.page || 1;
                    res.redirect(`/category/getCategory?page=${currentPage}`);
                }
            } else {
                // Nếu không phải là phương thức POST, chỉ render template
                res.render('navigation_view/quanlytheloai', { objTL: objTL });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Lỗi khi xử lý dữ liệu.');
        }
    });
};