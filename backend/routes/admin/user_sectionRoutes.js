/**
 * user_sectionRoutes.js
 * @description :: CRUD API routes for user_section
 */

const express = require('express');
const router = express.Router();
const user_sectionController = require('../../controller/admin/user_sectionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/user_section/create').post(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.addUser_section);
router.route('/admin/user_section/list').post(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.findAllUser_section);
router.route('/admin/user_section/count').post(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.getUser_sectionCount);
router.route('/admin/user_section/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.getUser_section);
router.route('/admin/user_section/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.updateUser_section);    
router.route('/admin/user_section/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.partialUpdateUser_section);
router.route('/admin/user_section/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.softDeleteUser_section);
router.route('/admin/user_section/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.softDeleteManyUser_section);
router.route('/admin/user_section/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.bulkInsertUser_section);
router.route('/admin/user_section/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.bulkUpdateUser_section);
router.route('/admin/user_section/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.deleteUser_section);
router.route('/admin/user_section/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,user_sectionController.deleteManyUser_section);

module.exports = router;
