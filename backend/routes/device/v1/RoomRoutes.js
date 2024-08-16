/**
 * RoomRoutes.js
 * @description :: CRUD API routes for Room
 */

const express = require('express');
const router = express.Router();
const RoomController = require('../../../controller/device/v1/RoomController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/room/create').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.addRoom);
router.route('/device/api/v1/room/list').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.findAllRoom);
router.route('/device/api/v1/room/count').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.getRoomCount);
router.route('/device/api/v1/room/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.getRoom);
router.route('/device/api/v1/room/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.updateRoom);    
router.route('/device/api/v1/room/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.partialUpdateRoom);
router.route('/device/api/v1/room/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.softDeleteRoom);
router.route('/device/api/v1/room/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.softDeleteManyRoom);
router.route('/device/api/v1/room/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.bulkInsertRoom);
router.route('/device/api/v1/room/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.bulkUpdateRoom);
router.route('/device/api/v1/room/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.deleteRoom);
router.route('/device/api/v1/room/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,RoomController.deleteManyRoom);

module.exports = router;
