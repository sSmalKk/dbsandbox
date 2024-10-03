/**
 * Modelos_PartRoutes.js
 * @description :: CRUD API routes for Modelos_Part
 */

const express = require('express');
const router = express.Router();
const Modelos_PartController = require('../../controller/admin/Modelos_PartController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_part/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.addModelos_Part);
router.route('/admin/modelos_part/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.findAllModelos_Part);
router.route('/admin/modelos_part/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.getModelos_PartCount);
router.route('/admin/modelos_part/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.getModelos_Part);
router.route('/admin/modelos_part/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.updateModelos_Part);    
router.route('/admin/modelos_part/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.partialUpdateModelos_Part);
router.route('/admin/modelos_part/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.softDeleteModelos_Part);
router.route('/admin/modelos_part/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.softDeleteManyModelos_Part);
router.route('/admin/modelos_part/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.bulkInsertModelos_Part);
router.route('/admin/modelos_part/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.bulkUpdateModelos_Part);
router.route('/admin/modelos_part/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.deleteModelos_Part);
router.route('/admin/modelos_part/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_PartController.deleteManyModelos_Part);

module.exports = router;
