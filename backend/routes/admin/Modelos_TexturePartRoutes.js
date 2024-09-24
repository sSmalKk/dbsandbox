/**
 * Modelos_TexturePartRoutes.js
 * @description :: CRUD API routes for Modelos_TexturePart
 */

const express = require('express');
const router = express.Router();
const Modelos_TexturePartController = require('../../controller/admin/Modelos_TexturePartController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_texturepart/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.addModelos_TexturePart);
router.route('/admin/modelos_texturepart/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.findAllModelos_TexturePart);
router.route('/admin/modelos_texturepart/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.getModelos_TexturePartCount);
router.route('/admin/modelos_texturepart/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.getModelos_TexturePart);
router.route('/admin/modelos_texturepart/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.updateModelos_TexturePart);    
router.route('/admin/modelos_texturepart/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.partialUpdateModelos_TexturePart);
router.route('/admin/modelos_texturepart/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.softDeleteModelos_TexturePart);
router.route('/admin/modelos_texturepart/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.softDeleteManyModelos_TexturePart);
router.route('/admin/modelos_texturepart/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.bulkInsertModelos_TexturePart);
router.route('/admin/modelos_texturepart/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.bulkUpdateModelos_TexturePart);
router.route('/admin/modelos_texturepart/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.deleteModelos_TexturePart);
router.route('/admin/modelos_texturepart/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TexturePartController.deleteManyModelos_TexturePart);

module.exports = router;
