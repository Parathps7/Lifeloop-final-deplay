import express from "express";
import { getUser , updateUser , heresuser } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get("/", heresuser)
router.get("/test",(req,res)=>{
    res.send("it works!!")
})


export default router