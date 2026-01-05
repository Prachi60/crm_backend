import Joi from "joi";

export const createEmployeeValidator = Joi.object({
  

  companyName: Joi.string()
    .trim()
    .min(2)
    .required()
    .messages({
      "string.empty": "Company name is required"
    }),

  email: Joi.string()
    .email()
    .trim()
    .required()
    .messages({
      "string.email": "Enter a valid email",
      "string.empty": "Email is required"
    }),

  phone: Joi.string()
    .pattern(/^[0-9+]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Enter a valid phone number",
      "string.empty": "Phone number is required"
    }),

  position: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Position is required"
    }),
    leadsCount:Joi.number(),

  status: Joi.string()
    .valid("Active", "Inactive")
    .optional()
});


export const updateEmployeeValidator = Joi.object({
  companyName: Joi.string().trim().min(2),
  email: Joi.string().email().trim(),
  phone: Joi.string().pattern(/^[0-9+]{10,15}$/),
  position: Joi.string().trim(),
  status: Joi.string().valid("Active", "Inactive"),
    leadsCount:Joi.number(),
    

});
