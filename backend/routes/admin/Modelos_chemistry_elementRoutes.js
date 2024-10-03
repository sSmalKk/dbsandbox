/**
 * Modelos_chemistry_elementRoutes.js
 * @description :: CRUD API routes for Modelos_chemistry_element
 */

const express = require('express');
const router = express.Router();
const Modelos_chemistry_elementController = require('../../controller/admin/Modelos_chemistry_elementController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_chemistry_element/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.addModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.findAllModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.getModelos_chemistry_elementCount);
router.route('/admin/modelos_chemistry_element/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.getModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.updateModelos_chemistry_element);    
router.route('/admin/modelos_chemistry_element/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.partialUpdateModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.softDeleteModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.softDeleteManyModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.bulkInsertModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.bulkUpdateModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.deleteModelos_chemistry_element);
router.route('/admin/modelos_chemistry_element/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_chemistry_elementController.deleteManyModelos_chemistry_element);

module.exports = router;
