/**
 * Base_ChunkRoutes.js
 * @description :: CRUD API routes for Base_Chunk
 */

const express = require('express');
const router = express.Router();
const Base_ChunkController = require('../../../controller/device/v1/Base_ChunkController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/base_chunk/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.addBase_Chunk);
router.route('/device/api/v1/base_chunk/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.findAllBase_Chunk);
router.route('/device/api/v1/base_chunk/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.getBase_ChunkCount);
router.route('/device/api/v1/base_chunk/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.getBase_Chunk);
router.route('/device/api/v1/base_chunk/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.updateBase_Chunk);    
router.route('/device/api/v1/base_chunk/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.partialUpdateBase_Chunk);
router.route('/device/api/v1/base_chunk/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.softDeleteBase_Chunk);
router.route('/device/api/v1/base_chunk/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.softDeleteManyBase_Chunk);
router.route('/device/api/v1/base_chunk/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.bulkInsertBase_Chunk);
router.route('/device/api/v1/base_chunk/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.bulkUpdateBase_Chunk);
router.route('/device/api/v1/base_chunk/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.deleteBase_Chunk);
router.route('/device/api/v1/base_chunk/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_ChunkController.deleteManyBase_Chunk);

module.exports = router;
