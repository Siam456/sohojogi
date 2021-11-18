const bcrypt = require('bcrypt');
const fs = require('fs');
//import model
const people = require('../model/userModel');
const statusModel = require('../model/statusModel');
const commentModel = require('../model/commentModel');
const repliesModel = require('../model/repliesModel');
const { Mongoose } = require('mongoose');

const getSeller = async (req, res) => {
    try{
        const seller = await people.find({
        $or: [
            { role: 'seller' },
            { role: 'admin' },
          ]}, 
        {email: 0, phone:0 , password: 0, name:0, vehicle: 0 ,  role: 0, createdAt:0, updatedAt:0,__v:0})
        .populate({path: "products"});

        if(seller){
            res.json({
                seller,
            })
        } else{
            res.status(404).json({
                msg: 'no seller found'
            })
        }
    } catch(err){
        res.status(500).json({
            msg: err.message
        })
    }
}


const getUser = async (req, res) => {
    try{
        const users = await people.find({})
        if(users){
            res.json({
                users,
            });
        } else{
            res.status(404).json({
                errors: {
                    msg: 'not available',
                }
            })
        }

    } catch(err){
        res.status(500).json({
            err: err.message
        });
    }
}


const getUserById = async (req, res) => {
    try{
        const users = await people.findOne({_id: req.params.id}, {email: 0, phone:0 , password: 0, name:0, vehicle: 0 ,  role: 0, createdAt:0, updatedAt:0,__v:0})
        .populate({path: "products"});
        if(users){
            res.json({
                users,
            });
        } else{
            res.status(404).json({
                errors: {
                    msg: 'not available',
                }
            })
        }

    } catch(err){
        res.status(500).json({
            err: err.message
        });
    }
}

const getprofileById = async (req, res) => {
    try{
        const users = await people.findOne({_id: req.params.id}, {password: 0})
        .populate({path: "products"});
        if(users){
            res.json({
                users,
            });
        } else{
            res.status(404).json({
                errors: {
                    msg: 'not available',
                }
            })
        }

    } catch(err){
        res.status(500).json({
            err: err.message
        });
    }
}

const postUser = async (req, res) => {
    try{
        console.log('ok')
        const salt = 10;
        const hashPass = await bcrypt.hash(req.body.password, salt);
        
        if(req.file){
            const user = new people({
                ...req.body,
                avater: req.file.filename,
                password: hashPass,
            });
    
            const response = await user.save();
            res.json({
                msg: 'user added successfully',
            });
        } else{
            const user = new people({
                ...req.body,
                password: hashPass,
            });
    
            const response = await user.save();
            res.json({
                msg: 'user added successfully',
            });
        }
        

    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const editUser = async (req, res) => {
    try{
        //console.log(req.body)
        if(req.file){
            const response = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        avater: req.file.filename,
                        role: req.body.role,
                        address: req.body.address,
                    }
                });
                const delPath = `${__dirname}/../clint/public/userUpload/${response.avater}`
                fs.unlinkSync(delPath);
                res.json({
                    user: response,
                    msg: 'user Update successfully',
                })


        } else{
            const response = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        role: req.body.role,
                        address: req.body.address,
                    }
                });
                res.json({
                    user: response,
                    msg: 'user Update successfully',
                })

        }
            

    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}


