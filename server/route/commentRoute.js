const express = require('express');

const route = express.Router();

//internal import
const { getComment, postComment, incLike } = require('../controller/commentControlller');
const checkLogin = require('../middleware/common/checkLogin');

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
route.get('/', getComment);
 route.post('/:id', checkLogin, postComment);
route.patch('/:id/:mainId', checkLogin, incLike);
// route.delete('/:id', checkLogin, deleteStatus);

module.exports = route;

