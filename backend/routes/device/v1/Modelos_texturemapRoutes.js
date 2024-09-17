/**
 * Modelos_texturemapRoutes.js
 * @description :: CRUD API routes for Modelos_texturemap
 */

const express = require('express');
const router = express.Router();
const Modelos_texturemapController = require('../../../controller/device/v1/Modelos_texturemapController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/modelos_texturemap/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.addModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.findAllModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.getModelos_texturemapCount);
router.route('/device/api/v1/modelos_texturemap/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.getModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.updateModelos_texturemap);    
router.route('/device/api/v1/modelos_texturemap/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.partialUpdateModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.softDeleteModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.softDeleteManyModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.bulkInsertModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.bulkUpdateModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.deleteModelos_texturemap);
router.route('/device/api/v1/modelos_texturemap/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_texturemapController.deleteManyModelos_texturemap);

module.exports = router;
