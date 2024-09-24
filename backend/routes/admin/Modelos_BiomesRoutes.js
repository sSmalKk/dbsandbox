/**
 * Modelos_BiomesRoutes.js
 * @description :: CRUD API routes for Modelos_Biomes
 */

const express = require('express');
const router = express.Router();
const Modelos_BiomesController = require('../../controller/admin/Modelos_BiomesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_biomes/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.addModelos_Biomes);
router.route('/admin/modelos_biomes/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.findAllModelos_Biomes);
router.route('/admin/modelos_biomes/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.getModelos_BiomesCount);
router.route('/admin/modelos_biomes/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.getModelos_Biomes);
router.route('/admin/modelos_biomes/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.updateModelos_Biomes);    
router.route('/admin/modelos_biomes/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.partialUpdateModelos_Biomes);
router.route('/admin/modelos_biomes/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.softDeleteModelos_Biomes);
router.route('/admin/modelos_biomes/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.softDeleteManyModelos_Biomes);
router.route('/admin/modelos_biomes/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.bulkInsertModelos_Biomes);
router.route('/admin/modelos_biomes/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.bulkUpdateModelos_Biomes);
router.route('/admin/modelos_biomes/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.deleteModelos_Biomes);
router.route('/admin/modelos_biomes/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_BiomesController.deleteManyModelos_Biomes);

module.exports = router;
