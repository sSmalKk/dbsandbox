/**
 * ItemRoutes.js
 * @description :: CRUD API routes for Item
 */

const express = require('express');
const router = express.Router();
const ItemController = require('../../controller/admin/ItemController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/item/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.addItem);
router.route('/admin/item/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.findAllItem);
router.route('/admin/item/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.getItemCount);
router.route('/admin/item/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.getItem);
router.route('/admin/item/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.updateItem);    
router.route('/admin/item/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.partialUpdateItem);
router.route('/admin/item/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.softDeleteItem);
router.route('/admin/item/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.softDeleteManyItem);
router.route('/admin/item/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.bulkInsertItem);
router.route('/admin/item/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.bulkUpdateItem);
router.route('/admin/item/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.deleteItem);
router.route('/admin/item/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemController.deleteManyItem);

module.exports = router;