const deleteUser = async (req, res) => {
    try{
        const response = await people.findByIdAndDelete({_id: req.params.id});
        if(response.avater){
            const delPath = `${__dirname}/../clint/public/userUpload/${response.avater}`
            fs.unlinkSync(delPath);
        }
        res.json({
            user: response,
            msg: 'user delete successfully',
        })

    }  catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const coverUploder = async (req, res) => {
    //console.log(req.params.id);
    try{
        const respose = await people.findByIdAndUpdate({_id: req.params.id},
            {
                $set : {
                    coverPhoto: req.file.filename,
                }
            })
            res.json({
                user: respose,
                msg: 'cover update successfully',
            })
        
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const deleteCover = async (req, res) => {
    //console.log(req.params.id);
    try{
        const respose = await people.findByIdAndUpdate({_id: req.params.id},
            {
                $set : {
                    coverPhoto: null,
                }
            });

        if(respose){
            const delPath = `${__dirname}/../clint/public/userCoverPhoto/${respose.coverPhoto}`
            fs.unlinkSync(delPath);
        }

        res.json({
            user: respose,
            msg: 'cover delete successfully',
        })
        //console.log(respose)
        
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const coverUpdate = async (req, res) => {
    //console.log(req.params.id);
    try{
        const respose = await people.findByIdAndUpdate({_id: req.params.id},
            {
                $set : {
                    coverPhoto: req.file.filename,
                }
            })
        
            if(respose){
                const delPath = `${__dirname}/../clint/public/userCoverPhoto/${respose.coverPhoto}`
                fs.unlinkSync(delPath);
            }

            res.json({
                user: respose,
                msg: 'cover update successfully',
            })
        
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const addAccount = async (req, res) => {
    //console.log(req.body);
    try{
        if(req.body.Acname === 'Bkash'){
            const respose = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set : {
                        Bkash: req.body.number,
                    }
                });
    
                res.json({
                    user: respose,
                    msg: 'update successfully',
                })
            
        } else if(req.body.Acname === 'Rocket'){
            const respose = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set : {
                        Rocket: req.body.number,
                    }
                });
    
                res.json({
                    user: respose,
                    msg: 'update successfully',
                })
            
        } else if(req.body.Acname === 'Nagad'){
            const respose = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set : {
                        Nagad: req.body.number,
                    }
                });
    
                res.json({
                    user: respose,
                    msg: 'update successfully',
                })
            
        }
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const deleteAccount = async (req, res) => {
    //console.log(req.params.acname);
    try{
        if(req.params.acname === 'Bkash'){
            const respose = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set : {
                        Bkash: null,
                    }
                });
    
                res.json({
                    user: respose,
                    msg: 'delete successfully',
                })
            
        } else if(req.params.acname === 'Rocket'){
            const respose = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set : {
                        Rocket: null,
                    }
                });
    
                res.json({
                    user: respose,
                    msg: 'delete successfully',
                })
            
        } else if(req.params.acname === 'Nagad'){
            const respose = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set : {
                        Nagad: null,
                    }
                });
    
                res.json({
                    user: respose,
                    msg: 'delete successfully',
                })
            
        }
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const profilePicUploder = async (req, res) => {
    try{
        const respose = await people.findByIdAndUpdate({_id: req.params.id},
            {
                $set : {
                    avater: req.file.filename,
                }
            })
        
            if(respose){
                const delPath = `${__dirname}/../clint/public/userUpload/${respose.avater}`
                fs.unlinkSync(delPath);


                const statusUserUpdate = await statusModel.updateMany({'user.id': req.params.id},
                {
                    $set: {
                        "user.avater": req.file.filename,
                    }
                });

                

                const commentUserUpdate = await commentModel.updateMany({'user.id': req.params.id},
                {
                    $set: {
                        "user.avater": req.file.filename,
                    }
                });

               

                const replyUserUpdate = await repliesModel.updateMany({'user.id': req.params.id},
                {
                    $set: {
                        "user.avater": req.file.filename,
                    }
                });

            }

            

            res.json({
                user: respose,
                msg: 'Profile update successfully',
            })
        
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const addBio = async(req, res) => {
    try{
        //console.log(req.body.about)
        const respose = await people.findByIdAndUpdate({_id: req.params.id},
            {
                $set : {
                    about: req.body.about,
                }
            })
        
            res.json({
                user: respose,
                msg: 'Bio add successfully',
            })
        
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const editBio = async(req, res) => {
    try{
        //console.log(req.body.about)
        const respose = await people.findByIdAndUpdate({_id: req.params.id},
            {
                $set : {
                    about: req.body.about,
                }
            })
        
            res.json({
                user: respose,
                msg: 'Bio add successfully',
            })
        
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

const deleteBio = async(req, res) => {
    try{
        //console.log(req.body.about)
        const respose = await people.findByIdAndUpdate({_id: req.params.id},
            {
                $set : {
                    about: null,
                }
            })
        
            res.json({
                user: respose,
                msg: 'Bio add successfully',
            })
        
    } catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

module.exports = {
    getUser,
    postUser,
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
}