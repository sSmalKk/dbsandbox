/**
 * RoomRoutes.js
 * @description :: CRUD API routes for Room
 */

const express = require('express');
const router = express.Router();
const RoomController = require('../../../controller/client/v1/RoomController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/room/create').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.addRoom);
router.route('/client/api/v1/room/list').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.findAllRoom);
router.route('/client/api/v1/room/count').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.getRoomCount);
router.route('/client/api/v1/room/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.getRoom);
router.route('/client/api/v1/room/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.updateRoom);    
router.route('/client/api/v1/room/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.partialUpdateRoom);
router.route('/client/api/v1/room/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.softDeleteRoom);
router.route('/client/api/v1/room/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.softDeleteManyRoom);
router.route('/client/api/v1/room/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.bulkInsertRoom);
router.route('/client/api/v1/room/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.bulkUpdateRoom);
router.route('/client/api/v1/room/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.deleteRoom);
router.route('/client/api/v1/room/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,RoomController.deleteManyRoom);

module.exports = router;
