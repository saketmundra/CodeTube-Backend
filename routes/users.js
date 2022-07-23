import express  from "express";
import {updateUser,deleteUser,like,subscribe,unsubscribe,getUser} from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js";

const router=express.Router();

//update user
router.put("/:id",verifyToken, updateUser)
router.delete("/:id",verifyToken,deleteUser)
router.get("/find/:id",getUser)
router.put("/sub/:id",verifyToken,subscribe)
router.put("/unsub/:id",verifyToken,unsubscribe)
router.put("/like/:videoId",verifyToken, like)




export default router;

