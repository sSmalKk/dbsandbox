/**
 * TickRoutes.js
 * @description :: CRUD API routes for Tick
 */

const express = require('express');
const router = express.Router();
const TickController = require("../../../controller/client/v1/TickController")
const { PLATFORM } =  require("../../../constants/authConstant"); 
const auth = require("../../../middleware/auth");
const checkRolePermission = require('../../../middleware/checkRolePermission');
const WorldUpdate = require('../../../middleware/WorldUpdate');

router.route("/client/api/v1/tick/create").post(auth(PLATFORM.CLIENT),checkRolePermission,TickController.addTick);
router.route("/client/api/v1/tick/list").post(auth(PLATFORM.CLIENT),checkRolePermission,TickController.findAllTick);
router.route("/client/api/v1/tick/count").post(auth(PLATFORM.CLIENT),checkRolePermission,TickController.getTickCount);
router.route("/client/api/v1/tick/:id").get(auth(PLATFORM.CLIENT),checkRolePermission,TickController.getTick);
router.route("/client/api/v1/tick/update/:id").put(auth(PLATFORM.CLIENT),checkRolePermission,TickController.updateTick);    
router.route("/client/api/v1/tick/partial-update/:id").put(auth(PLATFORM.CLIENT),checkRolePermission,TickController.partialUpdateTick);
router.route("/client/api/v1/tick/softDelete/:id").put(auth(PLATFORM.CLIENT),checkRolePermission,TickController.softDeleteTick);
router.route("/client/api/v1/tick/softDeleteMany").put(auth(PLATFORM.CLIENT),checkRolePermission,TickController.softDeleteManyTick);
router.route("/client/api/v1/tick/addBulk").post(auth(PLATFORM.CLIENT),checkRolePermission,TickController.bulkInsertTick);
router.route("/client/api/v1/tick/updateBulk").put(auth(PLATFORM.CLIENT),WorldUpdate,checkRolePermission,TickController.bulkUpdateTick);
router.route("/client/api/v1/tick/delete/:id").delete(auth(PLATFORM.CLIENT),checkRolePermission,TickController.deleteTick);
router.route("/client/api/v1/tick/deleteMany").post(auth(PLATFORM.CLIENT),checkRolePermission,TickController.deleteManyTick);
router.route("/tickupdate").get(WorldUpdate,auth(PLATFORM.CLIENT),
TickController.tickupdate)

module.exports = router;
