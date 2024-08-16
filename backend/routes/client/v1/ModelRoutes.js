/**
 * ModelRoutes.js
 * @description :: CRUD API routes for Model
 */

const express = require('express');
const router = express.Router();
const ModelController = require('../../../controller/client/v1/ModelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/model/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.addModel);
router.route('/client/api/v1/model/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.findAllModel);
router.route('/client/api/v1/model/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.getModelCount);
router.route('/client/api/v1/model/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.getModel);
router.route('/client/api/v1/model/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.updateModel);    
router.route('/client/api/v1/model/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.partialUpdateModel);
router.route('/client/api/v1/model/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.softDeleteModel);
router.route('/client/api/v1/model/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.softDeleteManyModel);
router.route('/client/api/v1/model/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.bulkInsertModel);
router.route('/client/api/v1/model/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.bulkUpdateModel);
router.route('/client/api/v1/model/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.deleteModel);
router.route('/client/api/v1/model/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ModelController.deleteManyModel);

module.exports = router;
