const express = require("express")
const leadroute = express.Router()
const leadcontroller = require('../controller/lead.controller')
leadroute.post("/lead",leadcontroller)






module.exports = leadroute