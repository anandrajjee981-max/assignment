require("dotenv").config()
const app = require('./src/app')
const mongoose = require("mongoose")
const connectdb = require('./src/config/database')
connectdb()

app.listen(3000)