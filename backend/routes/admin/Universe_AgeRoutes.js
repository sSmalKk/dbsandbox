/**
 * Universe_AgeRoutes.js
 * @description :: CRUD API routes for Universe_Age
 */

const express = require('express');
const router = express.Router();
const Universe_AgeController = require('../../controller/admin/Universe_AgeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe_age/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.addUniverse_Age);
router.route('/admin/universe_age/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.findAllUniverse_Age);
router.route('/admin/universe_age/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.getUniverse_AgeCount);
router.route('/admin/universe_age/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.getUniverse_Age);
router.route('/admin/universe_age/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.updateUniverse_Age);    
router.route('/admin/universe_age/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.partialUpdateUniverse_Age);
router.route('/admin/universe_age/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.softDeleteUniverse_Age);
router.route('/admin/universe_age/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.softDeleteManyUniverse_Age);
router.route('/admin/universe_age/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.bulkInsertUniverse_Age);
router.route('/admin/universe_age/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.bulkUpdateUniverse_Age);
router.route('/admin/universe_age/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.deleteUniverse_Age);
router.route('/admin/universe_age/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_AgeController.deleteManyUniverse_Age);

module.exports = router;
