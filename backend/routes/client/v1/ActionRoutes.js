/**
 * ActionRoutes.js
 * @description :: CRUD API routes for Action
 */

const express = require('express');
const router = express.Router();
const ActionController = require('../../../controller/client/v1/ActionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/action/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.addAction);
router.route('/client/api/v1/action/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.findAllAction);
router.route('/client/api/v1/action/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.getActionCount);
router.route('/client/api/v1/action/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.getAction);
router.route('/client/api/v1/action/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.updateAction);    
router.route('/client/api/v1/action/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.partialUpdateAction);
router.route('/client/api/v1/action/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.softDeleteAction);
router.route('/client/api/v1/action/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.softDeleteManyAction);
router.route('/client/api/v1/action/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.bulkInsertAction);
router.route('/client/api/v1/action/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.bulkUpdateAction);
router.route('/client/api/v1/action/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.deleteAction);
router.route('/client/api/v1/action/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ActionController.deleteManyAction);

module.exports = router;
