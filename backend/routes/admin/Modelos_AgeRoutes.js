/**
 * Modelos_AgeRoutes.js
 * @description :: CRUD API routes for Modelos_Age
 */

const express = require('express');
const router = express.Router();
const Modelos_AgeController = require('../../controller/admin/Modelos_AgeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_age/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.addModelos_Age);
router.route('/admin/modelos_age/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.findAllModelos_Age);
router.route('/admin/modelos_age/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.getModelos_AgeCount);
router.route('/admin/modelos_age/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.getModelos_Age);
router.route('/admin/modelos_age/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.updateModelos_Age);    
router.route('/admin/modelos_age/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.partialUpdateModelos_Age);
router.route('/admin/modelos_age/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.softDeleteModelos_Age);
router.route('/admin/modelos_age/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.softDeleteManyModelos_Age);
router.route('/admin/modelos_age/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.bulkInsertModelos_Age);
router.route('/admin/modelos_age/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.bulkUpdateModelos_Age);
router.route('/admin/modelos_age/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.deleteModelos_Age);
router.route('/admin/modelos_age/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_AgeController.deleteManyModelos_Age);

module.exports = router;
