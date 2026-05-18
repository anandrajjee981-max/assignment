const mongoose = require("mongoose")
const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"]
    },
    city: {
      type: String,
      required: [true, "City is required"]
    },
    service: {
      type: String,
      enum: ["Service 1", "Service 2", "Service 3" , "Service 4"],
      required: [true, "Service is required"],
      default : "Service 1"
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    iscomplete : {
      type : String ,
      enum : ["solve" , "pending"] ,
      default :"pending"
    }
  },
  {
    timestamps: true
  }
)
leadSchema.index(
  { phone: 1, service: 1 },
  { unique: true }
)

const LeadModel = mongoose.model("Lead", leadSchema)

module.exports = LeadModel