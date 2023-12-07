var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/logout', (req, res) => {
  // Xóa dữ liệu trong session
  req.session.destroy((err) => {
      if (err) {
          console.log(err);
      } else {
          console.log("User logged out");
      }
      res.redirect('/users');
  });
});
module.exports = router;
