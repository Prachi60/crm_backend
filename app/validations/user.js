import Joi from "joi"


export const createUserValidator = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required().messages({"string.email":"invalid email format",
            "any.required":"email is required"}),
    mobile:Joi.string().min(10).max(10).messages({"string.min":"mobile number should be atleast 10 digits","string.max":"mobile number must be at most of 10 dogits"}),
    password:Joi.string().min(8).required().messages({"string.min":"minimum 8 digits password is required"}),

})



export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
