/**
 * ModelRoutes.js
 * @description :: CRUD API routes for Model
 */

const express = require('express');
const router = express.Router();
const ModelController = require('../../../controller/device/v1/ModelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/model/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.addModel);
router.route('/device/api/v1/model/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.findAllModel);
router.route('/device/api/v1/model/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.getModelCount);
router.route('/device/api/v1/model/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.getModel);
router.route('/device/api/v1/model/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.updateModel);    
router.route('/device/api/v1/model/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.partialUpdateModel);
router.route('/device/api/v1/model/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.softDeleteModel);
router.route('/device/api/v1/model/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.softDeleteManyModel);
router.route('/device/api/v1/model/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.bulkInsertModel);
router.route('/device/api/v1/model/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.bulkUpdateModel);
router.route('/device/api/v1/model/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.deleteModel);
router.route('/device/api/v1/model/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ModelController.deleteManyModel);

module.exports = router;
