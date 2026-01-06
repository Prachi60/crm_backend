import Lead from "../models/Lead.js";
import Employee from "../models/employ.js";
import handleResponse from "../utils/handleResponse.js";

export const getDashboardStats = async (req, res) => {
  try {
     const userId = req.id;
    const totalLeads = await Lead.countDocuments({createdBy: userId});
    const totalEmployees = await Employee.countDocuments({createdBy: userId});

    const data = {
      totalLeads,
      totalEmployees
    };

    return handleResponse(
      res,
      200,
      "Dashboard statistics fetched successfully",
      data
    );
  } catch (error) {
    console.error(error);
    return handleResponse(
      res,
      500,
      "Error fetching dashboard statistics"
    );
  }
};
