/**
 * textureRoutes.js
 * @description :: CRUD API routes for texture
 */

const express = require('express');
const router = express.Router();
const textureController = require('../../../controller/client/v1/textureController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/texture/create').post(auth(PLATFORM.CLIENT),checkRolePermission,textureController.addTexture);
router.route('/client/api/v1/texture/list').post(auth(PLATFORM.CLIENT),checkRolePermission,textureController.findAllTexture);
router.route('/client/api/v1/texture/count').post(auth(PLATFORM.CLIENT),checkRolePermission,textureController.getTextureCount);
router.route('/client/api/v1/texture/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,textureController.getTexture);
router.route('/client/api/v1/texture/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,textureController.updateTexture);    
router.route('/client/api/v1/texture/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,textureController.partialUpdateTexture);
router.route('/client/api/v1/texture/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,textureController.softDeleteTexture);
router.route('/client/api/v1/texture/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,textureController.softDeleteManyTexture);
router.route('/client/api/v1/texture/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,textureController.bulkInsertTexture);
router.route('/client/api/v1/texture/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,textureController.bulkUpdateTexture);
router.route('/client/api/v1/texture/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,textureController.deleteTexture);
router.route('/client/api/v1/texture/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,textureController.deleteManyTexture);

module.exports = router;
