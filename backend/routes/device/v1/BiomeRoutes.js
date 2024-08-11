/**
 * BiomeRoutes.js
 * @description :: CRUD API routes for Biome
 */

const express = require('express');
const router = express.Router();
const BiomeController = require('../../../controller/device/v1/BiomeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/biome/create').post(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.addBiome);
router.route('/device/api/v1/biome/list').post(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.findAllBiome);
router.route('/device/api/v1/biome/count').post(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.getBiomeCount);
router.route('/device/api/v1/biome/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.getBiome);
router.route('/device/api/v1/biome/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.updateBiome);    
router.route('/device/api/v1/biome/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.partialUpdateBiome);
router.route('/device/api/v1/biome/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.softDeleteBiome);
router.route('/device/api/v1/biome/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.softDeleteManyBiome);
router.route('/device/api/v1/biome/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.bulkInsertBiome);
router.route('/device/api/v1/biome/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.bulkUpdateBiome);
router.route('/device/api/v1/biome/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.deleteBiome);
router.route('/device/api/v1/biome/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,BiomeController.deleteManyBiome);

module.exports = router;
