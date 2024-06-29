/**
 * ItemModelRoutes.js
 * @description :: CRUD API routes for ItemModel
 */

const express = require('express');
const router = express.Router();
const ItemModelController = require('../../controller/admin/ItemModelController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/itemmodel/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.addItemModel);
router.route('/admin/itemmodel/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.findAllItemModel);
router.route('/admin/itemmodel/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.getItemModelCount);
router.route('/admin/itemmodel/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.getItemModel);
router.route('/admin/itemmodel/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.updateItemModel);    
router.route('/admin/itemmodel/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.partialUpdateItemModel);
router.route('/admin/itemmodel/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.softDeleteItemModel);
router.route('/admin/itemmodel/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.softDeleteManyItemModel);
router.route('/admin/itemmodel/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.bulkInsertItemModel);
router.route('/admin/itemmodel/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.bulkUpdateItemModel);
router.route('/admin/itemmodel/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.deleteItemModel);
router.route('/admin/itemmodel/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemModelController.deleteManyItemModel);

module.exports = router;
