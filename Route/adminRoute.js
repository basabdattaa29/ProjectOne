const express = require('express');
const admin_route = express.Router();
const adminController = require('../Controller/adminController');
const auth_check = require('../middle-ware/isAuth');

admin_route.get('/home_page', adminController.getFormDisplay);
admin_route.post('/addValue', adminController.postFormValue);
admin_route.get('/itemtDet', adminController.getAdminDet);
admin_route.get('/edit_form/:eid', adminController.editFormDisplay);
admin_route.post('/editValue', adminController.postEditForm);
admin_route.get('/itemProduct/:eid', adminController.viewProductShop, auth_check);

module.exports = admin_route;