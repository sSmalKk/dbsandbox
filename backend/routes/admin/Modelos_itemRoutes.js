/**
 * Modelos_itemRoutes.js
 * @description :: CRUD API routes for Modelos_item
 */

const express = require('express');
const router = express.Router();
const Modelos_itemController = require('../../controller/admin/Modelos_itemController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_item/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.addModelos_item);
router.route('/admin/modelos_item/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.findAllModelos_item);
router.route('/admin/modelos_item/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.getModelos_itemCount);
router.route('/admin/modelos_item/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.getModelos_item);
router.route('/admin/modelos_item/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.updateModelos_item);    
router.route('/admin/modelos_item/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.partialUpdateModelos_item);
router.route('/admin/modelos_item/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.softDeleteModelos_item);
router.route('/admin/modelos_item/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.softDeleteManyModelos_item);
router.route('/admin/modelos_item/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.bulkInsertModelos_item);
router.route('/admin/modelos_item/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.bulkUpdateModelos_item);
router.route('/admin/modelos_item/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.deleteModelos_item);
router.route('/admin/modelos_item/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_itemController.deleteManyModelos_item);

module.exports = router;
