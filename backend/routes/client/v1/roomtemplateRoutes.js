/**
 * roomtemplateRoutes.js
 * @description :: CRUD API routes for roomtemplate
 */

const express = require('express');
const router = express.Router();
const roomtemplateController = require('../../../controller/client/v1/roomtemplateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const Coord = require('../../../middleware/Coord');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/roomtemplate/create').post(auth(PLATFORM.CLIENT),Coord,checkRolePermission,roomtemplateController.addRoomtemplate);
router.route('/client/api/v1/roomtemplate/list').post(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.findAllRoomtemplate);
router.route('/client/api/v1/roomtemplate/count').post(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.getRoomtemplateCount);
router.route('/client/api/v1/roomtemplate/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.getRoomtemplate);
router.route('/client/api/v1/roomtemplate/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.updateRoomtemplate);    
router.route('/client/api/v1/roomtemplate/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.partialUpdateRoomtemplate);
router.route('/client/api/v1/roomtemplate/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.softDeleteRoomtemplate);
router.route('/client/api/v1/roomtemplate/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.softDeleteManyRoomtemplate);
router.route('/client/api/v1/roomtemplate/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.bulkInsertRoomtemplate);
router.route('/client/api/v1/roomtemplate/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.bulkUpdateRoomtemplate);
router.route('/client/api/v1/roomtemplate/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.deleteRoomtemplate);
router.route('/client/api/v1/roomtemplate/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,roomtemplateController.deleteManyRoomtemplate);

module.exports = router;
