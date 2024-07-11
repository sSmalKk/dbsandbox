/**
 * planetRoutes.js
 * @description :: CRUD API routes for planet
 */

const express = require('express');
const router = express.Router();
const planetController = require('../../controller/admin/planetController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/planet/create').post(auth(PLATFORM.ADMIN),checkRolePermission,planetController.addPlanet);
router.route('/admin/planet/list').post(auth(PLATFORM.ADMIN),checkRolePermission,planetController.findAllPlanet);
router.route('/admin/planet/count').post(auth(PLATFORM.ADMIN),checkRolePermission,planetController.getPlanetCount);
router.route('/admin/planet/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,planetController.getPlanet);
router.route('/admin/planet/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,planetController.updatePlanet);    
router.route('/admin/planet/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,planetController.partialUpdatePlanet);
router.route('/admin/planet/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,planetController.softDeletePlanet);
router.route('/admin/planet/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,planetController.softDeleteManyPlanet);
router.route('/admin/planet/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,planetController.bulkInsertPlanet);
router.route('/admin/planet/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,planetController.bulkUpdatePlanet);
router.route('/admin/planet/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,planetController.deletePlanet);
router.route('/admin/planet/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,planetController.deleteManyPlanet);

module.exports = router;
