const statusModel = require('../model/statusModel');

const getStatus = async (req, res) => {
    try{
        const response = await statusModel.find({})
            .sort({ createdAt: -1 })
            .populate('comments')
        res.json({
            response
        })

    } catch(err){
        res.status(500).json({
            err
        })
    }
}

const postStatus = async (req, res) => {
    console.log(req.user.avater);
    try{
        const status = new statusModel({
            ...req.body,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone,
                address: req.user.address,
                avater: req.user.avater,
            },
        })

        const response = await status.save();
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
        const status = await statusModel.findOne({_id: req.params.mainId});
        console.log(status)
     
        for (let element of status.likes) {
            console.log(element)
            if(req.params.id === element.toString()){
                check = true;
                break;
            }
        }

        console.log(check);
        let response; 

        if(check){
            response = await statusModel.findByIdAndUpdate({_id: req.params.mainId},
                { $pull: { likes: req.params.id } },)
        } else{
            response = await statusModel.findByIdAndUpdate({_id: req.params.mainId},
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

const deleteStatus = async (req, res) => {
    //console.log(req.params.id);
    try{

        const status = await statusModel.findOne({_id: req.params.id});
        //console.log(req.user._id)
        if(status.user.id.toString() === req.user._id){
            const response = await statusModel.findByIdAndRemove({_id: req.params.id});

            console.log(response)
            if(response){
                res.json({ 
                    response
                })
            } else{
                res.status(404).json({
                    errors: 'Not found',
                })
            }
        } else{
            res.status(500).json({
                errors: 'you cannot delete it...'
            })
        }

       
    } catch(err){
        res.status(500).json({
            errors: err.message,
        })
    }
}

module.exports = { getStatus, postStatus, incLike, deleteStatus }