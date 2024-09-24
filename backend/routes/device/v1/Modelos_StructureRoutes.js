/**
 * Modelos_StructureRoutes.js
 * @description :: CRUD API routes for Modelos_Structure
 */

const express = require('express');
const router = express.Router();
const Modelos_StructureController = require('../../../controller/device/v1/Modelos_StructureController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/modelos_structure/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.addModelos_Structure);
router.route('/device/api/v1/modelos_structure/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.findAllModelos_Structure);
router.route('/device/api/v1/modelos_structure/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.getModelos_StructureCount);
router.route('/device/api/v1/modelos_structure/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.getModelos_Structure);
router.route('/device/api/v1/modelos_structure/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.updateModelos_Structure);    
router.route('/device/api/v1/modelos_structure/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.partialUpdateModelos_Structure);
router.route('/device/api/v1/modelos_structure/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.softDeleteModelos_Structure);
router.route('/device/api/v1/modelos_structure/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.softDeleteManyModelos_Structure);
router.route('/device/api/v1/modelos_structure/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.bulkInsertModelos_Structure);
router.route('/device/api/v1/modelos_structure/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.bulkUpdateModelos_Structure);
router.route('/device/api/v1/modelos_structure/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.deleteModelos_Structure);
router.route('/device/api/v1/modelos_structure/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_StructureController.deleteManyModelos_Structure);

module.exports = router;
