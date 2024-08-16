/**
 * lobbyRoutes.js
 * @description :: CRUD API routes for lobby
 */

const express = require('express');
const router = express.Router();
const lobbyController = require('../../controller/admin/lobbyController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/lobby/create').post(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.addLobby);
router.route('/admin/lobby/list').post(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.findAllLobby);
router.route('/admin/lobby/count').post(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.getLobbyCount);
router.route('/admin/lobby/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.getLobby);
router.route('/admin/lobby/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.updateLobby);    
router.route('/admin/lobby/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.partialUpdateLobby);
router.route('/admin/lobby/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.softDeleteLobby);
router.route('/admin/lobby/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.softDeleteManyLobby);
router.route('/admin/lobby/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.bulkInsertLobby);
router.route('/admin/lobby/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.bulkUpdateLobby);
router.route('/admin/lobby/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.deleteLobby);
router.route('/admin/lobby/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,lobbyController.deleteManyLobby);

module.exports = router;
