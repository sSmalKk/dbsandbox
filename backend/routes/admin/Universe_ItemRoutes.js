/**
 * Universe_ItemRoutes.js
 * @description :: CRUD API routes for Universe_Item
 */

const express = require('express');
const router = express.Router();
const Universe_ItemController = require('../../controller/admin/Universe_ItemController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe_item/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.addUniverse_Item);
router.route('/admin/universe_item/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.findAllUniverse_Item);
router.route('/admin/universe_item/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.getUniverse_ItemCount);
router.route('/admin/universe_item/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.getUniverse_Item);
router.route('/admin/universe_item/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.updateUniverse_Item);    
router.route('/admin/universe_item/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.partialUpdateUniverse_Item);
router.route('/admin/universe_item/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.softDeleteUniverse_Item);
router.route('/admin/universe_item/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.softDeleteManyUniverse_Item);
router.route('/admin/universe_item/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.bulkInsertUniverse_Item);
router.route('/admin/universe_item/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.bulkUpdateUniverse_Item);
router.route('/admin/universe_item/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.deleteUniverse_Item);
router.route('/admin/universe_item/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ItemController.deleteManyUniverse_Item);

module.exports = router;
