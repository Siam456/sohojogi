const commentModel = require('../model/commentModel');
const statusModel = require('../model/statusModel');

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
        const comment = new commentModel({
            ...req.body,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone,
                address: req.user.address,
                avater: req.user.avater,
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

module.exports = { getComment, postComment , incLike }
