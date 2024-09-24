/**
 * Modelos_BiomesRoutes.js
 * @description :: CRUD API routes for Modelos_Biomes
 */

const express = require('express');
const router = express.Router();
const Modelos_BiomesController = require('../../../controller/client/v1/Modelos_BiomesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_biomes/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.addModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.findAllModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.getModelos_BiomesCount);
router.route('/client/api/v1/modelos_biomes/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.getModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.updateModelos_Biomes);    
router.route('/client/api/v1/modelos_biomes/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.partialUpdateModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.softDeleteModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.softDeleteManyModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.bulkInsertModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.bulkUpdateModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.deleteModelos_Biomes);
router.route('/client/api/v1/modelos_biomes/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_BiomesController.deleteManyModelos_Biomes);

module.exports = router;
