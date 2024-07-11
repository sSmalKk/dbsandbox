/**
 * materialRoutes.js
 * @description :: CRUD API routes for material
 */

const express = require('express');
const router = express.Router();
const materialController = require('../../../controller/client/v1/materialController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/material/create').post(auth(PLATFORM.CLIENT),checkRolePermission,materialController.addMaterial);
router.route('/client/api/v1/material/list').post(auth(PLATFORM.CLIENT),checkRolePermission,materialController.findAllMaterial);
router.route('/client/api/v1/material/count').post(auth(PLATFORM.CLIENT),checkRolePermission,materialController.getMaterialCount);
router.route('/client/api/v1/material/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,materialController.getMaterial);
router.route('/client/api/v1/material/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,materialController.updateMaterial);    
router.route('/client/api/v1/material/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,materialController.partialUpdateMaterial);
router.route('/client/api/v1/material/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,materialController.softDeleteMaterial);
router.route('/client/api/v1/material/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,materialController.softDeleteManyMaterial);
router.route('/client/api/v1/material/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,materialController.bulkInsertMaterial);
router.route('/client/api/v1/material/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,materialController.bulkUpdateMaterial);
router.route('/client/api/v1/material/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,materialController.deleteMaterial);
router.route('/client/api/v1/material/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,materialController.deleteManyMaterial);

module.exports = router;
