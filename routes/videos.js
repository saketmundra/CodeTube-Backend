import express  from "express";
import { addVideo,deleteVideo,updateVideo,getVideo,addView,random, search } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";

const router=express.Router();

router.post("/",verifyToken,addVideo);
router.put("/:id",verifyToken,updateVideo);
router.delete("/:id",verifyToken,deleteVideo);
router.get("/find/:id",getVideo);
router.put("/view/:id",verifyToken,addView);
router.get("/random", random)
router.get("/search", search)




export default router;
