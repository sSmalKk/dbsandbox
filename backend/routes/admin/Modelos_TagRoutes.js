/**
 * Modelos_TagRoutes.js
 * @description :: CRUD API routes for Modelos_Tag
 */

const express = require('express');
const router = express.Router();
const Modelos_TagController = require('../../controller/admin/Modelos_TagController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_tag/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.addModelos_Tag);
router.route('/admin/modelos_tag/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.findAllModelos_Tag);
router.route('/admin/modelos_tag/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.getModelos_TagCount);
router.route('/admin/modelos_tag/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.getModelos_Tag);
router.route('/admin/modelos_tag/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.updateModelos_Tag);    
router.route('/admin/modelos_tag/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.partialUpdateModelos_Tag);
router.route('/admin/modelos_tag/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.softDeleteModelos_Tag);
router.route('/admin/modelos_tag/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.softDeleteManyModelos_Tag);
router.route('/admin/modelos_tag/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.bulkInsertModelos_Tag);
router.route('/admin/modelos_tag/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.bulkUpdateModelos_Tag);
router.route('/admin/modelos_tag/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.deleteModelos_Tag);
router.route('/admin/modelos_tag/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_TagController.deleteManyModelos_Tag);

module.exports = router;
