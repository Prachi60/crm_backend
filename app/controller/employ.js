import Employ from "../models/employ.js";
import handleResponse from "../utils/handleResponse.js";
import { updateEmployeeValidator,createEmployeeValidator } from "../validations/employ.js";

export const registerEmployee = async (req, res) => {
  try {
    
    const { error, value } = createEmployeeValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return handleResponse(res, 400, "Validation error", {
        details: error.details.map(err => err.message),
      });
    }

    const {
   
      companyName,
      email,
      phone,
      position,
      status,
       leadsCount
    } = value;


    const existingEmployee = await Employ.findOne({
       email ,
     
    });

    if (existingEmployee) {
      return handleResponse(
        res,
        409,
        "Employee already exists with this email "
      );
    }

    const newEmployee = new Employ({
  
      companyName,
      email,
      phone,
      position,
      status,
       leadsCount
    });

    const savedEmployee = await newEmployee.save();

   
    return handleResponse(res, 201, "Employee registered successfully", {
      id: savedEmployee._id,
     
      companyName: savedEmployee.companyName,
      email: savedEmployee.email,
      phone: savedEmployee.phone,
      position: savedEmployee.position,
      status: savedEmployee.status,
    });
    } catch (error) {
    console.error("Register Employee Error:", error.message);
    return handleResponse(res, 500, "Internal server error",{error:error.message});
  }
};



export const getEmployees = async (req, res) => {
  try {
    const employees = await Employ.find()
      .sort({ createdAt: -1 });

    return handleResponse(
      res,
      200,
      "Employee list fetched successfully",
      employees
    );

  } catch (error) {
    console.error("Get Employees Error:", error.message);
    return handleResponse(res, 500, "Internal server error",{error:error.message});
  }
};



export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updateEmployeeValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return handleResponse(res, 400, "Validation error", {
        details: error.details.map(err => err.message),
      });
    }


    const employee = await Employ.findById(id);

    if (!employee) {
      return handleResponse(res, 404, "Employee not found");
    }

    
    if (value.email && value.email !== employee.email) {
      const emailExists = await Employ.findOne({ email: value.email });
      if (emailExists) {
        return handleResponse(
          res,
          409,
          "Another employee already exists with this email"
        );
      }
    }

    
    const updatedEmployee = await Employ.findByIdAndUpdate(
      id,
      { $set: value },
      { new: true }
    );

    return handleResponse(res, 200, "Employee updated successfully", {
      id: updatedEmployee._id,
      companyName: updatedEmployee.companyName,
      email: updatedEmployee.email,
      phone: updatedEmployee.phone,
      position: updatedEmployee.position,
      status: updatedEmployee.status,
      leadsCount: updatedEmployee.leadsCount,
    });

  } catch (error) {
    console.error("Update Employee Error:", error.message);
    return handleResponse(res, 500, "Internal server error");
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

   
    const employee = await Employ.findById(id);

    if (!employee) {
      return handleResponse(res, 404, "Employee not found");
    }

    
    await Employ.findByIdAndDelete(id);

    return handleResponse(res, 200, "Employee deleted successfully");

  } catch (error) {
    console.error("Delete Employee Error:", error.message);
    return handleResponse(res, 500, "Internal server error",{error:error.message});
  }
};



