/**
 * wallpaperRoutes.js
 * @description :: CRUD API routes for wallpaper
 */

const express = require('express');
const router = express.Router();
const wallpaperController = require('../../controller/admin/wallpaperController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/wallpaper/create').post(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.addWallpaper);
router.route('/admin/wallpaper/list').post(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.findAllWallpaper);
router.route('/admin/wallpaper/count').post(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.getWallpaperCount);
router.route('/admin/wallpaper/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.getWallpaper);
router.route('/admin/wallpaper/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.updateWallpaper);    
router.route('/admin/wallpaper/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.partialUpdateWallpaper);
router.route('/admin/wallpaper/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.softDeleteWallpaper);
router.route('/admin/wallpaper/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.softDeleteManyWallpaper);
router.route('/admin/wallpaper/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.bulkInsertWallpaper);
router.route('/admin/wallpaper/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.bulkUpdateWallpaper);
router.route('/admin/wallpaper/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.deleteWallpaper);
router.route('/admin/wallpaper/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,wallpaperController.deleteManyWallpaper);

module.exports = router;
