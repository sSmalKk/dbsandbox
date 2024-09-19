/**
 * Universe_SettingsRoutes.js
 * @description :: CRUD API routes for Universe_Settings
 */

const express = require('express');
const router = express.Router();
const Universe_SettingsController = require('../../../controller/client/v1/Universe_SettingsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/universe_settings/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.addUniverse_Settings);
router.route('/client/api/v1/universe_settings/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.findAllUniverse_Settings);
router.route('/client/api/v1/universe_settings/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.getUniverse_SettingsCount);
router.route('/client/api/v1/universe_settings/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.getUniverse_Settings);
router.route('/client/api/v1/universe_settings/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.updateUniverse_Settings);    
router.route('/client/api/v1/universe_settings/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.partialUpdateUniverse_Settings);
router.route('/client/api/v1/universe_settings/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.softDeleteUniverse_Settings);
router.route('/client/api/v1/universe_settings/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.softDeleteManyUniverse_Settings);
router.route('/client/api/v1/universe_settings/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.bulkInsertUniverse_Settings);
router.route('/client/api/v1/universe_settings/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.bulkUpdateUniverse_Settings);
router.route('/client/api/v1/universe_settings/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.deleteUniverse_Settings);
router.route('/client/api/v1/universe_settings/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_SettingsController.deleteManyUniverse_Settings);

module.exports = router;
