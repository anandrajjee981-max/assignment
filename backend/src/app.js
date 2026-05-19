const express = require("express")
const app = express()
app.use(express.json())
const cookieparser = require("cookie-parser")
app.use(cookieparser())
const leadroute = require('../src/routes/lead.routes')
const detailroute = require('../src/routes/detail.routes')
const assignroute = require('../src/routes/assign.routes')
const cors = require("cors")
const allowedOrigins = [
  "http://localhost:5173",                             // Local development (Vite default)
  "https://assignment-orcin-ten-51.vercel.app"         // Production (Aapka Vercel URL)
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
  
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use("/api/auth",leadroute)
app.use("/api",detailroute)
app.use("/api/lead",assignroute)

module.exports = app