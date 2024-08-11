/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./VoxelRoutes'));
router.use(require('./UniverseRoutes'));
router.use(require('./TickRoutes'));
router.use(require('./textureRoutes'));
router.use(require('./SizeRoutes'));
router.use(require('./PartRoutes'));
router.use(require('./MaterialRoutes'));
router.use(require('./ItensRoutes'));
router.use(require('./BiomeRoutes'));
router.use(require('./ActionRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
