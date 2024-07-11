/**
 * chunkRoutes.js
 * @description :: CRUD API routes for chunk
 */

const express = require('express');
const router = express.Router();
const chunkController = require('../../../controller/device/v1/chunkController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/chunk/create').post(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.addChunk);
router.route('/device/api/v1/chunk/list').post(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.findAllChunk);
router.route('/device/api/v1/chunk/count').post(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.getChunkCount);
router.route('/device/api/v1/chunk/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.getChunk);
router.route('/device/api/v1/chunk/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.updateChunk);    
router.route('/device/api/v1/chunk/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.partialUpdateChunk);
router.route('/device/api/v1/chunk/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.softDeleteChunk);
router.route('/device/api/v1/chunk/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.softDeleteManyChunk);
router.route('/device/api/v1/chunk/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.bulkInsertChunk);
router.route('/device/api/v1/chunk/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.bulkUpdateChunk);
router.route('/device/api/v1/chunk/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.deleteChunk);
router.route('/device/api/v1/chunk/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,chunkController.deleteManyChunk);

module.exports = router;
