/**
 * PartRoutes.js
 * @description :: CRUD API routes for Part
 */

const express = require('express');
const router = express.Router();
const PartController = require('../../../controller/device/v1/PartController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/part/create').post(auth(PLATFORM.DEVICE),checkRolePermission,PartController.addPart);
router.route('/device/api/v1/part/list').post(auth(PLATFORM.DEVICE),checkRolePermission,PartController.findAllPart);
router.route('/device/api/v1/part/count').post(auth(PLATFORM.DEVICE),checkRolePermission,PartController.getPartCount);
router.route('/device/api/v1/part/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,PartController.getPart);
router.route('/device/api/v1/part/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PartController.updatePart);    
router.route('/device/api/v1/part/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PartController.partialUpdatePart);
router.route('/device/api/v1/part/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PartController.softDeletePart);
router.route('/device/api/v1/part/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,PartController.softDeleteManyPart);
router.route('/device/api/v1/part/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,PartController.bulkInsertPart);
router.route('/device/api/v1/part/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,PartController.bulkUpdatePart);
router.route('/device/api/v1/part/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,PartController.deletePart);
router.route('/device/api/v1/part/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,PartController.deleteManyPart);

module.exports = router;
