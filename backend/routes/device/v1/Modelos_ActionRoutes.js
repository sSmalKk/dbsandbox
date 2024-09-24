/**
 * Modelos_ActionRoutes.js
 * @description :: CRUD API routes for Modelos_Action
 */

const express = require('express');
const router = express.Router();
const Modelos_ActionController = require('../../../controller/device/v1/Modelos_ActionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/modelos_action/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.addModelos_Action);
router.route('/device/api/v1/modelos_action/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.findAllModelos_Action);
router.route('/device/api/v1/modelos_action/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.getModelos_ActionCount);
router.route('/device/api/v1/modelos_action/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.getModelos_Action);
router.route('/device/api/v1/modelos_action/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.updateModelos_Action);    
router.route('/device/api/v1/modelos_action/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.partialUpdateModelos_Action);
router.route('/device/api/v1/modelos_action/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.softDeleteModelos_Action);
router.route('/device/api/v1/modelos_action/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.softDeleteManyModelos_Action);
router.route('/device/api/v1/modelos_action/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.bulkInsertModelos_Action);
router.route('/device/api/v1/modelos_action/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.bulkUpdateModelos_Action);
router.route('/device/api/v1/modelos_action/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.deleteModelos_Action);
router.route('/device/api/v1/modelos_action/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_ActionController.deleteManyModelos_Action);

module.exports = router;
