/**
 * roomtemplateRoutes.js
 * @description :: CRUD API routes for roomtemplate
 */

const express = require('express');
const router = express.Router();
const roomtemplateController = require('../../../controller/device/v1/roomtemplateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const Coord = require('../../../middleware/Coord');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/roomtemplate/create').post(auth(PLATFORM.DEVICE),Coord,checkRolePermission,roomtemplateController.addRoomtemplate);
router.route('/device/api/v1/roomtemplate/list').post(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.findAllRoomtemplate);
router.route('/device/api/v1/roomtemplate/count').post(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.getRoomtemplateCount);
router.route('/device/api/v1/roomtemplate/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.getRoomtemplate);
router.route('/device/api/v1/roomtemplate/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.updateRoomtemplate);    
router.route('/device/api/v1/roomtemplate/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.partialUpdateRoomtemplate);
router.route('/device/api/v1/roomtemplate/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.softDeleteRoomtemplate);
router.route('/device/api/v1/roomtemplate/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.softDeleteManyRoomtemplate);
router.route('/device/api/v1/roomtemplate/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.bulkInsertRoomtemplate);
router.route('/device/api/v1/roomtemplate/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.bulkUpdateRoomtemplate);
router.route('/device/api/v1/roomtemplate/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.deleteRoomtemplate);
router.route('/device/api/v1/roomtemplate/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,roomtemplateController.deleteManyRoomtemplate);

module.exports = router;
