const express = require('express');
const { createArticle, updateArticle, getArticles,deleteArticle} = require('../controllers/articleController');
const router = express.Router();

router.post('/createArticle', createArticle);
router.put('/updateArticle/:id', updateArticle);
router.get('/getArticles', getArticles);
router.delete('/deleteArticle/:id',deleteArticle);

module.exports = router;
