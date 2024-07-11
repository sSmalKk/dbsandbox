/**
 * universeRoutes.js
 * @description :: CRUD API routes for universe
 */

const express = require('express');
const router = express.Router();
const universeController = require('../../../controller/client/v1/universeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/universe/create').post(auth(PLATFORM.CLIENT),checkRolePermission,universeController.addUniverse);
router.route('/client/api/v1/universe/list').post(auth(PLATFORM.CLIENT),checkRolePermission,universeController.findAllUniverse);
router.route('/client/api/v1/universe/count').post(auth(PLATFORM.CLIENT),checkRolePermission,universeController.getUniverseCount);
router.route('/client/api/v1/universe/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,universeController.getUniverse);
router.route('/client/api/v1/universe/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,universeController.updateUniverse);    
router.route('/client/api/v1/universe/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,universeController.partialUpdateUniverse);
router.route('/client/api/v1/universe/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,universeController.softDeleteUniverse);
router.route('/client/api/v1/universe/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,universeController.softDeleteManyUniverse);
router.route('/client/api/v1/universe/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,universeController.bulkInsertUniverse);
router.route('/client/api/v1/universe/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,universeController.bulkUpdateUniverse);
router.route('/client/api/v1/universe/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,universeController.deleteUniverse);
router.route('/client/api/v1/universe/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,universeController.deleteManyUniverse);

module.exports = router;
