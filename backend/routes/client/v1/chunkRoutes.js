/**
 * chunkRoutes.js
 * @description :: CRUD API routes for chunk
 */

const express = require('express');
const router = express.Router();
const chunkController = require('../../../controller/client/v1/chunkController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/chunk/create').post(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.addChunk);
router.route('/client/api/v1/chunk/list').post(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.findAllChunk);
router.route('/client/api/v1/chunk/count').post(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.getChunkCount);
router.route('/client/api/v1/chunk/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.getChunk);
router.route('/client/api/v1/chunk/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.updateChunk);    
router.route('/client/api/v1/chunk/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.partialUpdateChunk);
router.route('/client/api/v1/chunk/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.softDeleteChunk);
router.route('/client/api/v1/chunk/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.softDeleteManyChunk);
router.route('/client/api/v1/chunk/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.bulkInsertChunk);
router.route('/client/api/v1/chunk/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.bulkUpdateChunk);
router.route('/client/api/v1/chunk/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.deleteChunk);
router.route('/client/api/v1/chunk/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,chunkController.deleteManyChunk);

module.exports = router;
