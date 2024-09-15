/**
 * modelRoutes.js
 * @description :: CRUD API routes for model
 */

const express = require('express');
const router = express.Router();
const modelController = require('../../../controller/client/v1/modelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/model/create').post(auth(PLATFORM.CLIENT),checkRolePermission,modelController.addModel);
router.route('/client/api/v1/model/list').post(auth(PLATFORM.CLIENT),checkRolePermission,modelController.findAllModel);
router.route('/client/api/v1/model/count').post(auth(PLATFORM.CLIENT),checkRolePermission,modelController.getModelCount);
router.route('/client/api/v1/model/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,modelController.getModel);
router.route('/client/api/v1/model/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,modelController.updateModel);    
router.route('/client/api/v1/model/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,modelController.partialUpdateModel);
router.route('/client/api/v1/model/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,modelController.softDeleteModel);
router.route('/client/api/v1/model/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,modelController.softDeleteManyModel);
router.route('/client/api/v1/model/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,modelController.bulkInsertModel);
router.route('/client/api/v1/model/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,modelController.bulkUpdateModel);
router.route('/client/api/v1/model/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,modelController.deleteModel);
router.route('/client/api/v1/model/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,modelController.deleteManyModel);

module.exports = router;
