/**
 * MaterialRoutes.js
 * @description :: CRUD API routes for Material
 */

const express = require('express');
const router = express.Router();
const MaterialController = require('../../controller/admin/MaterialController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/material/create').post(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.addMaterial);
router.route('/admin/material/list').post(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.findAllMaterial);
router.route('/admin/material/count').post(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.getMaterialCount);
router.route('/admin/material/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.getMaterial);
router.route('/admin/material/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.updateMaterial);    
router.route('/admin/material/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.partialUpdateMaterial);
router.route('/admin/material/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.softDeleteMaterial);
router.route('/admin/material/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.softDeleteManyMaterial);
router.route('/admin/material/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.bulkInsertMaterial);
router.route('/admin/material/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.bulkUpdateMaterial);
router.route('/admin/material/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.deleteMaterial);
router.route('/admin/material/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,MaterialController.deleteManyMaterial);

module.exports = router;
