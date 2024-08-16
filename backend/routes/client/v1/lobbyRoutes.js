/**
 * lobbyRoutes.js
 * @description :: CRUD API routes for lobby
 */

const express = require('express');
const router = express.Router();
const lobbyController = require('../../../controller/client/v1/lobbyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/lobby/create').post(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.addLobby);
router.route('/client/api/v1/lobby/list').post(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.findAllLobby);
router.route('/client/api/v1/lobby/count').post(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.getLobbyCount);
router.route('/client/api/v1/lobby/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.getLobby);
router.route('/client/api/v1/lobby/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.updateLobby);    
router.route('/client/api/v1/lobby/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.partialUpdateLobby);
router.route('/client/api/v1/lobby/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.softDeleteLobby);
router.route('/client/api/v1/lobby/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.softDeleteManyLobby);
router.route('/client/api/v1/lobby/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.bulkInsertLobby);
router.route('/client/api/v1/lobby/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.bulkUpdateLobby);
router.route('/client/api/v1/lobby/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.deleteLobby);
router.route('/client/api/v1/lobby/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,lobbyController.deleteManyLobby);

module.exports = router;
