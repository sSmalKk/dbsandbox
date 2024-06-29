/**
 * PatternRoutes.js
 * @description :: CRUD API routes for Pattern
 */

const express = require('express');
const router = express.Router();
const PatternController = require('../../controller/admin/PatternController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/pattern/create').post(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.addPattern);
router.route('/admin/pattern/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.findAllPattern);
router.route('/admin/pattern/count').post(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.getPatternCount);
router.route('/admin/pattern/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.getPattern);
router.route('/admin/pattern/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.updatePattern);    
router.route('/admin/pattern/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.partialUpdatePattern);
router.route('/admin/pattern/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.softDeletePattern);
router.route('/admin/pattern/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.softDeleteManyPattern);
router.route('/admin/pattern/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.bulkInsertPattern);
router.route('/admin/pattern/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.bulkUpdatePattern);
router.route('/admin/pattern/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.deletePattern);
router.route('/admin/pattern/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,PatternController.deleteManyPattern);

module.exports = router;
