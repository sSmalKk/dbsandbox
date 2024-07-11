/**
 * planetRoutes.js
 * @description :: CRUD API routes for planet
 */

const express = require('express');
const router = express.Router();
const planetController = require('../../../controller/client/v1/planetController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/planet/create').post(auth(PLATFORM.CLIENT),checkRolePermission,planetController.addPlanet);
router.route('/client/api/v1/planet/list').post(auth(PLATFORM.CLIENT),checkRolePermission,planetController.findAllPlanet);
router.route('/client/api/v1/planet/count').post(auth(PLATFORM.CLIENT),checkRolePermission,planetController.getPlanetCount);
router.route('/client/api/v1/planet/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,planetController.getPlanet);
router.route('/client/api/v1/planet/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,planetController.updatePlanet);    
router.route('/client/api/v1/planet/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,planetController.partialUpdatePlanet);
router.route('/client/api/v1/planet/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,planetController.softDeletePlanet);
router.route('/client/api/v1/planet/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,planetController.softDeleteManyPlanet);
router.route('/client/api/v1/planet/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,planetController.bulkInsertPlanet);
router.route('/client/api/v1/planet/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,planetController.bulkUpdatePlanet);
router.route('/client/api/v1/planet/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,planetController.deletePlanet);
router.route('/client/api/v1/planet/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,planetController.deleteManyPlanet);

module.exports = router;
