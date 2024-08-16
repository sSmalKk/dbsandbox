/**
 * friendshipRoutes.js
 * @description :: CRUD API routes for friendship
 */

const express = require('express');
const router = express.Router();
const friendshipController = require('../../controller/admin/friendshipController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/friendship/create').post(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.addFriendship);
router.route('/admin/friendship/list').post(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.findAllFriendship);
router.route('/admin/friendship/count').post(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.getFriendshipCount);
router.route('/admin/friendship/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.getFriendship);
router.route('/admin/friendship/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.updateFriendship);    
router.route('/admin/friendship/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.partialUpdateFriendship);
router.route('/admin/friendship/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.softDeleteFriendship);
router.route('/admin/friendship/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.softDeleteManyFriendship);
router.route('/admin/friendship/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.bulkInsertFriendship);
router.route('/admin/friendship/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.bulkUpdateFriendship);
router.route('/admin/friendship/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.deleteFriendship);
router.route('/admin/friendship/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,friendshipController.deleteManyFriendship);

module.exports = router;
