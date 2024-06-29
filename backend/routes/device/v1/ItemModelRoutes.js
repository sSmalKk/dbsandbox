/**
 * ItemModelRoutes.js
 * @description :: CRUD API routes for ItemModel
 */

const express = require('express');
const router = express.Router();
const ItemModelController = require('../../../controller/device/v1/ItemModelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/itemmodel/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.addItemModel);
router.route('/device/api/v1/itemmodel/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.findAllItemModel);
router.route('/device/api/v1/itemmodel/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.getItemModelCount);
router.route('/device/api/v1/itemmodel/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.getItemModel);
router.route('/device/api/v1/itemmodel/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.updateItemModel);    
router.route('/device/api/v1/itemmodel/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.partialUpdateItemModel);
router.route('/device/api/v1/itemmodel/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.softDeleteItemModel);
router.route('/device/api/v1/itemmodel/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.softDeleteManyItemModel);
router.route('/device/api/v1/itemmodel/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.bulkInsertItemModel);
router.route('/device/api/v1/itemmodel/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.bulkUpdateItemModel);
router.route('/device/api/v1/itemmodel/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.deleteItemModel);
router.route('/device/api/v1/itemmodel/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemModelController.deleteManyItemModel);

module.exports = router;
