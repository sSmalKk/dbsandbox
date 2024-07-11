/**
 * clusterRoutes.js
 * @description :: CRUD API routes for cluster
 */

const express = require('express');
const router = express.Router();
const clusterController = require('../../controller/admin/clusterController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/cluster/create').post(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.addCluster);
router.route('/admin/cluster/list').post(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.findAllCluster);
router.route('/admin/cluster/count').post(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.getClusterCount);
router.route('/admin/cluster/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.getCluster);
router.route('/admin/cluster/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.updateCluster);    
router.route('/admin/cluster/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.partialUpdateCluster);
router.route('/admin/cluster/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.softDeleteCluster);
router.route('/admin/cluster/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.softDeleteManyCluster);
router.route('/admin/cluster/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.bulkInsertCluster);
router.route('/admin/cluster/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.bulkUpdateCluster);
router.route('/admin/cluster/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.deleteCluster);
router.route('/admin/cluster/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,clusterController.deleteManyCluster);

module.exports = router;
