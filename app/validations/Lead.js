import Joi from "joi";

export const createLeadValidator = Joi.object({
  company: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Company name is required"
    }),

  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),

  phone: Joi.string()
    .required()
    .messages({
      "string.empty": "Phone number is required"
    }),
Image:Joi.string(),
//   tags: Joi.array()
//     .items(
//       Joi.string().valid(
//         "Follow Up",
//         "Tomorrow",
//         "Hot",
//         "Cold",
//         "Interested"
//       )
//     )
//     .optional(),
tags: Joi.alternatives().try(
    Joi.array().items(
      Joi.string().valid(
        "Follow Up",
        "Tomorrow",
        "Hot",
        "Cold",
        "Interested"
      )
    ),
    Joi.string() // for form-data stringified array
  ).optional(),

  status: Joi.string()
    .valid("New", "Contacted", "Qualified", "Lost", "Converted")
    .optional(),
    employee:Joi.string()

 
});
