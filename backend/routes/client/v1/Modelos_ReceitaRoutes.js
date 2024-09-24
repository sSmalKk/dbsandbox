/**
 * Modelos_ReceitaRoutes.js
 * @description :: CRUD API routes for Modelos_Receita
 */

const express = require('express');
const router = express.Router();
const Modelos_ReceitaController = require('../../../controller/client/v1/Modelos_ReceitaController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/modelos_receita/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.addModelos_Receita);
router.route('/client/api/v1/modelos_receita/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.findAllModelos_Receita);
router.route('/client/api/v1/modelos_receita/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.getModelos_ReceitaCount);
router.route('/client/api/v1/modelos_receita/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.getModelos_Receita);
router.route('/client/api/v1/modelos_receita/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.updateModelos_Receita);    
router.route('/client/api/v1/modelos_receita/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.partialUpdateModelos_Receita);
router.route('/client/api/v1/modelos_receita/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.softDeleteModelos_Receita);
router.route('/client/api/v1/modelos_receita/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.softDeleteManyModelos_Receita);
router.route('/client/api/v1/modelos_receita/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.bulkInsertModelos_Receita);
router.route('/client/api/v1/modelos_receita/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.bulkUpdateModelos_Receita);
router.route('/client/api/v1/modelos_receita/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.deleteModelos_Receita);
router.route('/client/api/v1/modelos_receita/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,Modelos_ReceitaController.deleteManyModelos_Receita);

module.exports = router;
