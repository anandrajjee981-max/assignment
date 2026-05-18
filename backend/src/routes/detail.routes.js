const express = require("express")
const detailroute = express.Router()
const allocationcontroller = require('../controller/allocation.controller')
const dashboard = require('../controller/dashboard.controller')
detailroute.get("/detail",allocationcontroller)
detailroute.get("/dashboard",dashboard)
module.exports = detailroute
