/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./Modelos_TextureMapRoutes'));
router.use(require('./Modelos_itemRoutes'));
router.use(require('./Modelos_TextureRoutes'));
router.use(require('./Modelos_modelRoutes'));
router.use(require('./Universe_SettingsRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
