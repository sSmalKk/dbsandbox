/**
 * universeRoutes.js
 * @description :: CRUD API routes for universe
 */

const express = require('express');
const router = express.Router();
const universeController = require('../../../controller/device/v1/universeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/universe/create').post(auth(PLATFORM.DEVICE),checkRolePermission,universeController.addUniverse);
router.route('/device/api/v1/universe/list').post(auth(PLATFORM.DEVICE),checkRolePermission,universeController.findAllUniverse);
router.route('/device/api/v1/universe/count').post(auth(PLATFORM.DEVICE),checkRolePermission,universeController.getUniverseCount);
router.route('/device/api/v1/universe/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,universeController.getUniverse);
router.route('/device/api/v1/universe/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,universeController.updateUniverse);    
router.route('/device/api/v1/universe/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,universeController.partialUpdateUniverse);
router.route('/device/api/v1/universe/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,universeController.softDeleteUniverse);
router.route('/device/api/v1/universe/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,universeController.softDeleteManyUniverse);
router.route('/device/api/v1/universe/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,universeController.bulkInsertUniverse);
router.route('/device/api/v1/universe/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,universeController.bulkUpdateUniverse);
router.route('/device/api/v1/universe/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,universeController.deleteUniverse);
router.route('/device/api/v1/universe/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,universeController.deleteManyUniverse);

module.exports = router;
