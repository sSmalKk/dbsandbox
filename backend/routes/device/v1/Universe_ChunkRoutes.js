/**
 * Universe_ChunkRoutes.js
 * @description :: CRUD API routes for Universe_Chunk
 */

const express = require('express');
const router = express.Router();
const Universe_ChunkController = require('../../../controller/device/v1/Universe_ChunkController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/universe_chunk/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.addUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.findAllUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.getUniverse_ChunkCount);
router.route('/device/api/v1/universe_chunk/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.getUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.updateUniverse_Chunk);    
router.route('/device/api/v1/universe_chunk/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.partialUpdateUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.softDeleteUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.softDeleteManyUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.bulkInsertUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.bulkUpdateUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.deleteUniverse_Chunk);
router.route('/device/api/v1/universe_chunk/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Universe_ChunkController.deleteManyUniverse_Chunk);

module.exports = router;
