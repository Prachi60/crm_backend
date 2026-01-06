import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {


    companyName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    position: {
      type: String,
      required: true,
      trim: true
    },

    leadsCount: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }

   
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Employee", employeeSchema);
