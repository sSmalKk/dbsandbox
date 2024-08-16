/**
 * ModelRoutes.js
 * @description :: CRUD API routes for Model
 */

const express = require('express');
const router = express.Router();
const ModelController = require('../../controller/admin/ModelController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/model/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.addModel);
router.route('/admin/model/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.findAllModel);
router.route('/admin/model/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.getModelCount);
router.route('/admin/model/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.getModel);
router.route('/admin/model/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.updateModel);    
router.route('/admin/model/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.partialUpdateModel);
router.route('/admin/model/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.softDeleteModel);
router.route('/admin/model/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.softDeleteManyModel);
router.route('/admin/model/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.bulkInsertModel);
router.route('/admin/model/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.bulkUpdateModel);
router.route('/admin/model/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.deleteModel);
router.route('/admin/model/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ModelController.deleteManyModel);

module.exports = router;
