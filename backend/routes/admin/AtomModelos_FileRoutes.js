/**
 * AtomModelos_FileRoutes.js
 * @description :: CRUD API routes for AtomModelos_File
 */

const express = require('express');
const router = express.Router();
const AtomModelos_FileController = require('../../controller/admin/AtomModelos_FileController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/atommodelos_file/create').post(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.addAtomModelos_File);
router.route('/admin/atommodelos_file/list').post(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.findAllAtomModelos_File);
router.route('/admin/atommodelos_file/count').post(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.getAtomModelos_FileCount);
router.route('/admin/atommodelos_file/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.getAtomModelos_File);
router.route('/admin/atommodelos_file/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.updateAtomModelos_File);    
router.route('/admin/atommodelos_file/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.partialUpdateAtomModelos_File);
router.route('/admin/atommodelos_file/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.softDeleteAtomModelos_File);
router.route('/admin/atommodelos_file/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.softDeleteManyAtomModelos_File);
router.route('/admin/atommodelos_file/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.bulkInsertAtomModelos_File);
router.route('/admin/atommodelos_file/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.bulkUpdateAtomModelos_File);
router.route('/admin/atommodelos_file/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.deleteAtomModelos_File);
router.route('/admin/atommodelos_file/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,AtomModelos_FileController.deleteManyAtomModelos_File);

module.exports = router;
