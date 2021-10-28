const commentModel = require('../model/commentModel');
const repliesModel = require('../model/repliesModel');

const getreplies = async (req, res) => {
    try{
        const response = await repliesModel.find({}).sort({ createdAt: -1 });
        res.json({ 
            response
        });

    } catch(err){
        res.status(500).json({
            err
        })
    }
}
const postreplies = async (req, res) => {
    //console.log(req.params.id)
    try{
        const replies = new repliesModel({
            ...req.body,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone,
                address: req.user.address,
                avater: req.user.avater,
            },
            commentid: req.params.id,
        })

        const response = await replies.save();
        if(response){
            //console.log(response._id)
            const responseU = await commentModel.findByIdAndUpdate({_id: response.commentid},
                { $push: { replies: {
                    user: {
                        id: response.user.id,
                        name: response.user.name,
                        email: response.user.email,
                        phone: response.user.phone,
                        address: response.user.address,
                        avater: response.user.avater,
                    },
                    id: response._id,
                    text: response.text,
                    createdAt: response.createdAt,
                } } },)
        }
        //console.log(response)
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
        const replies = await repliesModel.findOne({_id: req.params.mainId});
        //console.log(status)
     
        for (let element of replies.likes) {
            //console.log(element)
            if(req.params.id === element.toString()){
                check = true;
                break;
            }
        }

        //console.log(check);
        let response; 

        if(check){
            response = await repliesModel.findByIdAndUpdate({_id: req.params.mainId},
                { $pull: { likes: req.params.id } },)
        } else{
            response = await repliesModel.findByIdAndUpdate({_id: req.params.mainId},
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

module.exports = { getreplies, postreplies , incLike }

