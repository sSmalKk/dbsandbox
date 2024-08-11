/**
 * TickRoutes.js
 * @description :: CRUD API routes for Tick
 */

const express = require('express');
const router = express.Router();
const TickController = require('../../../controller/device/v1/TickController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/tick/create').post(auth(PLATFORM.DEVICE),checkRolePermission,TickController.addTick);
router.route('/device/api/v1/tick/list').post(auth(PLATFORM.DEVICE),checkRolePermission,TickController.findAllTick);
router.route('/device/api/v1/tick/count').post(auth(PLATFORM.DEVICE),checkRolePermission,TickController.getTickCount);
router.route('/device/api/v1/tick/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,TickController.getTick);
router.route('/device/api/v1/tick/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TickController.updateTick);    
router.route('/device/api/v1/tick/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TickController.partialUpdateTick);
router.route('/device/api/v1/tick/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TickController.softDeleteTick);
router.route('/device/api/v1/tick/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,TickController.softDeleteManyTick);
router.route('/device/api/v1/tick/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,TickController.bulkInsertTick);
router.route('/device/api/v1/tick/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,TickController.bulkUpdateTick);
router.route('/device/api/v1/tick/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,TickController.deleteTick);
router.route('/device/api/v1/tick/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,TickController.deleteManyTick);

module.exports = router;
