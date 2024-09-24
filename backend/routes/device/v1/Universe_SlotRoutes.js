/**
 * Universe_SlotRoutes.js
 * @description :: CRUD API routes for Universe_Slot
 */

const express = require('express');
const router = express.Router();
const Universe_SlotController = require('../../../controller/device/v1/Universe_SlotController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/universe_slot/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.addUniverse_Slot);
router.route('/device/api/v1/universe_slot/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.findAllUniverse_Slot);
router.route('/device/api/v1/universe_slot/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.getUniverse_SlotCount);
router.route('/device/api/v1/universe_slot/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.getUniverse_Slot);
router.route('/device/api/v1/universe_slot/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.updateUniverse_Slot);    
router.route('/device/api/v1/universe_slot/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.partialUpdateUniverse_Slot);
router.route('/device/api/v1/universe_slot/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.softDeleteUniverse_Slot);
router.route('/device/api/v1/universe_slot/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.softDeleteManyUniverse_Slot);
router.route('/device/api/v1/universe_slot/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.bulkInsertUniverse_Slot);
router.route('/device/api/v1/universe_slot/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.bulkUpdateUniverse_Slot);
router.route('/device/api/v1/universe_slot/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.deleteUniverse_Slot);
router.route('/device/api/v1/universe_slot/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_SlotController.deleteManyUniverse_Slot);

module.exports = router;
