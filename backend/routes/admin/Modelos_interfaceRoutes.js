/**
 * Modelos_interfaceRoutes.js
 * @description :: CRUD API routes for Modelos_interface
 */

const express = require('express');
const router = express.Router();
const Modelos_interfaceController = require('../../controller/admin/Modelos_interfaceController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_interface/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.addModelos_interface);
router.route('/admin/modelos_interface/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.findAllModelos_interface);
router.route('/admin/modelos_interface/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.getModelos_interfaceCount);
router.route('/admin/modelos_interface/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.getModelos_interface);
router.route('/admin/modelos_interface/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.updateModelos_interface);    
router.route('/admin/modelos_interface/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.partialUpdateModelos_interface);
router.route('/admin/modelos_interface/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.softDeleteModelos_interface);
router.route('/admin/modelos_interface/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.softDeleteManyModelos_interface);
router.route('/admin/modelos_interface/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.bulkInsertModelos_interface);
router.route('/admin/modelos_interface/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.bulkUpdateModelos_interface);
router.route('/admin/modelos_interface/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.deleteModelos_interface);
router.route('/admin/modelos_interface/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_interfaceController.deleteManyModelos_interface);

module.exports = router;
