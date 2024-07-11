/**
 * planetRoutes.js
 * @description :: CRUD API routes for planet
 */

const express = require('express');
const router = express.Router();
const planetController = require('../../../controller/device/v1/planetController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/planet/create').post(auth(PLATFORM.DEVICE),checkRolePermission,planetController.addPlanet);
router.route('/device/api/v1/planet/list').post(auth(PLATFORM.DEVICE),checkRolePermission,planetController.findAllPlanet);
router.route('/device/api/v1/planet/count').post(auth(PLATFORM.DEVICE),checkRolePermission,planetController.getPlanetCount);
router.route('/device/api/v1/planet/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,planetController.getPlanet);
router.route('/device/api/v1/planet/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,planetController.updatePlanet);    
router.route('/device/api/v1/planet/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,planetController.partialUpdatePlanet);
router.route('/device/api/v1/planet/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,planetController.softDeletePlanet);
router.route('/device/api/v1/planet/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,planetController.softDeleteManyPlanet);
router.route('/device/api/v1/planet/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,planetController.bulkInsertPlanet);
router.route('/device/api/v1/planet/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,planetController.bulkUpdatePlanet);
router.route('/device/api/v1/planet/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,planetController.deletePlanet);
router.route('/device/api/v1/planet/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,planetController.deleteManyPlanet);

module.exports = router;
