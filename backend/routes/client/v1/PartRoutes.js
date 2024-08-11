/**
 * PartRoutes.js
 * @description :: CRUD API routes for Part
 */

const express = require('express');
const router = express.Router();
const PartController = require('../../../controller/client/v1/PartController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/part/create').post(auth(PLATFORM.CLIENT),checkRolePermission,PartController.addPart);
router.route('/client/api/v1/part/list').post(auth(PLATFORM.CLIENT),checkRolePermission,PartController.findAllPart);
router.route('/client/api/v1/part/count').post(auth(PLATFORM.CLIENT),checkRolePermission,PartController.getPartCount);
router.route('/client/api/v1/part/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,PartController.getPart);
router.route('/client/api/v1/part/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PartController.updatePart);    
router.route('/client/api/v1/part/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PartController.partialUpdatePart);
router.route('/client/api/v1/part/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,PartController.softDeletePart);
router.route('/client/api/v1/part/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,PartController.softDeleteManyPart);
router.route('/client/api/v1/part/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,PartController.bulkInsertPart);
router.route('/client/api/v1/part/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,PartController.bulkUpdatePart);
router.route('/client/api/v1/part/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,PartController.deletePart);
router.route('/client/api/v1/part/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,PartController.deleteManyPart);

module.exports = router;
