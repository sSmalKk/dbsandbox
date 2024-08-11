/**
 * BiomeRoutes.js
 * @description :: CRUD API routes for Biome
 */

const express = require('express');
const router = express.Router();
const BiomeController = require('../../controller/admin/BiomeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/biome/create').post(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.addBiome);
router.route('/admin/biome/list').post(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.findAllBiome);
router.route('/admin/biome/count').post(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.getBiomeCount);
router.route('/admin/biome/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.getBiome);
router.route('/admin/biome/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.updateBiome);    
router.route('/admin/biome/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.partialUpdateBiome);
router.route('/admin/biome/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.softDeleteBiome);
router.route('/admin/biome/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.softDeleteManyBiome);
router.route('/admin/biome/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.bulkInsertBiome);
router.route('/admin/biome/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.bulkUpdateBiome);
router.route('/admin/biome/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.deleteBiome);
router.route('/admin/biome/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,BiomeController.deleteManyBiome);

module.exports = router;
