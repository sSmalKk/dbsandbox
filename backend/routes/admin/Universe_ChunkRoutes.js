/**
 * Universe_ChunkRoutes.js
 * @description :: CRUD API routes for Universe_Chunk
 */

const express = require('express');
const router = express.Router();
const Universe_ChunkController = require('../../controller/admin/Universe_ChunkController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe_chunk/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.addUniverse_Chunk);
router.route('/admin/universe_chunk/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.findAllUniverse_Chunk);
router.route('/admin/universe_chunk/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.getUniverse_ChunkCount);
router.route('/admin/universe_chunk/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.getUniverse_Chunk);
router.route('/admin/universe_chunk/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.updateUniverse_Chunk);    
router.route('/admin/universe_chunk/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.partialUpdateUniverse_Chunk);
router.route('/admin/universe_chunk/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.softDeleteUniverse_Chunk);
router.route('/admin/universe_chunk/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.softDeleteManyUniverse_Chunk);
router.route('/admin/universe_chunk/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.bulkInsertUniverse_Chunk);
router.route('/admin/universe_chunk/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.bulkUpdateUniverse_Chunk);
router.route('/admin/universe_chunk/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.deleteUniverse_Chunk);
router.route('/admin/universe_chunk/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_ChunkController.deleteManyUniverse_Chunk);

module.exports = router;
