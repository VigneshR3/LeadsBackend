const express = require('express')
const {NewLeads,GetAllLeads, DeleteOne, LeadsExport} = require('../Controllers/LeadsController')
const Router = express.Router()
const multer = require('multer');
const path = require('path')
// require('../uploads')
// Setup multer
const filepath = path.join(__dirname, '..',"uploads")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filepath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

Router.post('/create',upload.single('assigned'),NewLeads)
Router.get('/get',GetAllLeads)
Router.delete('/delete/:id',DeleteOne)
Router.post('/export',LeadsExport)
module.exports = Router