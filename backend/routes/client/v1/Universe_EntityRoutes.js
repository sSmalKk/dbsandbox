/**
 * Universe_EntityRoutes.js
 * @description :: CRUD API routes for Universe_Entity
 */

const express = require('express');
const router = express.Router();
const Universe_EntityController = require('../../../controller/client/v1/Universe_EntityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/universe_entity/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.addUniverse_Entity);
router.route('/client/api/v1/universe_entity/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.findAllUniverse_Entity);
router.route('/client/api/v1/universe_entity/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.getUniverse_EntityCount);
router.route('/client/api/v1/universe_entity/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.getUniverse_Entity);
router.route('/client/api/v1/universe_entity/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.updateUniverse_Entity);    
router.route('/client/api/v1/universe_entity/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.partialUpdateUniverse_Entity);
router.route('/client/api/v1/universe_entity/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.softDeleteUniverse_Entity);
router.route('/client/api/v1/universe_entity/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.softDeleteManyUniverse_Entity);
router.route('/client/api/v1/universe_entity/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.bulkInsertUniverse_Entity);
router.route('/client/api/v1/universe_entity/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.bulkUpdateUniverse_Entity);
router.route('/client/api/v1/universe_entity/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.deleteUniverse_Entity);
router.route('/client/api/v1/universe_entity/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_EntityController.deleteManyUniverse_Entity);

module.exports = router;
