/**
 * textureRoutes.js
 * @description :: CRUD API routes for texture
 */

const express = require('express');
const router = express.Router();
const textureController = require('../../../controller/device/v1/textureController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/texture/create').post(auth(PLATFORM.DEVICE),checkRolePermission,textureController.addTexture);
router.route('/device/api/v1/texture/list').post(auth(PLATFORM.DEVICE),checkRolePermission,textureController.findAllTexture);
router.route('/device/api/v1/texture/count').post(auth(PLATFORM.DEVICE),checkRolePermission,textureController.getTextureCount);
router.route('/device/api/v1/texture/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,textureController.getTexture);
router.route('/device/api/v1/texture/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,textureController.updateTexture);    
router.route('/device/api/v1/texture/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,textureController.partialUpdateTexture);
router.route('/device/api/v1/texture/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,textureController.softDeleteTexture);
router.route('/device/api/v1/texture/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,textureController.softDeleteManyTexture);
router.route('/device/api/v1/texture/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,textureController.bulkInsertTexture);
router.route('/device/api/v1/texture/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,textureController.bulkUpdateTexture);
router.route('/device/api/v1/texture/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,textureController.deleteTexture);
router.route('/device/api/v1/texture/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,textureController.deleteManyTexture);

module.exports = router;
