const mongoose = require("mongoose")
const providerschema = new mongoose.Schema({
providerName : {
    type : String ,
    required : [true , "name is require"]
},
monthlyQouta : {
    type : Number ,
    required : true ,
    default : 10
},
leadsAssignedCount: {
  type:Number,
  default:0
},
  providerNumber: {
      type: Number,
      required: true,
      unique: true
    },


})



const providermodel = mongoose.model("provider",providerschema)

module.exports = providermodel
