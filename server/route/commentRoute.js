const express = require('express');

const route = express.Router();

//internal import
const { getComment, postComment, incLike, deleteComment } = require('../controller/commentControlller');
const checkLogin = require('../middleware/common/checkLogin');
const upload = require('../utilities/commentUploader');

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

const bodyParseData = (req, res, next) => {
    const body = JSON.parse(req.body.text);
    
    req.body = body;
    //console.log(req.body);
    next();
}

route.get('/', getComment);
 route.post('/:id', checkLogin, upload.single('attachment'), bodyParseData, postComment);
route.patch('/:id/:mainId', checkLogin, incLike);
// route.delete('/:id', checkLogin, deleteStatus);

route.delete('/:id', checkLogin, deleteComment)

module.exports = route;

