/**
 * humanAperanceRoutes.js
 * @description :: CRUD API routes for humanAperance
 */

const express = require('express');
const router = express.Router();
const humanAperanceController = require('../../controller/admin/humanAperanceController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/humanaperance/create').post(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.addHumanAperance);
router.route('/admin/humanaperance/list').post(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.findAllHumanAperance);
router.route('/admin/humanaperance/count').post(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.getHumanAperanceCount);
router.route('/admin/humanaperance/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.getHumanAperance);
router.route('/admin/humanaperance/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.updateHumanAperance);    
router.route('/admin/humanaperance/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.partialUpdateHumanAperance);
router.route('/admin/humanaperance/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.softDeleteHumanAperance);
router.route('/admin/humanaperance/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.softDeleteManyHumanAperance);
router.route('/admin/humanaperance/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.bulkInsertHumanAperance);
router.route('/admin/humanaperance/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.bulkUpdateHumanAperance);
router.route('/admin/humanaperance/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.deleteHumanAperance);
router.route('/admin/humanaperance/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,humanAperanceController.deleteManyHumanAperance);

module.exports = router;
