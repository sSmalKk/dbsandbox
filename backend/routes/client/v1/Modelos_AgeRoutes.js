/**
 * Modelos_AgeRoutes.js
 * @description :: CRUD API routes for Modelos_Age
 */

const express = require('express');
const router = express.Router();
const Modelos_AgeController = require('../../../controller/client/v1/Modelos_AgeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_age/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.addModelos_Age);
router.route('/client/api/v1/modelos_age/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.findAllModelos_Age);
router.route('/client/api/v1/modelos_age/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.getModelos_AgeCount);
router.route('/client/api/v1/modelos_age/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.getModelos_Age);
router.route('/client/api/v1/modelos_age/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.updateModelos_Age);    
router.route('/client/api/v1/modelos_age/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.partialUpdateModelos_Age);
router.route('/client/api/v1/modelos_age/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.softDeleteModelos_Age);
router.route('/client/api/v1/modelos_age/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.softDeleteManyModelos_Age);
router.route('/client/api/v1/modelos_age/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.bulkInsertModelos_Age);
router.route('/client/api/v1/modelos_age/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.bulkUpdateModelos_Age);
router.route('/client/api/v1/modelos_age/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.deleteModelos_Age);
router.route('/client/api/v1/modelos_age/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_AgeController.deleteManyModelos_Age);

module.exports = router;
