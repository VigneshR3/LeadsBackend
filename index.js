const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const path =require('path')
const cors = require("cors");
const DB_Connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kumar:KumarRTX424@cluster0.y8tfot5.mongodb.net/Leads_DB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // await mongoose.connection.collection('leads').dropIndex('leadid_1');
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
};

DB_Connection();
const allowedOrigins = [
  'https://leadsfrontend03.vercel.app',  // Vercel live frontend
  'http://localhost:5173',               // Dev frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true,
}));

// require('./')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const LeadsROuter = require("./Routers/LeadsRoters");
const UserRouet = require('./Routers/UserRouter')
app.use('/images', express.static(path.join(__dirname, '.',"uploads")));
app.use('/api/leads',LeadsROuter) 
app.use('/api/user',UserRouet)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server run on " + PORT);
});
