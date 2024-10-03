/**
 * Universe_AgeRoutes.js
 * @description :: CRUD API routes for Universe_Age
 */

const express = require('express');
const router = express.Router();
const Universe_AgeController = require('../../../controller/device/v1/Universe_AgeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/universe_age/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.addUniverse_Age);
router.route('/device/api/v1/universe_age/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.findAllUniverse_Age);
router.route('/device/api/v1/universe_age/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.getUniverse_AgeCount);
router.route('/device/api/v1/universe_age/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.getUniverse_Age);
router.route('/device/api/v1/universe_age/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.updateUniverse_Age);    
router.route('/device/api/v1/universe_age/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.partialUpdateUniverse_Age);
router.route('/device/api/v1/universe_age/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.softDeleteUniverse_Age);
router.route('/device/api/v1/universe_age/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.softDeleteManyUniverse_Age);
router.route('/device/api/v1/universe_age/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.bulkInsertUniverse_Age);
router.route('/device/api/v1/universe_age/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.bulkUpdateUniverse_Age);
router.route('/device/api/v1/universe_age/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.deleteUniverse_Age);
router.route('/device/api/v1/universe_age/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_AgeController.deleteManyUniverse_Age);

module.exports = router;
