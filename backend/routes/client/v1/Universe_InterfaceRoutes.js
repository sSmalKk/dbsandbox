/**
 * Universe_InterfaceRoutes.js
 * @description :: CRUD API routes for Universe_Interface
 */

const express = require('express');
const router = express.Router();
const Universe_InterfaceController = require('../../../controller/client/v1/Universe_InterfaceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/universe_interface/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.addUniverse_Interface);
router.route('/client/api/v1/universe_interface/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.findAllUniverse_Interface);
router.route('/client/api/v1/universe_interface/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.getUniverse_InterfaceCount);
router.route('/client/api/v1/universe_interface/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.getUniverse_Interface);
router.route('/client/api/v1/universe_interface/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.updateUniverse_Interface);    
router.route('/client/api/v1/universe_interface/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.partialUpdateUniverse_Interface);
router.route('/client/api/v1/universe_interface/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.softDeleteUniverse_Interface);
router.route('/client/api/v1/universe_interface/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.softDeleteManyUniverse_Interface);
router.route('/client/api/v1/universe_interface/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.bulkInsertUniverse_Interface);
router.route('/client/api/v1/universe_interface/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.bulkUpdateUniverse_Interface);
router.route('/client/api/v1/universe_interface/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.deleteUniverse_Interface);
router.route('/client/api/v1/universe_interface/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_InterfaceController.deleteManyUniverse_Interface);

module.exports = router;
