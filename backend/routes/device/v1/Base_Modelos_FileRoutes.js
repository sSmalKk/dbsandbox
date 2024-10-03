/**
 * Base_Modelos_FileRoutes.js
 * @description :: CRUD API routes for Base_Modelos_File
 */

const express = require('express');
const router = express.Router();
const Base_Modelos_FileController = require('../../../controller/device/v1/Base_Modelos_FileController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/base_modelos_file/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.addBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.findAllBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.getBase_Modelos_FileCount);
router.route('/device/api/v1/base_modelos_file/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.getBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.updateBase_Modelos_File);    
router.route('/device/api/v1/base_modelos_file/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.partialUpdateBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.softDeleteBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.softDeleteManyBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.bulkInsertBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.bulkUpdateBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.deleteBase_Modelos_File);
router.route('/device/api/v1/base_modelos_file/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Base_Modelos_FileController.deleteManyBase_Modelos_File);

module.exports = router;
