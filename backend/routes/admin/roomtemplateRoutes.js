/**
 * roomtemplateRoutes.js
 * @description :: CRUD API routes for roomtemplate
 */

const express = require('express');
const router = express.Router();
const roomtemplateController = require('../../controller/admin/roomtemplateController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const Coord = require('../../middleware/Coord');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/roomtemplate/create').post(auth(PLATFORM.ADMIN),Coord,checkRolePermission,roomtemplateController.addRoomtemplate);
router.route('/admin/roomtemplate/list').post(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.findAllRoomtemplate);
router.route('/admin/roomtemplate/count').post(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.getRoomtemplateCount);
router.route('/admin/roomtemplate/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.getRoomtemplate);
router.route('/admin/roomtemplate/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.updateRoomtemplate);    
router.route('/admin/roomtemplate/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.partialUpdateRoomtemplate);
router.route('/admin/roomtemplate/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.softDeleteRoomtemplate);
router.route('/admin/roomtemplate/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.softDeleteManyRoomtemplate);
router.route('/admin/roomtemplate/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.bulkInsertRoomtemplate);
router.route('/admin/roomtemplate/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.bulkUpdateRoomtemplate);
router.route('/admin/roomtemplate/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.deleteRoomtemplate);
router.route('/admin/roomtemplate/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,roomtemplateController.deleteManyRoomtemplate);

module.exports = router;
