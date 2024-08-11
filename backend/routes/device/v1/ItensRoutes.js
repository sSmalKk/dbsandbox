/**
 * ItensRoutes.js
 * @description :: CRUD API routes for Itens
 */

const express = require('express');
const router = express.Router();
const ItensController = require('../../../controller/device/v1/ItensController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/itens/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.addItens);
router.route('/device/api/v1/itens/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.findAllItens);
router.route('/device/api/v1/itens/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.getItensCount);
router.route('/device/api/v1/itens/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.getItens);
router.route('/device/api/v1/itens/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.updateItens);    
router.route('/device/api/v1/itens/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.partialUpdateItens);
router.route('/device/api/v1/itens/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.softDeleteItens);
router.route('/device/api/v1/itens/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.softDeleteManyItens);
router.route('/device/api/v1/itens/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.bulkInsertItens);
router.route('/device/api/v1/itens/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.bulkUpdateItens);
router.route('/device/api/v1/itens/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.deleteItens);
router.route('/device/api/v1/itens/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ItensController.deleteManyItens);

module.exports = router;
