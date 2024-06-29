/**
 * WorldDataRoutes.js
 * @description :: CRUD API routes for WorldData
 */

const express = require('express');
const router = express.Router();
const WorldDataController = require('../../../controller/device/v1/WorldDataController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/worlddata/create').post(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.addWorldData);
router.route('/device/api/v1/worlddata/list').post(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.findAllWorldData);
router.route('/device/api/v1/worlddata/count').post(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.getWorldDataCount);
router.route('/device/api/v1/worlddata/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.getWorldData);
router.route('/device/api/v1/worlddata/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.updateWorldData);    
router.route('/device/api/v1/worlddata/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.partialUpdateWorldData);
router.route('/device/api/v1/worlddata/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.softDeleteWorldData);
router.route('/device/api/v1/worlddata/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.softDeleteManyWorldData);
router.route('/device/api/v1/worlddata/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.bulkInsertWorldData);
router.route('/device/api/v1/worlddata/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.bulkUpdateWorldData);
router.route('/device/api/v1/worlddata/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.deleteWorldData);
router.route('/device/api/v1/worlddata/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,WorldDataController.deleteManyWorldData);

module.exports = router;
