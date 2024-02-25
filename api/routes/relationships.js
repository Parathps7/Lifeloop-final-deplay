import express from "express";
import { getRelationships, addRelationship, deleteRelationship,getRelationship } from "../controllers/relationship.js";

const router = express.Router()

router.get("/", getRelationships)
router.get("/abc/", getRelationship)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)


export default router