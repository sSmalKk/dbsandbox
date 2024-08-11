/**
 * VoxelRoutes.js
 * @description :: CRUD API routes for Voxel
 */

const express = require('express');
const router = express.Router();
const VoxelController = require('../../../controller/device/v1/VoxelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const Voxel = require('../../../middleware/Voxel');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/voxel/create').post(auth(PLATFORM.DEVICE),Voxel,checkRolePermission,VoxelController.addVoxel);
router.route('/device/api/v1/voxel/list').post(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.findAllVoxel);
router.route('/device/api/v1/voxel/count').post(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.getVoxelCount);
router.route('/device/api/v1/voxel/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.getVoxel);
router.route('/device/api/v1/voxel/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.updateVoxel);    
router.route('/device/api/v1/voxel/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.partialUpdateVoxel);
router.route('/device/api/v1/voxel/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.softDeleteVoxel);
router.route('/device/api/v1/voxel/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.softDeleteManyVoxel);
router.route('/device/api/v1/voxel/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.bulkInsertVoxel);
router.route('/device/api/v1/voxel/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.bulkUpdateVoxel);
router.route('/device/api/v1/voxel/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.deleteVoxel);
router.route('/device/api/v1/voxel/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,VoxelController.deleteManyVoxel);

module.exports = router;
