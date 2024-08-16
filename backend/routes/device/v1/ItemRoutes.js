/**
 * ItemRoutes.js
 * @description :: CRUD API routes for Item
 */

const express = require('express');
const router = express.Router();
const ItemController = require('../../../controller/device/v1/ItemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/item/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.addItem);
router.route('/device/api/v1/item/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.findAllItem);
router.route('/device/api/v1/item/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.getItemCount);
router.route('/device/api/v1/item/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.getItem);
router.route('/device/api/v1/item/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.updateItem);    
router.route('/device/api/v1/item/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.partialUpdateItem);
router.route('/device/api/v1/item/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.softDeleteItem);
router.route('/device/api/v1/item/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.softDeleteManyItem);
router.route('/device/api/v1/item/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.bulkInsertItem);
router.route('/device/api/v1/item/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.bulkUpdateItem);
router.route('/device/api/v1/item/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.deleteItem);
router.route('/device/api/v1/item/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemController.deleteManyItem);

module.exports = router;
