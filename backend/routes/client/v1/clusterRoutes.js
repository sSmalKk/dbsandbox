/**
 * clusterRoutes.js
 * @description :: CRUD API routes for cluster
 */

const express = require('express');
const router = express.Router();
const clusterController = require('../../../controller/client/v1/clusterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/cluster/create').post(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.addCluster);
router.route('/client/api/v1/cluster/list').post(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.findAllCluster);
router.route('/client/api/v1/cluster/count').post(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.getClusterCount);
router.route('/client/api/v1/cluster/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.getCluster);
router.route('/client/api/v1/cluster/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.updateCluster);    
router.route('/client/api/v1/cluster/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.partialUpdateCluster);
router.route('/client/api/v1/cluster/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.softDeleteCluster);
router.route('/client/api/v1/cluster/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.softDeleteManyCluster);
router.route('/client/api/v1/cluster/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.bulkInsertCluster);
router.route('/client/api/v1/cluster/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.bulkUpdateCluster);
router.route('/client/api/v1/cluster/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.deleteCluster);
router.route('/client/api/v1/cluster/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,clusterController.deleteManyCluster);

module.exports = router;
