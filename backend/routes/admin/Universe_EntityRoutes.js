/**
 * Universe_EntityRoutes.js
 * @description :: CRUD API routes for Universe_Entity
 */

const express = require('express');
const router = express.Router();
const Universe_EntityController = require('../../controller/admin/Universe_EntityController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe_entity/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.addUniverse_Entity);
router.route('/admin/universe_entity/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.findAllUniverse_Entity);
router.route('/admin/universe_entity/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.getUniverse_EntityCount);
router.route('/admin/universe_entity/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.getUniverse_Entity);
router.route('/admin/universe_entity/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.updateUniverse_Entity);    
router.route('/admin/universe_entity/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.partialUpdateUniverse_Entity);
router.route('/admin/universe_entity/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.softDeleteUniverse_Entity);
router.route('/admin/universe_entity/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.softDeleteManyUniverse_Entity);
router.route('/admin/universe_entity/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.bulkInsertUniverse_Entity);
router.route('/admin/universe_entity/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.bulkUpdateUniverse_Entity);
router.route('/admin/universe_entity/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.deleteUniverse_Entity);
router.route('/admin/universe_entity/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_EntityController.deleteManyUniverse_Entity);

module.exports = router;
