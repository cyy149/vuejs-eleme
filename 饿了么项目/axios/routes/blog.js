var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //返回json数据即可
  let blog = require('../blog.json');
  res.json(blog);
});

module.exports = router;
