const mongoose = require("mongoose")

const allocationSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      enum: ["Service 1", "Service 2", "Service 3"],
      required: true,
      unique: true
    },

    currentIndex: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const AllocationModel = mongoose.model(
  "Allocation",
  allocationSchema
)

module.exports = AllocationModel