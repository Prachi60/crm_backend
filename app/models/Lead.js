import mongoose from "mongoose";

export const leadSchema = new mongoose.Schema({
      company: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    tags: [
      {
        type: String,
        enum: ["Follow Up", "Tomorrow", "Hot", "Cold", "Interested"]
      }
    ],

    Image: {
      type: String, 
      default: null
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost", "Converted"],
      default: "New"
    },

   

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null
    },

  

    createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
  },

  
  {
    timestamps: true
  }
);

export default mongoose.model("Lead", leadSchema);
