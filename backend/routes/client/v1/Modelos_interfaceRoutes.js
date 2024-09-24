/**
 * Modelos_interfaceRoutes.js
 * @description :: CRUD API routes for Modelos_interface
 */

const express = require('express');
const router = express.Router();
const Modelos_interfaceController = require('../../../controller/client/v1/Modelos_interfaceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_interface/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.addModelos_interface);
router.route('/client/api/v1/modelos_interface/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.findAllModelos_interface);
router.route('/client/api/v1/modelos_interface/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.getModelos_interfaceCount);
router.route('/client/api/v1/modelos_interface/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.getModelos_interface);
router.route('/client/api/v1/modelos_interface/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.updateModelos_interface);    
router.route('/client/api/v1/modelos_interface/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.partialUpdateModelos_interface);
router.route('/client/api/v1/modelos_interface/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.softDeleteModelos_interface);
router.route('/client/api/v1/modelos_interface/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.softDeleteManyModelos_interface);
router.route('/client/api/v1/modelos_interface/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.bulkInsertModelos_interface);
router.route('/client/api/v1/modelos_interface/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.bulkUpdateModelos_interface);
router.route('/client/api/v1/modelos_interface/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.deleteModelos_interface);
router.route('/client/api/v1/modelos_interface/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_interfaceController.deleteManyModelos_interface);

module.exports = router;
