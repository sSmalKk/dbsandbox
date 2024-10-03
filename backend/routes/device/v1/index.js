/**
 * index.js
 * @description :: index route file of device platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./Universe_AgeRoutes'));
router.use(require('./Modelos_AgeRoutes'));
router.use(require('./Base_CubeRoutes'));
router.use(require('./Base_ChunkRoutes'));
router.use(require('./Modelos_chemistry_elementRoutes'));
router.use(require('./user_characterRoutes'));
router.use(require('./Modelos_chemistry_SubstancesRoutes'));
router.use(require('./Modelos_chemistry_compoundsRoutes'));
router.use(require('./user_sectionRoutes'));
router.use(require('./Modelos_SizeRoutes'));
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
router.use(require('./Universe_StructureRoutes'));
router.use(require('./Universe_ChunkRoutes'));
router.use(require('./Universe_cubeRoutes'));
router.use(require('./Modelos_BiomesRoutes'));
router.use(require('./Modelos_RuleRoutes'));
router.use(require('./Modelos_TagRoutes'));
router.use(require('./Modelos_PartRoutes'));
router.use(require('./Modelos_TextureMapRoutes'));
router.use(require('./Modelos_itemRoutes'));
router.use(require('./Base_Modelos_FileRoutes'));
router.use(require('./Base_Modelos_ModelRoutes'));
router.use(require('./Universe_SettingsRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
