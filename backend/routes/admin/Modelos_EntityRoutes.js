/**
 * Modelos_EntityRoutes.js
 * @description :: CRUD API routes for Modelos_Entity
 */

const express = require('express');
const router = express.Router();
const Modelos_EntityController = require('../../controller/admin/Modelos_EntityController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_entity/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.addModelos_Entity);
router.route('/admin/modelos_entity/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.findAllModelos_Entity);
router.route('/admin/modelos_entity/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.getModelos_EntityCount);
router.route('/admin/modelos_entity/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.getModelos_Entity);
router.route('/admin/modelos_entity/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.updateModelos_Entity);    
router.route('/admin/modelos_entity/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.partialUpdateModelos_Entity);
router.route('/admin/modelos_entity/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.softDeleteModelos_Entity);
router.route('/admin/modelos_entity/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.softDeleteManyModelos_Entity);
router.route('/admin/modelos_entity/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.bulkInsertModelos_Entity);
router.route('/admin/modelos_entity/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.bulkUpdateModelos_Entity);
router.route('/admin/modelos_entity/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.deleteModelos_Entity);
router.route('/admin/modelos_entity/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_EntityController.deleteManyModelos_Entity);

module.exports = router;
