const express = require('express')
const { UserLogin, IsCheckUser } = require('../Controllers/UserControllers')
const Router = express.Router()
Router.post('/login',UserLogin)
Router.get('/is-user',IsCheckUser)
module.exports = Router