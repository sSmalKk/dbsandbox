/**
 * texturemapRoutes.js
 * @description :: CRUD API routes for texturemap
 */

const express = require('express');
const router = express.Router();
const texturemapController = require('../../../controller/device/v1/texturemapController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/texturemap/create').post(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.addTexturemap);
router.route('/device/api/v1/texturemap/list').post(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.findAllTexturemap);
router.route('/device/api/v1/texturemap/count').post(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.getTexturemapCount);
router.route('/device/api/v1/texturemap/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.getTexturemap);
router.route('/device/api/v1/texturemap/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.updateTexturemap);    
router.route('/device/api/v1/texturemap/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.partialUpdateTexturemap);
router.route('/device/api/v1/texturemap/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.softDeleteTexturemap);
router.route('/device/api/v1/texturemap/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.softDeleteManyTexturemap);
router.route('/device/api/v1/texturemap/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.bulkInsertTexturemap);
router.route('/device/api/v1/texturemap/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.bulkUpdateTexturemap);
router.route('/device/api/v1/texturemap/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.deleteTexturemap);
router.route('/device/api/v1/texturemap/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,texturemapController.deleteManyTexturemap);

module.exports = router;
