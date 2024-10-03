/**
 * Modelos_SizeRoutes.js
 * @description :: CRUD API routes for Modelos_Size
 */

const express = require('express');
const router = express.Router();
const Modelos_SizeController = require('../../controller/admin/Modelos_SizeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_size/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.addModelos_Size);
router.route('/admin/modelos_size/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.findAllModelos_Size);
router.route('/admin/modelos_size/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.getModelos_SizeCount);
router.route('/admin/modelos_size/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.getModelos_Size);
router.route('/admin/modelos_size/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.updateModelos_Size);    
router.route('/admin/modelos_size/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.partialUpdateModelos_Size);
router.route('/admin/modelos_size/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.softDeleteModelos_Size);
router.route('/admin/modelos_size/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.softDeleteManyModelos_Size);
router.route('/admin/modelos_size/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.bulkInsertModelos_Size);
router.route('/admin/modelos_size/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.bulkUpdateModelos_Size);
router.route('/admin/modelos_size/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.deleteModelos_Size);
router.route('/admin/modelos_size/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_SizeController.deleteManyModelos_Size);

module.exports = router;
