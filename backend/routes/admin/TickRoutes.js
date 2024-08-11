/**
 * TickRoutes.js
 * @description :: CRUD API routes for Tick
 */

const express = require('express');
const router = express.Router();
const TickController = require('../../controller/admin/TickController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
const startworld = require('../../middleware/startworld');
const WorldUpdate = require('../../middleware/WorldUpdate');

router.route('/admin/tick/create').post(auth(PLATFORM.ADMIN),checkRolePermission,TickController.addTick);
router.route('/admin/tick/list').post(auth(PLATFORM.ADMIN),checkRolePermission,TickController.findAllTick);
router.route('/admin/tick/count').post(auth(PLATFORM.ADMIN),checkRolePermission,TickController.getTickCount);
router.route('/admin/tick/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,TickController.getTick);
router.route('/admin/tick/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TickController.updateTick);    
router.route('/admin/tick/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TickController.partialUpdateTick);
router.route('/admin/tick/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TickController.softDeleteTick);
router.route('/admin/tick/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,TickController.softDeleteManyTick);
router.route('/admin/tick/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,TickController.bulkInsertTick);
router.route('/admin/tick/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,TickController.bulkUpdateTick);
router.route('/admin/tick/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,TickController.deleteTick);
router.route('/admin/tick/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,TickController.deleteManyTick);
router.route('/startserver').get(startworld,auth(PLATFORM.ADMIN),
  WorldUpdate,TickController.startWorldTick);

module.exports = router;
