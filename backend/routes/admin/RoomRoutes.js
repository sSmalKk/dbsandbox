/**
 * RoomRoutes.js
 * @description :: CRUD API routes for Room
 */

const express = require('express');
const router = express.Router();
const RoomController = require('../../controller/admin/RoomController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/room/create').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.addRoom);
router.route('/admin/room/list').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.findAllRoom);
router.route('/admin/room/count').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.getRoomCount);
router.route('/admin/room/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.getRoom);
router.route('/admin/room/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.updateRoom);    
router.route('/admin/room/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.partialUpdateRoom);
router.route('/admin/room/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.softDeleteRoom);
router.route('/admin/room/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.softDeleteManyRoom);
router.route('/admin/room/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.bulkInsertRoom);
router.route('/admin/room/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.bulkUpdateRoom);
router.route('/admin/room/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.deleteRoom);
router.route('/admin/room/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,RoomController.deleteManyRoom);

module.exports = router;
