const express = require('express');

const route = express.Router();

//internal import
const { getStatus, postStatus, incLike, deleteStatus } = require('../controller/statusController');
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
route.get('/', getStatus);
route.post('/', checkLogin, postStatus);
route.patch('/:id/:mainId', checkLogin, incLike);
route.delete('/:id', checkLogin, deleteStatus);

module.exports = route;

