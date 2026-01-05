import Lead from "../models/Lead.js";
import handleResponse from "../utils/handleResponse.js";
import { createLeadValidator } from "../validations/Lead.js";

export const createLead = async (req, res) => {
  try {
   
    const { error } = createLeadValidator.validate(req.body);
    if (error) {
      return handleResponse(
        res,
        400,
        
        error.details[0].message
      );
    }

    let {
      company,
      email,
      phone,
      tags,
      status,
      employee
    } = req.body;

    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch (err) {
        return handleResponse(
          res,
          400,
          
          "Tags must be a valid array"
        );
      }
    }

    
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return handleResponse(
        res,
        409,
    
        "Lead with this email already exists"
      );
    }
    const fileUrls = req.fileUrl;
       console.log("file", req.fileUrl);
    const lead = await Lead.create({
      company,
      email,
      phone,
      tags,
      status,
      employee,
      Image: fileUrls

    });
  
 
    
    

    return handleResponse(
      res,
      201,
      
      "Lead created successfully",
      lead
    );

  } catch (error) {
    console.error("Create Lead Error:", error);
    return handleResponse(
      res,
      500,
      
      "Internal server error",{error:error.message}
    );
  }
};


export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("employee", "companyName email")
      .sort({ createdAt: -1 });

    return handleResponse(res, 200, "Leads fetched successfully", leads);
  } catch (error) {
    return handleResponse(res, 500, "Internal server error", {
      error: error.message
    });
  }
};
export const updateLead = async (req, res) => {
  try {
    let updates = req.body;
   

    if (typeof updates.tags === "string") {
      try {
        updates.tags = JSON.parse(updates.tags);
      } catch {
        return handleResponse(res, 400, "Tags must be a valid array");
      }
    }
 
    

    if (req.fileUrl) {
      updates.Image = req.fileUrl;
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return handleResponse(res, 404, "Lead not found");
    }

    return handleResponse(res, 200, "Lead updated successfully", lead);
  } catch (error) {
    return handleResponse(res, 500, "Internal server error", {
      error: error.message
    });
  }
};


 
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return handleResponse(res, 404, "Lead not found");
    }

    return handleResponse(res, 200, "Lead deleted successfully");
  } catch (error) {
    return handleResponse(res, 500, "Internal server error", {
      error: error.message
    });
  }
};
