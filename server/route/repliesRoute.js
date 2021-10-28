const express = require('express');

const route = express.Router();

//internal import
const { getreplies, postreplies , incLike } = require('../controller/repliesController');
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
route.get('/', getreplies);
route.post('/:id', checkLogin, postreplies);
route.patch('/:id/:mainId', checkLogin, incLike);
// route.delete('/:id', checkLogin, deleteStatus);

module.exports = route;

