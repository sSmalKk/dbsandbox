/**
 * humanAperanceRoutes.js
 * @description :: CRUD API routes for humanAperance
 */

const express = require('express');
const router = express.Router();
const humanAperanceController = require('../../../controller/device/v1/humanAperanceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/humanaperance/create').post(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.addHumanAperance);
router.route('/device/api/v1/humanaperance/list').post(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.findAllHumanAperance);
router.route('/device/api/v1/humanaperance/count').post(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.getHumanAperanceCount);
router.route('/device/api/v1/humanaperance/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.getHumanAperance);
router.route('/device/api/v1/humanaperance/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.updateHumanAperance);    
router.route('/device/api/v1/humanaperance/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.partialUpdateHumanAperance);
router.route('/device/api/v1/humanaperance/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.softDeleteHumanAperance);
router.route('/device/api/v1/humanaperance/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.softDeleteManyHumanAperance);
router.route('/device/api/v1/humanaperance/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.bulkInsertHumanAperance);
router.route('/device/api/v1/humanaperance/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.bulkUpdateHumanAperance);
router.route('/device/api/v1/humanaperance/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.deleteHumanAperance);
router.route('/device/api/v1/humanaperance/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,humanAperanceController.deleteManyHumanAperance);

module.exports = router;
