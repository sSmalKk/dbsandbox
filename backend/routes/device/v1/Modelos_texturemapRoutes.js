/**
 * Modelos_TextureMapRoutes.js
 * @description :: CRUD API routes for Modelos_TextureMap
 */

const express = require('express');
const router = express.Router();
const Modelos_TextureMapController = require('../../../controller/device/v1/Modelos_TextureMapController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/modelos_texturemap/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.addModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.findAllModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.getModelos_TextureMapCount);
router.route('/device/api/v1/modelos_texturemap/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.getModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.updateModelos_TextureMap);    
router.route('/device/api/v1/modelos_texturemap/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.partialUpdateModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.softDeleteModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.softDeleteManyModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.bulkInsertModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.bulkUpdateModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.deleteModelos_TextureMap);
router.route('/device/api/v1/modelos_texturemap/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_TextureMapController.deleteManyModelos_TextureMap);

module.exports = router;
