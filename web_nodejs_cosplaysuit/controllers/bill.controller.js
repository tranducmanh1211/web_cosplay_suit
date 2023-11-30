var myMD = require('../models/cosplay_suit_model');

exports.getBillDone = async (req, res, next) => {
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
            .limit(limit);;
        res.render('navigation_view/quanlydonhang', { listTL: list, username: username, page_length: page_length, page: page });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Lỗi khi truy vấn dữ liệu từ MongoDB.');
    }
};

