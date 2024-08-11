/**
 * VoxelRoutes.js
 * @description :: CRUD API routes for Voxel
 */

const express = require('express');
const router = express.Router();
const VoxelController = require('../../controller/admin/VoxelController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const Voxel = require('../../middleware/Voxel');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/voxel/create').post(auth(PLATFORM.ADMIN),Voxel,checkRolePermission,VoxelController.addVoxel);
router.route('/admin/voxel/list').post(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.findAllVoxel);
router.route('/admin/voxel/count').post(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.getVoxelCount);
router.route('/admin/voxel/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.getVoxel);
router.route('/admin/voxel/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.updateVoxel);    
router.route('/admin/voxel/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.partialUpdateVoxel);
router.route('/admin/voxel/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.softDeleteVoxel);
router.route('/admin/voxel/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.softDeleteManyVoxel);
router.route('/admin/voxel/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.bulkInsertVoxel);
router.route('/admin/voxel/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.bulkUpdateVoxel);
router.route('/admin/voxel/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.deleteVoxel);
router.route('/admin/voxel/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,VoxelController.deleteManyVoxel);

module.exports = router;
