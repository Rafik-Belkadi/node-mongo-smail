var router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const upload = require('../middlewares/upload')


router.route('/articles').get(ArticleController.getAllArticles)
    .post(upload.single('photo'), ArticleController.postArticle)
// upload.single() viens avant le midlleware pour poster un article
router.route('/articles/:id').get(ArticleController.getArticleById)


module.exports = router