/**
 * ItensRoutes.js
 * @description :: CRUD API routes for Itens
 */

const express = require('express');
const router = express.Router();
const ItensController = require('../../../controller/client/v1/ItensController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/itens/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.addItens);
router.route('/client/api/v1/itens/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.findAllItens);
router.route('/client/api/v1/itens/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.getItensCount);
router.route('/client/api/v1/itens/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.getItens);
router.route('/client/api/v1/itens/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.updateItens);    
router.route('/client/api/v1/itens/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.partialUpdateItens);
router.route('/client/api/v1/itens/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.softDeleteItens);
router.route('/client/api/v1/itens/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.softDeleteManyItens);
router.route('/client/api/v1/itens/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.bulkInsertItens);
router.route('/client/api/v1/itens/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.bulkUpdateItens);
router.route('/client/api/v1/itens/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.deleteItens);
router.route('/client/api/v1/itens/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ItensController.deleteManyItens);

module.exports = router;
