/**
 * universeRoutes.js
 * @description :: CRUD API routes for universe
 */

const express = require('express');
const router = express.Router();
const universeController = require('../../controller/admin/universeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe/create').post(auth(PLATFORM.ADMIN),checkRolePermission,universeController.addUniverse);
router.route('/admin/universe/list').post(auth(PLATFORM.ADMIN),checkRolePermission,universeController.findAllUniverse);
router.route('/admin/universe/count').post(auth(PLATFORM.ADMIN),checkRolePermission,universeController.getUniverseCount);
router.route('/admin/universe/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,universeController.getUniverse);
router.route('/admin/universe/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,universeController.updateUniverse);    
router.route('/admin/universe/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,universeController.partialUpdateUniverse);
router.route('/admin/universe/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,universeController.softDeleteUniverse);
router.route('/admin/universe/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,universeController.softDeleteManyUniverse);
router.route('/admin/universe/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,universeController.bulkInsertUniverse);
router.route('/admin/universe/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,universeController.bulkUpdateUniverse);
router.route('/admin/universe/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,universeController.deleteUniverse);
router.route('/admin/universe/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,universeController.deleteManyUniverse);

module.exports = router;
