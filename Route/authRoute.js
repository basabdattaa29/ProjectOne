const express = require('express');

const auth_route = express.Router();
const authController = require('../Controller/authController');

const auth_check = require('../middle-ware/isAuth');

auth_route.get('/reg_page', authController.getRegDisplay, auth_check);
auth_route.post('/regValue', authController.regPostform);
auth_route.get('/log_page', authController.getlogDisplay, auth_check);
auth_route.post('/logValue', authController.loginPostForm);
auth_route.get('/log_out', authController.logout);

module.exports = auth_route;