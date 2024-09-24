/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./Universe_BlockstateRoutes'));
router.use(require('./Modelos_ReceitaRoutes'));
router.use(require('./Modelos_ActionRoutes'));
router.use(require('./Universe_ItemRoutes'));
router.use(require('./Modelos_EntityRoutes'));
router.use(require('./Universe_EntityRoutes'));
router.use(require('./Universe_InterfaceRoutes'));
router.use(require('./Universe_StorageRoutes'));
router.use(require('./Universe_SlotRoutes'));
router.use(require('./Modelos_interfaceRoutes'));
router.use(require('./Modelos_StructureRoutes'));
router.use(require('./Universe_BigitemRoutes'));
router.use(require('./Universe_ChunkRoutes'));
router.use(require('./Universe_cubeRoutes'));
router.use(require('./Modelos_BiomesRoutes'));
router.use(require('./Modelos_RuleRoutes'));
router.use(require('./Modelos_TagRoutes'));
router.use(require('./Modelos_TexturePartRoutes'));
router.use(require('./Modelos_TextureMapRoutes'));
router.use(require('./Modelos_itemRoutes'));
router.use(require('./AtomModelos_FileRoutes'));
router.use(require('./AtomModelos_ModelRoutes'));
router.use(require('./Universe_SettingsRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
