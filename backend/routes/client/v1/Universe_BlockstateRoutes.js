/**
 * Universe_BlockstateRoutes.js
 * @description :: CRUD API routes for Universe_Blockstate
 */

const express = require('express');
const router = express.Router();
const Universe_BlockstateController = require('../../../controller/client/v1/Universe_BlockstateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/universe_blockstate/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.addUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.findAllUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.getUniverse_BlockstateCount);
router.route('/client/api/v1/universe_blockstate/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.getUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.updateUniverse_Blockstate);    
router.route('/client/api/v1/universe_blockstate/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.partialUpdateUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.softDeleteUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.softDeleteManyUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.bulkInsertUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.bulkUpdateUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.deleteUniverse_Blockstate);
router.route('/client/api/v1/universe_blockstate/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Universe_BlockstateController.deleteManyUniverse_Blockstate);

module.exports = router;
