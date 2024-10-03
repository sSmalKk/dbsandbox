/**
 * user_sectionRoutes.js
 * @description :: CRUD API routes for user_section
 */

const express = require('express');
const router = express.Router();
const user_sectionController = require('../../../controller/device/v1/user_sectionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/user_section/create').post(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.addUser_section);
router.route('/device/api/v1/user_section/list').post(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.findAllUser_section);
router.route('/device/api/v1/user_section/count').post(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.getUser_sectionCount);
router.route('/device/api/v1/user_section/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.getUser_section);
router.route('/device/api/v1/user_section/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.updateUser_section);    
router.route('/device/api/v1/user_section/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.partialUpdateUser_section);
router.route('/device/api/v1/user_section/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.softDeleteUser_section);
router.route('/device/api/v1/user_section/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.softDeleteManyUser_section);
router.route('/device/api/v1/user_section/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.bulkInsertUser_section);
router.route('/device/api/v1/user_section/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.bulkUpdateUser_section);
router.route('/device/api/v1/user_section/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.deleteUser_section);
router.route('/device/api/v1/user_section/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,user_sectionController.deleteManyUser_section);

module.exports = router;
