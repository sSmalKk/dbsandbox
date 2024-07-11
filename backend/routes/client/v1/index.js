/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./itemRoutes'));
router.use(require('./modelRoutes'));
router.use(require('./materialRoutes'));
router.use(require('./blockstateRoutes'));
router.use(require('./planetRoutes'));
router.use(require('./clusterRoutes'));
router.use(require('./chunkRoutes'));
router.use(require('./universeRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
