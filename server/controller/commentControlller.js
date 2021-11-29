const commentModel = require('../model/commentModel');
const statusModel = require('../model/statusModel');
const fs = require('fs');
const repliesModel = require('../model/repliesModel');
const people = require('../model/userModel');

const getComment = async (req, res) => {
    try{
        const response = await commentModel.find({}).sort({ createdAt: -1 }).populate('replies');
        res.json({ 
            response
        });

    } catch(err){
        res.status(500).json({
            err
        })
    }
}
const postComment = async (req, res) => {
    
    try{
        const userX = await people.findOne({_id: req.user._id});
        if(req.file && req.body){
            const comment = new commentModel({
                text: req.body,
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    address: req.user.address,
                    avater: userX.avater,
                },
                statusid: req.params.id,
                commentAttachment: req.file.filename,
            })
    
            const response = await comment.save();
            if(response){
                console.log(response._id)
                const responseU = await statusModel.findByIdAndUpdate({_id: response.statusid},
                    { $push: { comments: response._id } },)
            }
            res.json({
                response
            })

        } else if(req.file){
            const comment = new commentModel({
                text: '',
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    address: req.user.address,
                    avater: userX.avater,
                },
                statusid: req.params.id,
                commentAttachment: req.file.filename,
            })
    
            const response = await comment.save();
            if(response){
                console.log(response._id)
                const responseU = await statusModel.findByIdAndUpdate({_id: response.statusid},
                    { $push: { comments: response._id } },)
            }
            res.json({
                response
            })

        } else{
            const comment = new commentModel({
                text: req.body,
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    address: req.user.address,
                    avater: userX.avater,
                },
                statusid: req.params.id,
            })
    
            const response = await comment.save();
            if(response){
                console.log(response._id)
                const responseU = await statusModel.findByIdAndUpdate({_id: response.statusid},
                    { $push: { comments: response._id } },)
            }
            res.json({
                response
            })
        }
        
    } catch(err){
        res.status(500).json({
            err
        })
    }
}

const incLike = async (req, res) => {
    //console.log(req.params.id);
    //console.log(req.params.mainId);
    let check = false;
    try{
        const comment = await commentModel.findOne({_id: req.params.mainId});
        //console.log(status)
     
        for (let element of comment.likes) {
            //console.log(element)
            if(req.params.id === element.toString()){
                check = true;
                break;
            }
        }

        //console.log(check);
        let response; 

        if(check){
            response = await commentModel.findByIdAndUpdate({_id: req.params.mainId},
                { $pull: { likes: req.params.id } },)
        } else{
            response = await commentModel.findByIdAndUpdate({_id: req.params.mainId},
            { $push: { likes: req.params.id } },)
        }
        res.json({
            response
        })

        
        
    } catch(err){
        res.status(500).json({
            err
        })
    }
}

const deleteComment = async (req, res) => {
    //console.log(req.params.id)
    try{

        const CommentUser = await commentModel.find({_id: req.params.id});

        CommentUser.forEach( async (commentX) => {
            //console.log(commentX)
            const status = await statusModel.findOne({_id: commentX.statusid})
            if(status.user.id.toString() === req.user._id || commentX.user.id.toString() === req.user._id){
                const response = await commentModel.findByIdAndDelete({_id: req.params.id});
             
                if(response.commentAttachment){
                    //console.log(response.commentAttachment)
                    const delPathComment = `${__dirname}/../clint/public/CommentUpload/${response.commentAttachment}`
                    fs.unlinkSync(delPathComment);
                }

                if(response.replies.length > 0){
                    response.replies.forEach(async (element) => {
                        const responseReplies = await repliesModel.findByIdAndDelete({_id: element.id});

                        if(responseReplies.replyAttachment){
                            const delPathreply = `${__dirname}/../clint/public/replyUpload/${responseReplies.replyAttachment}`
                            fs.unlinkSync(delPathreply);
                        }
                        
                    });
                }

                res.json({
                    msg: 'delete comment successfully'
                });
            }
        })

        

    } catch(err){
        res.status(500).json({
            err
        })
    }
}

const editComment = async (req, res) => {
    try{
        // console.log(req.body)
        //     console.log(req.file);
        //     console.log(req.params.statusId);
        //     console.log(req.params.commentId);
        var comment;
        if(req.file){
            comment = await commentModel.findOneAndUpdate({_id: req.params.commentId},{
                $set: {
                    text: req.body,
                    commentAttachment: req.file.filename,
                }
            });

            if(comment.commentAttachment){
                const delPathComment = `${__dirname}/../clint/public/CommentUpload/${comment.commentAttachment}`
                fs.unlinkSync(delPathComment);
            }
   
        } else{
            comment = await commentModel.findOneAndUpdate({_id: req.params.commentId},{
                $set: {
                    text: req.body,
                }
            });
        }

        res.json({
            comment,
        })

    } catch(err){
        res.status(500).json({
            err
        })
    }
}

module.exports = { getComment, postComment, incLike, deleteComment, editComment };
