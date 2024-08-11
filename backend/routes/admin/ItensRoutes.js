/**
 * ItensRoutes.js
 * @description :: CRUD API routes for Itens
 */

const express = require('express');
const router = express.Router();
const ItensController = require('../../controller/admin/ItensController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/itens/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.addItens);
router.route('/admin/itens/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.findAllItens);
router.route('/admin/itens/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.getItensCount);
router.route('/admin/itens/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.getItens);
router.route('/admin/itens/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.updateItens);    
router.route('/admin/itens/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.partialUpdateItens);
router.route('/admin/itens/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.softDeleteItens);
router.route('/admin/itens/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.softDeleteManyItens);
router.route('/admin/itens/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.bulkInsertItens);
router.route('/admin/itens/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.bulkUpdateItens);
router.route('/admin/itens/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.deleteItens);
router.route('/admin/itens/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ItensController.deleteManyItens);

module.exports = router;
