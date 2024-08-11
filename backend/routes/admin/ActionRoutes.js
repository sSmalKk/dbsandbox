/**
 * ActionRoutes.js
 * @description :: CRUD API routes for Action
 */

const express = require('express');
const router = express.Router();
const ActionController = require('../../controller/admin/ActionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/action/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.addAction);
router.route('/admin/action/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.findAllAction);
router.route('/admin/action/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.getActionCount);
router.route('/admin/action/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.getAction);
router.route('/admin/action/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.updateAction);    
router.route('/admin/action/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.partialUpdateAction);
router.route('/admin/action/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.softDeleteAction);
router.route('/admin/action/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.softDeleteManyAction);
router.route('/admin/action/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.bulkInsertAction);
router.route('/admin/action/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.bulkUpdateAction);
router.route('/admin/action/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.deleteAction);
router.route('/admin/action/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ActionController.deleteManyAction);

module.exports = router;
