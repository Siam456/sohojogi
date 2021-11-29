const statusModel = require("../model/statusModel");
const commentModel = require("../model/commentModel");
const repliesModel = require("../model/repliesModel");
const fs = require("fs");
const people = require("../model/userModel");

const getStatus = async (req, res) => {
  try {
    const response = await statusModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("comments");
    res.json({
      response,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const getStatusById = async (req, res) => {
  try {
    const response = await statusModel
      .find({ 'user.id': req.params.id })
      .sort({ createdAt: -1 })
      .populate("comments");
    res.json({
      response,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const postStatus = async (req, res) => {
  //console.log(req.point)
  try {
    const userX = await people.findOne({_id: req.user._id});

    
      if (req.files && req.files.length > 0 && req.body) {
        let attachment = [];
        req.files.forEach((element) => {
          attachment.push(element.filename);
        });
  
        const status = new statusModel({
          text: req.body,
          pointGive: true,
          user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            address: userX.address,
            avater: req.user.avater,
          },
          statusAttachment: attachment,
        });
  
        const response = await status.save();
        res.json({
          response,
        });
      } else if (req.files && req.files.length > 0) {
        let attachment = [];
        req.files.forEach((element) => {
          attachment.push(element.filename);
        });
  
        const status = new statusModel({
          text: "",
          pointGive: true,
          user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            address: userX.address,
            avater: req.user.avater,
          },
          statusAttachment: attachment,
        });
  
        const response = await status.save();
        res.json({
          response,
        });
      } else {
        const status = new statusModel({
          text: req.body,
          pointGive: true,
          user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            address: req.user.address,
            avater: userX.avater,
          },
        });
        const response = await status.save();
        res.json({
          response,
        });
      }
    
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const incLike = async (req, res) => {
  //console.log(req.params.id);
  //console.log(req.params.mainId);
  let check = false;
  try {
    const status = await statusModel.findOne({ _id: req.params.mainId });
    //console.log(status)

    for (let element of status.likes) {
      //console.log(element)
      if (req.params.id === element.toString()) {
        check = true;
        break;
      }
    }

    //console.log(check);
    let response;

    if (check) {
      response = await statusModel.findByIdAndUpdate(
        { _id: req.params.mainId },
        { $pull: { likes: req.params.id } }
      );
    } else {
      response = await statusModel.findByIdAndUpdate(
        { _id: req.params.mainId },
        { $push: { likes: req.params.id } }
      );
    }
    res.json({
      response,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const deleteStatus = async (req, res) => {
  //console.log(req.params.id);
  try {
    const status = await statusModel.findOne({ _id: req.params.id });
    //console.log(req.user._id)
    if (status.user.id.toString() === req.user._id) {
      const response = await statusModel.findByIdAndRemove({
        _id: req.params.id,
      });
      //console.log(response);

      if (response.statusAttachment.length > 0) {
        response.statusAttachment.forEach((element) => {
          const delPathStatus = `${__dirname}/../clint/public/statusUpload/${element}`;
          fs.unlinkSync(delPathStatus);
        });
      }

      // const delPath = `${__dirname}/../clint/public/userUpload/${response.avater}`
      // fs.unlinkSync(delPath);

      //console.log(commentDelete);

      for (let key of response.comments) {
        //console.log()
        const commentDelete = await commentModel.findByIdAndRemove({
          _id: key._id,
        });
        //console.log(commentDelete);
        if (commentDelete.commentAttachment) {
          const delPathComment = `${__dirname}/../clint/public/commentUpload/${commentDelete.commentAttachment}`;
          fs.unlinkSync(delPathComment);
        }
        for (let keyTwo of commentDelete.replies) {
          //console.log()
          const repliesDelete = await repliesModel.findByIdAndRemove({
            _id: keyTwo.id,
          });
          //console.log(repliesDelete);
          if (repliesDelete.replyAttachment) {
            const delPathComment = `${__dirname}/../clint/public/replyUpload/${repliesDelete.replyAttachment}`;
            fs.unlinkSync(delPathComment);
          }
        }
      }

      res.json({
        msg: "delete successfully!",
      });
    } else {
      res.status(500).json({
        errors: "you cannot delete it...",
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: err.message,
    });
  }
};

const deleteAttchment = async (req, res) => {
  console.log(req.params.image); 
  //console.log(req.params.id);
  try {
    const response = await statusModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: {statusAttachment: req.params.image} }
      );

      

      if(response){
        const delpath = `${__dirname}/../clint/public/statusUpload/${req.params.image}`;
        //console.log(delpath)    
        fs.unlinkSync(delpath);
      }

      res.json({
        response: response,
      });
    
  } catch (err) {
    res.status(500).json({
      errors: err.message,
    });
  }

}

const givePoint = async(req, res) => {
  try{
    const userPoint = await people.findOne({_id: req.user._id});
    if(userPoint.point > 0){
      const minus = await people.findOneAndUpdate({_id: req.user._id}, {
        $inc: { point: -1 } 
     })
     
 
     const plus = await people.findOneAndUpdate({_id: req.params.commentUserId}, {
       $inc: { point: 1 } 
    })

    }
    
   //console.log(plus)

   res.json({
     res: 'ok'
   })
  } catch (err) {
    res.status(500).json({
      errors: err.message,
    });
  }
}

module.exports = {
  getStatus,
  postStatus,
  incLike,
  deleteStatus,
  getStatusById,
  deleteAttchment,
  givePoint
};
