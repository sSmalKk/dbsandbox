/**
 * friendshipRoutes.js
 * @description :: CRUD API routes for friendship
 */

const express = require('express');
const router = express.Router();
const friendshipController = require('../../../controller/client/v1/friendshipController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/friendship/create').post(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.addFriendship);
router.route('/client/api/v1/friendship/list').post(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.findAllFriendship);
router.route('/client/api/v1/friendship/count').post(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.getFriendshipCount);
router.route('/client/api/v1/friendship/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.getFriendship);
router.route('/client/api/v1/friendship/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.updateFriendship);    
router.route('/client/api/v1/friendship/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.partialUpdateFriendship);
router.route('/client/api/v1/friendship/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.softDeleteFriendship);
router.route('/client/api/v1/friendship/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.softDeleteManyFriendship);
router.route('/client/api/v1/friendship/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.bulkInsertFriendship);
router.route('/client/api/v1/friendship/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.bulkUpdateFriendship);
router.route('/client/api/v1/friendship/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.deleteFriendship);
router.route('/client/api/v1/friendship/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,friendshipController.deleteManyFriendship);

module.exports = router;
