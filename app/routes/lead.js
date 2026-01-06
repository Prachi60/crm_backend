import express from "express"
import { createLead,getAllLeads,updateLead,deleteLead } from "../controller/lead.js";
import {generateFileUrl,uploadMultiple} from "../middleWare/fileUpload.js"
import authMiddleware from "../middleWare/authMiddleware.js";


const router = express.Router();
router.post("/createLead",authMiddleware,uploadMultiple,generateFileUrl,createLead);
router.get("/getallleads",authMiddleware, getAllLeads);           
        
router.patch("/updatelead/:id", authMiddleware,uploadMultiple,generateFileUrl,updateLead);         
router.delete("/deletelead/:id",authMiddleware, deleteLead);


export default router;