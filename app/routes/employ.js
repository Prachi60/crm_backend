import express from "express"
import { registerEmployee ,getEmployees,updateEmployee,deleteEmployee} from "../controller/employ.js"
import authMiddleware from "../middleWare/authMiddleware.js";

const router = express.Router();
 
router.post("/registeremploy",authMiddleware,registerEmployee);
router.get("/getemploy",getEmployees);
router.patch("/updateemploy/:id",authMiddleware,updateEmployee);
router.delete("/deleteemploy/:id",authMiddleware,deleteEmployee);




export default router;