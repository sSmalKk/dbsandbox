/**
 * ActionRoutes.js
 * @description :: CRUD API routes for Action
 */

const express = require('express');
const router = express.Router();
const ActionController = require('../../../controller/device/v1/ActionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/action/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.addAction);
router.route('/device/api/v1/action/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.findAllAction);
router.route('/device/api/v1/action/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.getActionCount);
router.route('/device/api/v1/action/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.getAction);
router.route('/device/api/v1/action/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.updateAction);    
router.route('/device/api/v1/action/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.partialUpdateAction);
router.route('/device/api/v1/action/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.softDeleteAction);
router.route('/device/api/v1/action/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.softDeleteManyAction);
router.route('/device/api/v1/action/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.bulkInsertAction);
router.route('/device/api/v1/action/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.bulkUpdateAction);
router.route('/device/api/v1/action/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.deleteAction);
router.route('/device/api/v1/action/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ActionController.deleteManyAction);

module.exports = router;
