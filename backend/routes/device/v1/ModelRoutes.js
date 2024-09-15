/**
 * modelRoutes.js
 * @description :: CRUD API routes for model
 */

const express = require('express');
const router = express.Router();
const modelController = require('../../../controller/device/v1/modelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/model/create').post(auth(PLATFORM.DEVICE),checkRolePermission,modelController.addModel);
router.route('/device/api/v1/model/list').post(auth(PLATFORM.DEVICE),checkRolePermission,modelController.findAllModel);
router.route('/device/api/v1/model/count').post(auth(PLATFORM.DEVICE),checkRolePermission,modelController.getModelCount);
router.route('/device/api/v1/model/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,modelController.getModel);
router.route('/device/api/v1/model/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,modelController.updateModel);    
router.route('/device/api/v1/model/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,modelController.partialUpdateModel);
router.route('/device/api/v1/model/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,modelController.softDeleteModel);
router.route('/device/api/v1/model/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,modelController.softDeleteManyModel);
router.route('/device/api/v1/model/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,modelController.bulkInsertModel);
router.route('/device/api/v1/model/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,modelController.bulkUpdateModel);
router.route('/device/api/v1/model/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,modelController.deleteModel);
router.route('/device/api/v1/model/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,modelController.deleteManyModel);

module.exports = router;
