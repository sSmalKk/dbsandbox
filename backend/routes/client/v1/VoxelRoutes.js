/**
 * VoxelRoutes.js
 * @description :: CRUD API routes for Voxel
 */

const express = require('express');
const router = express.Router();
const VoxelController = require('../../../controller/client/v1/VoxelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const Voxel = require('../../../middleware/Voxel');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/voxel/create').post(auth(PLATFORM.CLIENT),Voxel,checkRolePermission,VoxelController.addVoxel);
router.route('/client/api/v1/voxel/list').post(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.findAllVoxel);
router.route('/client/api/v1/voxel/count').post(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.getVoxelCount);
router.route('/client/api/v1/voxel/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.getVoxel);
router.route('/client/api/v1/voxel/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.updateVoxel);    
router.route('/client/api/v1/voxel/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.partialUpdateVoxel);
router.route('/client/api/v1/voxel/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.softDeleteVoxel);
router.route('/client/api/v1/voxel/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.softDeleteManyVoxel);
router.route('/client/api/v1/voxel/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.bulkInsertVoxel);
router.route('/client/api/v1/voxel/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.bulkUpdateVoxel);
router.route('/client/api/v1/voxel/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.deleteVoxel);
router.route('/client/api/v1/voxel/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,VoxelController.deleteManyVoxel);

module.exports = router;
