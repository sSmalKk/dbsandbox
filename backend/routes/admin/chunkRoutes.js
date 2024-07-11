/**
 * chunkRoutes.js
 * @description :: CRUD API routes for chunk
 */

const express = require('express');
const router = express.Router();
const chunkController = require('../../controller/admin/chunkController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/chunk/create').post(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.addChunk);
router.route('/admin/chunk/list').post(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.findAllChunk);
router.route('/admin/chunk/count').post(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.getChunkCount);
router.route('/admin/chunk/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.getChunk);
router.route('/admin/chunk/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.updateChunk);    
router.route('/admin/chunk/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.partialUpdateChunk);
router.route('/admin/chunk/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.softDeleteChunk);
router.route('/admin/chunk/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.softDeleteManyChunk);
router.route('/admin/chunk/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.bulkInsertChunk);
router.route('/admin/chunk/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.bulkUpdateChunk);
router.route('/admin/chunk/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.deleteChunk);
router.route('/admin/chunk/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,chunkController.deleteManyChunk);

module.exports = router;
