/**
 * PartRoutes.js
 * @description :: CRUD API routes for Part
 */

const express = require('express');
const router = express.Router();
const PartController = require('../../controller/admin/PartController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/part/create').post(auth(PLATFORM.ADMIN),checkRolePermission,PartController.addPart);
router.route('/admin/part/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PartController.findAllPart);
router.route('/admin/part/count').post(auth(PLATFORM.ADMIN),checkRolePermission,PartController.getPartCount);
router.route('/admin/part/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PartController.getPart);
router.route('/admin/part/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PartController.updatePart);    
router.route('/admin/part/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PartController.partialUpdatePart);
router.route('/admin/part/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PartController.softDeletePart);
router.route('/admin/part/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,PartController.softDeleteManyPart);
router.route('/admin/part/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,PartController.bulkInsertPart);
router.route('/admin/part/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,PartController.bulkUpdatePart);
router.route('/admin/part/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,PartController.deletePart);
router.route('/admin/part/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,PartController.deleteManyPart);

module.exports = router;
