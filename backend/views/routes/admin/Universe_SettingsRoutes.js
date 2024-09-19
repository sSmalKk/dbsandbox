/**
 * Universe_SettingsRoutes.js
 * @description :: CRUD API routes for Universe_Settings
 */

const express = require('express');
const router = express.Router();
const Universe_SettingsController = require('../../controller/admin/Universe_SettingsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe_settings/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.addUniverse_Settings);
router.route('/admin/universe_settings/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.findAllUniverse_Settings);
router.route('/admin/universe_settings/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.getUniverse_SettingsCount);
router.route('/admin/universe_settings/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.getUniverse_Settings);
router.route('/admin/universe_settings/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.updateUniverse_Settings);    
router.route('/admin/universe_settings/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.partialUpdateUniverse_Settings);
router.route('/admin/universe_settings/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.softDeleteUniverse_Settings);
router.route('/admin/universe_settings/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.softDeleteManyUniverse_Settings);
router.route('/admin/universe_settings/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.bulkInsertUniverse_Settings);
router.route('/admin/universe_settings/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.bulkUpdateUniverse_Settings);
router.route('/admin/universe_settings/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.deleteUniverse_Settings);
router.route('/admin/universe_settings/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_SettingsController.deleteManyUniverse_Settings);

module.exports = router;
