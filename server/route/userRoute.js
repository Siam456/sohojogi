const express = require('express');


const route = express.Router();

//internal import
const checkLogin = require('../middleware/common/checkLogin')


const { getUser
        ,postUser,
        editUser,
        deleteUser,
        getSeller,
        getUserById,
        getprofileById,
        coverUploder,
        deleteCover,
        coverUpdate,
        addAccount,
        deleteAccount,
        profilePicUploder,
        addBio,
        editBio,
        deleteBio
     } = require('../controller/userController');
const upload = require('../utilities/singleFileUpload');
const coverUploader = require('../utilities/userCoverPhotoUploader');

const { userValidation , checkUserValidation , bodyParseData } = require('../middleware/user/userValidation');

const { editUserValidation , checkEditUserValidation ,bodyParseDataEdit } = require('../middleware/user/editUserValidator')



route.get('/', checkLogin, getUser);
route.post('/', upload.single('avater'), bodyParseData, userValidation, checkUserValidation, postUser);
route.put('/:id',checkLogin, upload.single('avater'), bodyParseDataEdit, editUserValidation, checkEditUserValidation, editUser);

route.post('/rq', upload.any(), bodyParseData, postUser);
route.delete('/:id',checkLogin, deleteUser);

route.get('/seller', getSeller);
route.get('/shop/:id', getUserById);
route.get('/:id', getprofileById);

route.post('/cover/:id', checkLogin, coverUploader.single('avater'),  coverUploder);
route.delete('/cover/:id',checkLogin, deleteCover);
route.patch('/cover/:id', checkLogin, coverUploader.single('avater'),  coverUpdate);

route.put('/account/:id', checkLogin,  addAccount);
route.delete('/account/:id/:acname', checkLogin,  deleteAccount);

//update profile pic
route.post('/profilepic/:id', checkLogin, upload.single('avater'),  profilePicUploder);

//update bio
route.post('/addbio/:id', checkLogin, addBio);
route.patch('/bio/:id', checkLogin, editBio);
route.delete('/bio/:id', checkLogin, deleteBio);







module.exports = route;