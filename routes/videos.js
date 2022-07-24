import express  from "express";
import { addVideo,deleteVideo,updateVideo,getVideo,addView,random, search,getByTag } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";
import cookieParser from "cookie-parser"


const router=express.Router();
router.use(cookieParser());

router.post("/",verifyToken,addVideo);
router.put("/:id",verifyToken,updateVideo);
router.delete("/:id",verifyToken,deleteVideo);
router.get("/find/:id",getVideo);
router.put("/view/:id",verifyToken,addView);
router.get("/random", random)
router.get("/search", search)
router.get("/tags", getByTag)



export default router;
