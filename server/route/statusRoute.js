const express = require('express');
const multer = require('multer');

const route = express.Router();

//internal import
const {
  getStatus,
  postStatus,
  incLike,
  deleteStatus,
  getStatusById,
  deleteAttchment,
  givePoint,
  editStatus
} = require("../controller/statusController");
const checkLogin = require('../middleware/common/checkLogin');

const upload = require('../utilities/statusUploader');

//console.log(`${__dirname}/../clint/public/statusUpload`)

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
    //console.log(point);
    next();
}

route.get('/', getStatus);
route.get('/x/:id', getStatusById);
route.post('/', checkLogin, upload.array('statusAttachment', 5), bodyParseData, postStatus);
route.patch('/:id/:mainId', checkLogin, incLike);
route.delete('/:id', checkLogin, deleteStatus);
route.delete('/delete/:id/:image', checkLogin, deleteAttchment);

route.patch('/givepoint/:statusUserId/:commentUserId', checkLogin, givePoint);

route.put('/:id', checkLogin, editStatus);

module.exports = route;

