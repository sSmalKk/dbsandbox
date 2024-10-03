/**
 * Modelos_chemistry_SubstancesRoutes.js
 * @description :: CRUD API routes for Modelos_chemistry_Substances
 */

const express = require('express');
const router = express.Router();
const Modelos_chemistry_SubstancesController = require('../../../controller/client/v1/Modelos_chemistry_SubstancesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_chemistry_substances/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.addModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.findAllModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.getModelos_chemistry_SubstancesCount);
router.route('/client/api/v1/modelos_chemistry_substances/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.getModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.updateModelos_chemistry_Substances);    
router.route('/client/api/v1/modelos_chemistry_substances/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.partialUpdateModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.softDeleteModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.softDeleteManyModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.bulkInsertModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.bulkUpdateModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.deleteModelos_chemistry_Substances);
router.route('/client/api/v1/modelos_chemistry_substances/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_chemistry_SubstancesController.deleteManyModelos_chemistry_Substances);

module.exports = router;
