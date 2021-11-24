const commentModel = require("../model/commentModel");
const repliesModel = require("../model/repliesModel");
const fs = require("fs");
const statusModel = require("../model/statusModel");
const people = require("../model/userModel");

const getreplies = async (req, res) => {
  try {
    const response = await repliesModel.find({}).sort({ createdAt: -1 });
    res.json({
      response,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

const getrepliesById = async (req, res) => {
  try {
    const response = await repliesModel
      .find({ commentid: req.params.id })
      .sort({ createdAt: -1 });
    res.json({
      response,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};
const postreplies = async (req, res) => {
  //console.log(req.body)
  try {
    const userX = await people.findOne({ _id: req.user._id });
    //console.log(userX)
    if (req.file && req.body) {
      const replies = new repliesModel({
        text: req.body,
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone,
          address: req.user.address,
          avater: userX.avater,
        },
        commentid: req.params.id,
        statusid: req.params.statusId,
        replyAttachment: req.file.filename,
      });

      const response = await replies.save();
      if (response) {
        //console.log(response._id)
        const responseU = await commentModel.findByIdAndUpdate(
          { _id: response.commentid },
          {
            $push: {
              replies: {
                user: {
                  id: response.user.id,
                  name: response.user.name,
                  email: response.user.email,
                  phone: response.user.phone,
                  address: response.user.address,
                  avater: userX.avater,
                },
                id: response._id,
                text: response.text,
                statusid: req.params.statusId,
                replyAttachment: req.file.filename,
                createdAt: response.createdAt,
              },
            },
          }
        );
      }
      //console.log(response)
      res.json({
        response,
      });
    } else if (req.file) {
      const replies = new repliesModel({
        text: "",
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone,
          address: req.user.address,
          avater: userX.avater,
        },
        commentid: req.params.id,
        statusid: req.params.statusId,
        replyAttachment: req.file.filename,
      });

      const response = await replies.save();
      if (response) {
        //console.log(response._id)
        const responseU = await commentModel.findByIdAndUpdate(
          { _id: response.commentid },
          {
            $push: {
              replies: {
                user: {
                  id: response.user.id,
                  name: response.user.name,
                  email: response.user.email,
                  phone: response.user.phone,
                  address: response.user.address,
                  avater: userX.avater,
                },
                id: response._id,
                text: response.text,
                statusid: req.params.statusId,
                replyAttachment: response.replyAttachment,
                createdAt: response.createdAt,
              },
            },
          }
        );
      }
      //console.log(response)
      res.json({
        response,
      });
    } else {
      const replies = new repliesModel({
        text: req.body,
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone,
          address: req.user.address,
          avater: userX.avater,
        },
        commentid: req.params.id,
        statusid: req.params.statusId,
      });

      const response = await replies.save();
      if (response) {
        //console.log(response._id)
        const responseU = await commentModel.findByIdAndUpdate(
          { _id: response.commentid },
          {
            $push: {
              replies: {
                user: {
                  id: response.user.id,
                  name: response.user.name,
                  email: response.user.email,
                  phone: response.user.phone,
                  address: response.user.address,
                  avater: userX.avater,
                },
                id: response._id,
                text: response.text,
                statusid: req.params.statusId,
                createdAt: response.createdAt,
              },
            },
          }
        );
      }
      //console.log(response)
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
    const replies = await repliesModel.findOne({ _id: req.params.mainId });
    //console.log(status)

    for (let element of replies.likes) {
      //console.log(element)
      if (req.params.id === element.toString()) {
        check = true;
        break;
      }
    }

    //console.log(check);
    let response;

    if (check) {
      response = await repliesModel.findByIdAndUpdate(
        { _id: req.params.mainId },
        { $pull: { likes: req.params.id } }
      );
    } else {
      response = await repliesModel.findByIdAndUpdate(
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

const deletereplies = async (req, res) => {
  try {
    //console.log(req.params.id)
    // const responseUser = await repliesModel.find({ _id: req.params.id });

    // responseUser.forEach(async (x) => {
    //   //console.log(x)
    //   const statusUser = await statusModel.findOne({ _id: x.statusid });
    //   //console.log(statusUser);
    //   if (
    //     statusUser.user.id.toString() === req.user._id ||
    //     x.user.id.toString() === req.user._id
    //   ) {
    //     const responseReplies = await repliesModel.findByIdAndDelete({
    //       _id: req.params.id,
    //     });

    //     if (responseReplies.replyAttachment) {
    //       const delPathreply = `${__dirname}/../clint/public/replyUpload/${responseReplies.replyAttachment}`;
    //       fs.unlinkSync(delPathreply);
    //     }

    //     const commentReplies = await commentModel.findByIdAndUpdate(
    //       { _id: responseReplies.commentid },
    //       {
    //         $pull: {
    //           replies: { id: responseReplies._id },
    //         },
    //       }
    //     );

      //   res.json({
      //     msg: "successfully delete reply",
      //   });
      // }
    // });

    const comment = await commentModel.findOne({_id: req.params.commentId});
    
    comment.replies.forEach(async(element) => {
      
      
      if(element.id.toString() === req.params.id){
        const response = await commentModel.findOneAndUpdate(
          { _id: req.params.commentId },
          { $pull: {"replies": {id: element.id}} }
        );

        //console.log(element)

        if(element.replyAttachment){
          const delPathreply = `${__dirname}/../clint/public/replyUpload/${element.replyAttachment}`;
          fs.unlinkSync(delPathreply);
        }
  
        
  
        // if(response){
        //   const delpath = `${__dirname}/../clint/public/statusUpload/${req.params.image}`;
        //   //console.log(delpath)    
        //   fs.unlinkSync(delpath);
        // }
      }
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

module.exports = {
  getreplies,
  postreplies,
  incLike,
  deletereplies,
  getrepliesById,
};
