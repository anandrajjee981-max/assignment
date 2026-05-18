const express = require("express")
const app = express()
app.use(express.json())
const cookieparser = require("cookie-parser")
app.use(cookieparser())
const leadroute = require('../src/routes/lead.routes')
const detailroute = require('../src/routes/detail.routes')
const cors = require("cors")
app.use(cors({
    credentials : true ,
    origin : "http://localhost:5173"
}))
app.use("/api/auth",leadroute)
app.use("/api",detailroute)

module.exports = app