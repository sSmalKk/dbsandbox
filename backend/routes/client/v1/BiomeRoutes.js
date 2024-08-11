/**
 * BiomeRoutes.js
 * @description :: CRUD API routes for Biome
 */

const express = require('express');
const router = express.Router();
const BiomeController = require('../../../controller/client/v1/BiomeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/biome/create').post(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.addBiome);
router.route('/client/api/v1/biome/list').post(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.findAllBiome);
router.route('/client/api/v1/biome/count').post(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.getBiomeCount);
router.route('/client/api/v1/biome/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.getBiome);
router.route('/client/api/v1/biome/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.updateBiome);    
router.route('/client/api/v1/biome/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.partialUpdateBiome);
router.route('/client/api/v1/biome/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.softDeleteBiome);
router.route('/client/api/v1/biome/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.softDeleteManyBiome);
router.route('/client/api/v1/biome/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.bulkInsertBiome);
router.route('/client/api/v1/biome/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.bulkUpdateBiome);
router.route('/client/api/v1/biome/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.deleteBiome);
router.route('/client/api/v1/biome/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,BiomeController.deleteManyBiome);

module.exports = router;
