/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./friendshipRoutes'));
router.use(require('./lobbyRoutes'));
router.use(require('./ModelRoutes'));
router.use(require('./ItemRoutes'));
router.use(require('./RoomRoutes'));
router.use(require('./roomtemplateRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
