/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./Modelos_itemRoutes'));
router.use(require('./Modelos_texturemapRoutes'));
router.use(require('./Modelos_modelRoutes'));
router.use(require('./Universe_SettingsRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
