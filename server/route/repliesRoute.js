const express = require('express');

const route = express.Router();

//internal import
const {
  getreplies,
  postreplies,
  incLike,
  deletereplies,
  getrepliesById,
  editreplies,
} = require("../controller/repliesController");
const checkLogin = require("../middleware/common/checkLogin");

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

const upload = require('../utilities/replyUploader');

const bodyParseData = (req, res, next) => {
    const body = JSON.parse(req.body.text);
    
    req.body = body;
    //console.log(req.body);
    next();
}

route.get('/', getreplies);
route.get('/:id', getrepliesById);
route.post('/:id/:statusId', checkLogin, upload.single('attachment'), bodyParseData, postreplies);
route.patch('/:id/:mainId', checkLogin, incLike);
// route.delete('/:id', checkLogin, deleteStatus);
route.put('/:statusId/:commentId/:id', checkLogin, upload.single('attachment'), bodyParseData, editreplies);
route.delete('/:statusId/:commentId/:id', checkLogin, deletereplies);


module.exports = route;

