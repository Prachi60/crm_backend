import User from "../models/user.js";
import handleResponse from "../utils/handleResponse.js";
import { createUserValidator,loginValidator } from "../validations/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const registerUser = async(req,res)=>{
    try{
        const { error, value } = createUserValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return handleResponse(res, 400, "Validation error", {
        details: error.details.map((err) => err.message),
      });
    }
    const { name, email, mobile,  password } =
      value;
      const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleResponse(
        res,
        409,
        "User already registered with this email"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      
    });

    const result = await newUser.save();

     return handleResponse(res, 201, "User registered successfully", {
     name: result.name,
     email:result.email,
     mobile:result.mobile,
     id:result._id
      
    });

    }
    catch(error)
    {
        console.error("Register error:", error.message);
    return handleResponse(res, 500, "Internal Server Error", {
      error: error.message,
    });

    }
}


export const loginUser = async(req,res)=>{
    try{
            const { error, value } = loginValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return handleResponse(res, 400, "Validation error", {
        details: error.details.map((err) => err.message),
      });
    }

    const { email, password } = value;
     let user = await User.findOne({ email });
     if (!user) {
      return handleResponse(res, 401, "Invalid Credentials");
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return handleResponse(res, 401, "Password  do not matched");
    }

    const token = jwt.sign(
      {
        id: user.id,
        
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

     return handleResponse(res,200,"Login Succesfull",{token ,
        name:user.name,
    email:user.email,
    id:user._id,
    mobile:user.mobile
})


    }
    catch(error)
    {
    console.error("Error in login:", error.message);
    return handleResponse(res, 500, "Internal server error", {
      error: error.message,
    });
    }
}