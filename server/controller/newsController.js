const newsModel = require('../model/newsModel');
const fs = require('fs');
const getNews = async (req, res) => {
    try{
        const news = await newsModel.find({}).populate('author').sort({createdAt: -1});
        if(news){
            res.json({
                news,
            });
        } else{
            res.status(404).json({
                errors: {
                    msg: 'not available',
                }
            })
        }

    } catch(err){
        console.log(err.message);
    }
}

const getNewsbyId = async (req, res) => {
    //console.log(req.params.id)
    try{
        const response = await newsModel.findByIdAndUpdate({_id: req.params.id},
            {
                $inc: { views: 1, "metrics.orders": 1 }
            });
            
        const news = await newsModel.find({_id: req.params.id}).populate('author')
        if(news){
            res.json({
                news,
            });
        } else{
            res.status(404).json({
                errors: {
                    msg: 'not available',
                }
            })
        }

    } catch(err){
        console.log(err.message);
    }
}

const postNews = async (req, res) => {
    //console.log(req.body)
    //console.log(req.user)
    try{
        if(req.file){
            const user = new newsModel({
                ...req.body,
                newsCoverPhoto: req.file.filename,
                author: req.user._id,
            });
    
            const response = await user.save();
            res.json({
                msg: 'news post added successfully',
            });
        } else{
            const user = new newsModel({
                ...req.body,
                author: req.user._id,
            });
    
            const response = await user.save();
            res.json({
                msg: 'news post added added successfully',
            });
        }
        

    } catch(err){
        console.log(err.message)
    }
}

const editNews = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body);
    // console.log(req.file)
    try{
        if(req.file){
            const response = await newsModel.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        description: req.body.description,
                        newsCoverPhoto: req.file.filename,
                        catagory: req.body.catagory,
                    }
                });
                const delPath = `${__dirname}/../clint/public/newsCover/${response.newsCoverPhoto}`
                fs.unlinkSync(delPath);
                res.json({
                    news: response,
                    msg: 'news Update successfully',
                })


        } else{
            const response = await newsModel.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        description: req.body.description,
                        catagory: req.body.catagory,
                    }
                });
                res.json({
                    news: response,
                    msg: 'news Update successfully',
                })

        }

    } catch(err){
        res.status(500).json({
            err: err.message,
        })
    }
}

const deleteNews = async (req, res) => {
    //console.log(req.params.id)
    try{
        //console.log(__dirname)
        const response = await newsModel.findByIdAndDelete({_id: req.params.id});
        
        if(response.newsCoverPhoto){
            //console.log(response.newsCoverPhoto);
            //const delPath = `${__dirname}/../clint/public/newsCover/${response.newsCoverPhoto}`;
            //console.log(`${__dirname}/../clint/public/newsCover/${response.newsCoverPhoto}`)
            fs.unlinkSync(`${__dirname}/../clint/public/newsCover/${response.newsCoverPhoto}`);
        }
        if(response){
            res.json({
                response,
            })
        } else{
            res.status(404).json({
                err: 'not found',
            })
        }

    } catch(err){
        res.status(500).json({
            err: err.message,
        })
    }
}

module.exports = { getNews, postNews, deleteNews, getNewsbyId, editNews }