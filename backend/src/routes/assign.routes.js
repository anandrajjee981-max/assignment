const express = require("express")
const assignroute = express.Router()
const assigncontroller = require('../controller/assign.controller')
assignroute.patch("/:id", assigncontroller)
module.exports = assignroute
