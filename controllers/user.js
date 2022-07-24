import createError from "../error.js"
import User from "../models/user.js"

const updateUser=async (req,res,next)=>{
    if(req.params.id===req.user.id){
        try {
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedUser);
            
        } catch (error) {
            next(error)
        }

    }else{
        return next(createError(403,"You can update only your account"))
    }

}
const deleteUser= async (req,res,next)=>{
    if(req.params.id===req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted User");
            
        } catch (error) {
            next(error)
        }

    }else{
        return next(createError(403,"You can Delete only your account"))
    }
    

}
const getUser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
        
    } catch (error) {
        next(error)
        
    }


}
const subscribe=async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
          });
          await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
          });
          res.status(200).json("Subscription successfull.")
        
    } catch (error) {
        next(error)
        
    }

}
const unsubscribe=async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
          });
          await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
          });
          res.status(200).json("Unsubscription successfull.")
        
        
    } catch (error) {
        next(error)
        
    }

}
const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      })
      res.status(200).json("The video has been liked.")
    } catch (err) {
      next(err);
    }
  };

export {updateUser,deleteUser,like,subscribe,unsubscribe,getUser}