/**
 * materialRoutes.js
 * @description :: CRUD API routes for material
 */

const express = require('express');
const router = express.Router();
const materialController = require('../../../controller/device/v1/materialController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/material/create').post(auth(PLATFORM.DEVICE),checkRolePermission,materialController.addMaterial);
router.route('/device/api/v1/material/list').post(auth(PLATFORM.DEVICE),checkRolePermission,materialController.findAllMaterial);
router.route('/device/api/v1/material/count').post(auth(PLATFORM.DEVICE),checkRolePermission,materialController.getMaterialCount);
router.route('/device/api/v1/material/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,materialController.getMaterial);
router.route('/device/api/v1/material/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,materialController.updateMaterial);    
router.route('/device/api/v1/material/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,materialController.partialUpdateMaterial);
router.route('/device/api/v1/material/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,materialController.softDeleteMaterial);
router.route('/device/api/v1/material/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,materialController.softDeleteManyMaterial);
router.route('/device/api/v1/material/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,materialController.bulkInsertMaterial);
router.route('/device/api/v1/material/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,materialController.bulkUpdateMaterial);
router.route('/device/api/v1/material/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,materialController.deleteMaterial);
router.route('/device/api/v1/material/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,materialController.deleteManyMaterial);

module.exports = router;
