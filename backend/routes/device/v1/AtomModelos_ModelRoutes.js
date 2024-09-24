/**
 * AtomModelos_ModelRoutes.js
 * @description :: CRUD API routes for AtomModelos_Model
 */

const express = require('express');
const router = express.Router();
const AtomModelos_ModelController = require('../../../controller/device/v1/AtomModelos_ModelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/atommodelos_model/create').post(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.addAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/list').post(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.findAllAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/count').post(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.getAtomModelos_ModelCount);
router.route('/device/api/v1/atommodelos_model/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.getAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.updateAtomModelos_Model);    
router.route('/device/api/v1/atommodelos_model/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.partialUpdateAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.softDeleteAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.softDeleteManyAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.bulkInsertAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.bulkUpdateAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.deleteAtomModelos_Model);
router.route('/device/api/v1/atommodelos_model/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,AtomModelos_ModelController.deleteManyAtomModelos_Model);

module.exports = router;
