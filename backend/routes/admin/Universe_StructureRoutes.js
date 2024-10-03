/**
 * Universe_StructureRoutes.js
 * @description :: CRUD API routes for Universe_Structure
 */

const express = require('express');
const router = express.Router();
const Universe_StructureController = require('../../controller/admin/Universe_StructureController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe_structure/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.addUniverse_Structure);
router.route('/admin/universe_structure/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.findAllUniverse_Structure);
router.route('/admin/universe_structure/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.getUniverse_StructureCount);
router.route('/admin/universe_structure/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.getUniverse_Structure);
router.route('/admin/universe_structure/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.updateUniverse_Structure);    
router.route('/admin/universe_structure/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.partialUpdateUniverse_Structure);
router.route('/admin/universe_structure/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.softDeleteUniverse_Structure);
router.route('/admin/universe_structure/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.softDeleteManyUniverse_Structure);
router.route('/admin/universe_structure/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.bulkInsertUniverse_Structure);
router.route('/admin/universe_structure/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.bulkUpdateUniverse_Structure);
router.route('/admin/universe_structure/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.deleteUniverse_Structure);
router.route('/admin/universe_structure/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_StructureController.deleteManyUniverse_Structure);

module.exports = router;
