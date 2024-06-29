/**
 * PatternRoutes.js
 * @description :: CRUD API routes for Pattern
 */

const express = require('express');
const router = express.Router();
const PatternController = require('../../../controller/device/v1/PatternController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/pattern/create').post(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.addPattern);
router.route('/device/api/v1/pattern/list').post(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.findAllPattern);
router.route('/device/api/v1/pattern/count').post(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.getPatternCount);
router.route('/device/api/v1/pattern/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.getPattern);
router.route('/device/api/v1/pattern/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.updatePattern);    
router.route('/device/api/v1/pattern/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.partialUpdatePattern);
router.route('/device/api/v1/pattern/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.softDeletePattern);
router.route('/device/api/v1/pattern/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.softDeleteManyPattern);
router.route('/device/api/v1/pattern/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.bulkInsertPattern);
router.route('/device/api/v1/pattern/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.bulkUpdatePattern);
router.route('/device/api/v1/pattern/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.deletePattern);
router.route('/device/api/v1/pattern/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,PatternController.deleteManyPattern);

module.exports = router;
