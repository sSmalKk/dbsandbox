/**
 * Universe_BigitemRoutes.js
 * @description :: CRUD API routes for Universe_Bigitem
 */

const express = require('express');
const router = express.Router();
const Universe_BigitemController = require('../../../controller/device/v1/Universe_BigitemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/universe_bigitem/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.addUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.findAllUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.getUniverse_BigitemCount);
router.route('/device/api/v1/universe_bigitem/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.getUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.updateUniverse_Bigitem);    
router.route('/device/api/v1/universe_bigitem/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.partialUpdateUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.softDeleteUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.softDeleteManyUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.bulkInsertUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.bulkUpdateUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.deleteUniverse_Bigitem);
router.route('/device/api/v1/universe_bigitem/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_BigitemController.deleteManyUniverse_Bigitem);

module.exports = router;
