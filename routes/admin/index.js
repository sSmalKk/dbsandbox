/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./wallpaperRoutes'));
router.use(require('./humanAperanceRoutes'));
router.use(require('./sizeRoutes'));
router.use(require('./PatternRoutes'));
router.use(require('./ItemModelRoutes'));
router.use(require('./UniverseRoutes'));
router.use(require('./WorldDataRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./EventRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
