/**
 * Modelos_chemistry_compoundsRoutes.js
 * @description :: CRUD API routes for Modelos_chemistry_compounds
 */

const express = require('express');
const router = express.Router();
const Modelos_chemistry_compoundsController = require('../../../controller/device/v1/Modelos_chemistry_compoundsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/modelos_chemistry_compounds/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.addModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.findAllModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.getModelos_chemistry_compoundsCount);
router.route('/device/api/v1/modelos_chemistry_compounds/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.getModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.updateModelos_chemistry_compounds);    
router.route('/device/api/v1/modelos_chemistry_compounds/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.partialUpdateModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.softDeleteModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.softDeleteManyModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.bulkInsertModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.bulkUpdateModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.deleteModelos_chemistry_compounds);
router.route('/device/api/v1/modelos_chemistry_compounds/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Modelos_chemistry_compoundsController.deleteManyModelos_chemistry_compounds);

module.exports = router;
