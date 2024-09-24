/**
 * Modelos_RuleRoutes.js
 * @description :: CRUD API routes for Modelos_Rule
 */

const express = require('express');
const router = express.Router();
const Modelos_RuleController = require('../../../controller/client/v1/Modelos_RuleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_rule/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.addModelos_Rule);
router.route('/client/api/v1/modelos_rule/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.findAllModelos_Rule);
router.route('/client/api/v1/modelos_rule/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.getModelos_RuleCount);
router.route('/client/api/v1/modelos_rule/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.getModelos_Rule);
router.route('/client/api/v1/modelos_rule/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.updateModelos_Rule);    
router.route('/client/api/v1/modelos_rule/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.partialUpdateModelos_Rule);
router.route('/client/api/v1/modelos_rule/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.softDeleteModelos_Rule);
router.route('/client/api/v1/modelos_rule/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.softDeleteManyModelos_Rule);
router.route('/client/api/v1/modelos_rule/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.bulkInsertModelos_Rule);
router.route('/client/api/v1/modelos_rule/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.bulkUpdateModelos_Rule);
router.route('/client/api/v1/modelos_rule/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.deleteModelos_Rule);
router.route('/client/api/v1/modelos_rule/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_RuleController.deleteManyModelos_Rule);

module.exports = router;
