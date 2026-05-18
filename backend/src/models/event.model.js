const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true
    },

    processed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const EventModel = mongoose.model( "Event",eventSchema)
module.exports = EventModel