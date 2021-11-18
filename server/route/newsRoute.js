const express = require('express');

const route = express.Router();

//internal import
const { getNews, postNews, deleteNews, getNewsbyId, editNews } = require('../controller/newsController');
const checkLogin = require('../middleware/common/checkLogin');
const upload = require('../utilities/newsCoverUpload');
const { newsValidation , checknewsValidation ,bodyParseData } = require('../middleware/news/newsValidation')

//check admin
const checkadmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next();
    } else{
        res.json({
            msg: 'muri khao'
        })
    }
}
route.get('/', getNews);
route.post('/', checkLogin, checkadmin, upload.single('avater'), bodyParseData,  newsValidation , checknewsValidation , postNews);
route.delete('/:id', checkLogin, checkadmin, deleteNews);
route.get('/:id',  getNewsbyId);

route.patch('/:id', checkLogin, checkadmin, upload.single('avater'), bodyParseData,  newsValidation , checknewsValidation , editNews);


module.exports = route;

