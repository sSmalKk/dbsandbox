/**
 * texturemapRoutes.js
 * @description :: CRUD API routes for texturemap
 */

const express = require('express');
const router = express.Router();
const texturemapController = require('../../controller/admin/texturemapController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/texturemap/create').post(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.addTexturemap);
router.route('/admin/texturemap/list').post(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.findAllTexturemap);
router.route('/admin/texturemap/count').post(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.getTexturemapCount);
router.route('/admin/texturemap/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.getTexturemap);
router.route('/admin/texturemap/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.updateTexturemap);    
router.route('/admin/texturemap/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.partialUpdateTexturemap);
router.route('/admin/texturemap/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.softDeleteTexturemap);
router.route('/admin/texturemap/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.softDeleteManyTexturemap);
router.route('/admin/texturemap/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.bulkInsertTexturemap);
router.route('/admin/texturemap/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.bulkUpdateTexturemap);
router.route('/admin/texturemap/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.deleteTexturemap);
router.route('/admin/texturemap/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,texturemapController.deleteManyTexturemap);

module.exports = router;
