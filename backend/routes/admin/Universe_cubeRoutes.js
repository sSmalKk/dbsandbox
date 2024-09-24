/**
 * Universe_cubeRoutes.js
 * @description :: CRUD API routes for Universe_cube
 */

const express = require('express');
const router = express.Router();
const Universe_cubeController = require('../../controller/admin/Universe_cubeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe_cube/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.addUniverse_cube);
router.route('/admin/universe_cube/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.findAllUniverse_cube);
router.route('/admin/universe_cube/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.getUniverse_cubeCount);
router.route('/admin/universe_cube/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.getUniverse_cube);
router.route('/admin/universe_cube/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.updateUniverse_cube);    
router.route('/admin/universe_cube/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.partialUpdateUniverse_cube);
router.route('/admin/universe_cube/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.softDeleteUniverse_cube);
router.route('/admin/universe_cube/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.softDeleteManyUniverse_cube);
router.route('/admin/universe_cube/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.bulkInsertUniverse_cube);
router.route('/admin/universe_cube/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.bulkUpdateUniverse_cube);
router.route('/admin/universe_cube/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.deleteUniverse_cube);
router.route('/admin/universe_cube/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Universe_cubeController.deleteManyUniverse_cube);

module.exports = router;
