/**
 * texturemapRoutes.js
 * @description :: CRUD API routes for texturemap
 */

const express = require('express');
const router = express.Router();
const texturemapController = require('../../../controller/client/v1/texturemapController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/texturemap/create').post(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.addTexturemap);
router.route('/client/api/v1/texturemap/list').post(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.findAllTexturemap);
router.route('/client/api/v1/texturemap/count').post(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.getTexturemapCount);
router.route('/client/api/v1/texturemap/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.getTexturemap);
router.route('/client/api/v1/texturemap/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.updateTexturemap);    
router.route('/client/api/v1/texturemap/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.partialUpdateTexturemap);
router.route('/client/api/v1/texturemap/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.softDeleteTexturemap);
router.route('/client/api/v1/texturemap/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.softDeleteManyTexturemap);
router.route('/client/api/v1/texturemap/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.bulkInsertTexturemap);
router.route('/client/api/v1/texturemap/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.bulkUpdateTexturemap);
router.route('/client/api/v1/texturemap/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.deleteTexturemap);
router.route('/client/api/v1/texturemap/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,texturemapController.deleteManyTexturemap);

module.exports = router;
