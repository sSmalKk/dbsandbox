/**
 * clusterRoutes.js
 * @description :: CRUD API routes for cluster
 */

const express = require('express');
const router = express.Router();
const clusterController = require('../../../controller/device/v1/clusterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/cluster/create').post(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.addCluster);
router.route('/device/api/v1/cluster/list').post(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.findAllCluster);
router.route('/device/api/v1/cluster/count').post(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.getClusterCount);
router.route('/device/api/v1/cluster/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.getCluster);
router.route('/device/api/v1/cluster/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.updateCluster);    
router.route('/device/api/v1/cluster/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.partialUpdateCluster);
router.route('/device/api/v1/cluster/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.softDeleteCluster);
router.route('/device/api/v1/cluster/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.softDeleteManyCluster);
router.route('/device/api/v1/cluster/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.bulkInsertCluster);
router.route('/device/api/v1/cluster/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.bulkUpdateCluster);
router.route('/device/api/v1/cluster/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.deleteCluster);
router.route('/device/api/v1/cluster/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,clusterController.deleteManyCluster);

module.exports = router;
