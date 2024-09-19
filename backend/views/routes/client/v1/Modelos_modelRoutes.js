/**
 * Modelos_modelRoutes.js
 * @description :: CRUD API routes for Modelos_model
 */

const express = require('express');
const router = express.Router();
const Modelos_modelController = require('../../../controller/client/v1/Modelos_modelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_model/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.addModelos_model);
router.route('/client/api/v1/modelos_model/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.findAllModelos_model);
router.route('/client/api/v1/modelos_model/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.getModelos_modelCount);
router.route('/client/api/v1/modelos_model/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.getModelos_model);
router.route('/client/api/v1/modelos_model/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.updateModelos_model);    
router.route('/client/api/v1/modelos_model/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.partialUpdateModelos_model);
router.route('/client/api/v1/modelos_model/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.softDeleteModelos_model);
router.route('/client/api/v1/modelos_model/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.softDeleteManyModelos_model);
router.route('/client/api/v1/modelos_model/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.bulkInsertModelos_model);
router.route('/client/api/v1/modelos_model/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.bulkUpdateModelos_model);
router.route('/client/api/v1/modelos_model/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.deleteModelos_model);
router.route('/client/api/v1/modelos_model/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_modelController.deleteManyModelos_model);

module.exports = router;
