/**
 * Modelos_TagRoutes.js
 * @description :: CRUD API routes for Modelos_Tag
 */

const express = require('express');
const router = express.Router();
const Modelos_TagController = require('../../../controller/client/v1/Modelos_TagController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_tag/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.addModelos_Tag);
router.route('/client/api/v1/modelos_tag/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.findAllModelos_Tag);
router.route('/client/api/v1/modelos_tag/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.getModelos_TagCount);
router.route('/client/api/v1/modelos_tag/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.getModelos_Tag);
router.route('/client/api/v1/modelos_tag/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.updateModelos_Tag);    
router.route('/client/api/v1/modelos_tag/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.partialUpdateModelos_Tag);
router.route('/client/api/v1/modelos_tag/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.softDeleteModelos_Tag);
router.route('/client/api/v1/modelos_tag/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.softDeleteManyModelos_Tag);
router.route('/client/api/v1/modelos_tag/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.bulkInsertModelos_Tag);
router.route('/client/api/v1/modelos_tag/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.bulkUpdateModelos_Tag);
router.route('/client/api/v1/modelos_tag/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.deleteModelos_Tag);
router.route('/client/api/v1/modelos_tag/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_TagController.deleteManyModelos_Tag);

module.exports = router;
