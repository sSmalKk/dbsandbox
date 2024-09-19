/**
 * Modelos_TextureRoutes.js
 * @description :: CRUD API routes for Modelos_Texture
 */

const express = require('express');
const router = express.Router();
const Modelos_TextureController = require('../../controller/admin/Modelos_TextureController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_texture/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.addModelos_Texture);
router.route('/admin/modelos_texture/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.findAllModelos_Texture);
router.route('/admin/modelos_texture/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.getModelos_TextureCount);
router.route('/admin/modelos_texture/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.getModelos_Texture);
router.route('/admin/modelos_texture/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.updateModelos_Texture);    
router.route('/admin/modelos_texture/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.partialUpdateModelos_Texture);
router.route('/admin/modelos_texture/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.softDeleteModelos_Texture);
router.route('/admin/modelos_texture/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.softDeleteManyModelos_Texture);
router.route('/admin/modelos_texture/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.bulkInsertModelos_Texture);
router.route('/admin/modelos_texture/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.bulkUpdateModelos_Texture);
router.route('/admin/modelos_texture/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.deleteModelos_Texture);
router.route('/admin/modelos_texture/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TextureController.deleteManyModelos_Texture);

module.exports = router;
