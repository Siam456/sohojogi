const { check, validationResult } = require('express-validator');

const fs = require('fs');
const path = require('path');

const bodyParseData = (req, res, next) => {
    const body = JSON.parse(req.body.user);
    
    req.body = body;
    //console.log(req.body);
    next();
}
//console.log(data);


const newsValidation = [
    check('title')
        .isLength({min: 1})
        .withMessage("Title is required")
        .trim(),
    check('content')
        .isLength({min: 1})
        .withMessage("content is required")
        .trim(),
    check('description')
        .isLength({min: 1})
        .withMessage("description is required")
        .trim(),

]

const checknewsValidation = (req, res, next) => {
    
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    //console.log(mappedErrors)
    if(Object.keys(mappedErrors).length === 0){
        next()
    } else{
        
        if(req.file){
            //console.log(path.join(__dirname, '..' , '..' , '..', `public/userUpload/`)) `${__dirname}/../../clint/public/newsCover/${req.file.filename}`
            const delPath = `${__dirname}/../../clint/public/newsCover/${req.file.filename}`
            fs.unlinkSync(delPath);
            res.status(500).json({
                errors: mappedErrors,
            })
            
        } else{
            res.status(500).json({
                errors: mappedErrors,
            })
        }
    }
}

module.exports = { newsValidation , checknewsValidation ,bodyParseData }