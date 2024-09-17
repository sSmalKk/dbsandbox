/**
 * Modelos_itemRoutes.js
 * @description :: CRUD API routes for Modelos_item
 */

const express = require('express');
const router = express.Router();
const Modelos_itemController = require('../../../controller/client/v1/Modelos_itemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_item/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.addModelos_item);
router.route('/client/api/v1/modelos_item/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.findAllModelos_item);
router.route('/client/api/v1/modelos_item/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.getModelos_itemCount);
router.route('/client/api/v1/modelos_item/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.getModelos_item);
router.route('/client/api/v1/modelos_item/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.updateModelos_item);    
router.route('/client/api/v1/modelos_item/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.partialUpdateModelos_item);
router.route('/client/api/v1/modelos_item/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.softDeleteModelos_item);
router.route('/client/api/v1/modelos_item/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.softDeleteManyModelos_item);
router.route('/client/api/v1/modelos_item/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.bulkInsertModelos_item);
router.route('/client/api/v1/modelos_item/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.bulkUpdateModelos_item);
router.route('/client/api/v1/modelos_item/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.deleteModelos_item);
router.route('/client/api/v1/modelos_item/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_itemController.deleteManyModelos_item);

module.exports = router;
