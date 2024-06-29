/**
 * WorldDataRoutes.js
 * @description :: CRUD API routes for WorldData
 */

const express = require('express');
const router = express.Router();
const WorldDataController = require('../../controller/admin/WorldDataController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/worlddata/create').post(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.addWorldData);
router.route('/admin/worlddata/list').post(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.findAllWorldData);
router.route('/admin/worlddata/count').post(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.getWorldDataCount);
router.route('/admin/worlddata/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.getWorldData);
router.route('/admin/worlddata/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.updateWorldData);    
router.route('/admin/worlddata/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.partialUpdateWorldData);
router.route('/admin/worlddata/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.softDeleteWorldData);
router.route('/admin/worlddata/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.softDeleteManyWorldData);
router.route('/admin/worlddata/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.bulkInsertWorldData);
router.route('/admin/worlddata/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.bulkUpdateWorldData);
router.route('/admin/worlddata/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.deleteWorldData);
router.route('/admin/worlddata/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,WorldDataController.deleteManyWorldData);

module.exports = router;
