const express = require("express")
const leadroute = express.Router()
const leadcontroller = require('../controller/lead.controller')
leadroute.post("/lead",leadcontroller.postquery)
leadroute.get("/total",leadcontroller.totallead)






module.exports = leadroute