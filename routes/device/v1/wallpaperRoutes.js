/**
 * wallpaperRoutes.js
 * @description :: CRUD API routes for wallpaper
 */

const express = require('express');
const router = express.Router();
const wallpaperController = require('../../../controller/device/v1/wallpaperController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/wallpaper/create').post(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.addWallpaper);
router.route('/device/api/v1/wallpaper/list').post(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.findAllWallpaper);
router.route('/device/api/v1/wallpaper/count').post(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.getWallpaperCount);
router.route('/device/api/v1/wallpaper/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.getWallpaper);
router.route('/device/api/v1/wallpaper/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.updateWallpaper);    
router.route('/device/api/v1/wallpaper/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.partialUpdateWallpaper);
router.route('/device/api/v1/wallpaper/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.softDeleteWallpaper);
router.route('/device/api/v1/wallpaper/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.softDeleteManyWallpaper);
router.route('/device/api/v1/wallpaper/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.bulkInsertWallpaper);
router.route('/device/api/v1/wallpaper/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.bulkUpdateWallpaper);
router.route('/device/api/v1/wallpaper/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.deleteWallpaper);
router.route('/device/api/v1/wallpaper/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,wallpaperController.deleteManyWallpaper);

module.exports = router;
