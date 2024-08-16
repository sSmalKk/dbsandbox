/**
 * ItemRoutes.js
 * @description :: CRUD API routes for Item
 */

const express = require('express');
const router = express.Router();
const ItemController = require('../../../controller/client/v1/ItemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/item/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.addItem);
router.route('/client/api/v1/item/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.findAllItem);
router.route('/client/api/v1/item/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.getItemCount);
router.route('/client/api/v1/item/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.getItem);
router.route('/client/api/v1/item/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.updateItem);    
router.route('/client/api/v1/item/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.partialUpdateItem);
router.route('/client/api/v1/item/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.softDeleteItem);
router.route('/client/api/v1/item/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.softDeleteManyItem);
router.route('/client/api/v1/item/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.bulkInsertItem);
router.route('/client/api/v1/item/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.bulkUpdateItem);
router.route('/client/api/v1/item/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.deleteItem);
router.route('/client/api/v1/item/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ItemController.deleteManyItem);

module.exports = router;
