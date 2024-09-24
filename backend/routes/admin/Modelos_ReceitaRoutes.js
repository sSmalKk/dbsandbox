/**
 * Modelos_ReceitaRoutes.js
 * @description :: CRUD API routes for Modelos_Receita
 */

const express = require('express');
const router = express.Router();
const Modelos_ReceitaController = require('../../controller/admin/Modelos_ReceitaController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/modelos_receita/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.addModelos_Receita);
router.route('/admin/modelos_receita/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.findAllModelos_Receita);
router.route('/admin/modelos_receita/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.getModelos_ReceitaCount);
router.route('/admin/modelos_receita/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.getModelos_Receita);
router.route('/admin/modelos_receita/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.updateModelos_Receita);    
router.route('/admin/modelos_receita/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.partialUpdateModelos_Receita);
router.route('/admin/modelos_receita/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.softDeleteModelos_Receita);
router.route('/admin/modelos_receita/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.softDeleteManyModelos_Receita);
router.route('/admin/modelos_receita/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.bulkInsertModelos_Receita);
router.route('/admin/modelos_receita/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.bulkUpdateModelos_Receita);
router.route('/admin/modelos_receita/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.deleteModelos_Receita);
router.route('/admin/modelos_receita/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Modelos_ReceitaController.deleteManyModelos_Receita);

module.exports = router;
