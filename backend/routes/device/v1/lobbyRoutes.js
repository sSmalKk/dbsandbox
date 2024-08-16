/**
 * lobbyRoutes.js
 * @description :: CRUD API routes for lobby
 */

const express = require('express');
const router = express.Router();
const lobbyController = require('../../../controller/device/v1/lobbyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/lobby/create').post(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.addLobby);
router.route('/device/api/v1/lobby/list').post(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.findAllLobby);
router.route('/device/api/v1/lobby/count').post(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.getLobbyCount);
router.route('/device/api/v1/lobby/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.getLobby);
router.route('/device/api/v1/lobby/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.updateLobby);    
router.route('/device/api/v1/lobby/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.partialUpdateLobby);
router.route('/device/api/v1/lobby/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.softDeleteLobby);
router.route('/device/api/v1/lobby/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.softDeleteManyLobby);
router.route('/device/api/v1/lobby/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.bulkInsertLobby);
router.route('/device/api/v1/lobby/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.bulkUpdateLobby);
router.route('/device/api/v1/lobby/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.deleteLobby);
router.route('/device/api/v1/lobby/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,lobbyController.deleteManyLobby);

module.exports = router;
