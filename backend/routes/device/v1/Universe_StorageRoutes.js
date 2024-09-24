/**
 * Universe_StorageRoutes.js
 * @description :: CRUD API routes for Universe_Storage
 */

const express = require('express');
const router = express.Router();
const Universe_StorageController = require('../../../controller/device/v1/Universe_StorageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/universe_storage/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.addUniverse_Storage);
router.route('/device/api/v1/universe_storage/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.findAllUniverse_Storage);
router.route('/device/api/v1/universe_storage/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.getUniverse_StorageCount);
router.route('/device/api/v1/universe_storage/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.getUniverse_Storage);
router.route('/device/api/v1/universe_storage/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.updateUniverse_Storage);    
router.route('/device/api/v1/universe_storage/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.partialUpdateUniverse_Storage);
router.route('/device/api/v1/universe_storage/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.softDeleteUniverse_Storage);
router.route('/device/api/v1/universe_storage/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.softDeleteManyUniverse_Storage);
router.route('/device/api/v1/universe_storage/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.bulkInsertUniverse_Storage);
router.route('/device/api/v1/universe_storage/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.bulkUpdateUniverse_Storage);
router.route('/device/api/v1/universe_storage/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.deleteUniverse_Storage);
router.route('/device/api/v1/universe_storage/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_StorageController.deleteManyUniverse_Storage);

module.exports = router;
