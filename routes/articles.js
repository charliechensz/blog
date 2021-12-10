var express = require('express');
var router = express.Router();
var models = require('../models')

/* 显示所有记录 */
router.get('/', function (req, res, next) {
  models.Article.findAll({
    order: [
      ['title', 'DESC'],
      ['id', 'DESC'],
    ]
  }).then(articles => {
    res.json({ articles: articles })
  })
});

// Create 新增一条记录 by req.body ()
router.post('/', async function (req, res, next) {
  var article = await models.Article.create(
    // { title: "IT培训", content: "长乐教育" }
    req.body
  )
  res.json({ article: article })
})

// Retrieve 搜索一条记录 by id, Pk ( Primary Key )
router.get('/:id', async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id)
  res.json({ article: article })
})

// Update 更新一条记录 by id, Pk ( Primary Key )
router.put('/:id', async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id)
  article.update(req.body)
  res.json({ article: article })
})

// Delete 删除一条记录 by id, Pk ( Primary Key )
router.delete('/:id', async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id);
  console.log('article : ', article)
  // if ('undefined' != typeof article) {
  if (article != null) {
    article.destroy()   // 记录不存在是会出错， article==null。
  } else {
    console.log(req.params.id, '不存在，删除失败。')
  }
  res.json({ msg: req.params.id + '已经删除' });
})

module.exports = router;
