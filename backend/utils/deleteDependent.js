/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Universe_Blockstate = require('../model/Universe_Blockstate');
let Modelos_Receita = require('../model/Modelos_Receita');
let Modelos_Action = require('../model/Modelos_Action');
let Universe_Item = require('../model/Universe_Item');
let Modelos_Entity = require('../model/Modelos_Entity');
let Universe_Entity = require('../model/Universe_Entity');
let Universe_Interface = require('../model/Universe_Interface');
let Universe_Storage = require('../model/Universe_Storage');
let Universe_Slot = require('../model/Universe_Slot');
let Modelos_interface = require('../model/Modelos_interface');
let Modelos_Structure = require('../model/Modelos_Structure');
let Universe_Bigitem = require('../model/Universe_Bigitem');
let Universe_Chunk = require('../model/Universe_Chunk');
let Universe_cube = require('../model/Universe_cube');
let Modelos_Biomes = require('../model/Modelos_Biomes');
let Modelos_Rule = require('../model/Modelos_Rule');
let Modelos_Tag = require('../model/Modelos_Tag');
let Modelos_TexturePart = require('../model/Modelos_TexturePart');
let Modelos_TextureMap = require('../model/Modelos_TextureMap');
let Modelos_item = require('../model/Modelos_item');
let AtomModelos_File = require('../model/AtomModelos_File');
let AtomModelos_Model = require('../model/AtomModelos_Model');
let Universe_Settings = require('../model/Universe_Settings');
let Chat_group = require('../model/Chat_group');
let Chat_message = require('../model/Chat_message');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let ActivityLog = require('../model/activityLog');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteUniverse_Blockstate = async (filter) =>{
  try {
    let universe_blockstate = await dbService.findMany(Universe_Blockstate,filter);
    if (universe_blockstate && universe_blockstate.length){
      universe_blockstate = universe_blockstate.map((obj) => obj.id);

      const Universe_SettingsFilter = { $or: [{ Blockstate : { $in : universe_blockstate } }] };
      const Universe_SettingsCnt = await dbService.deleteMany(Universe_Settings,Universe_SettingsFilter);

      let deleted  = await dbService.deleteMany(Universe_Blockstate,filter);
      let response = { Universe_Settings :Universe_SettingsCnt, };
      return response; 
    } else {
      return {  universe_blockstate : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Receita = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_Receita,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Action = async (filter) =>{
  try {
    let modelos_action = await dbService.findMany(Modelos_Action,filter);
    if (modelos_action && modelos_action.length){
      modelos_action = modelos_action.map((obj) => obj.id);

      const Modelos_ReceitaFilter = { $or: [{ action : { $in : modelos_action } }] };
      const Modelos_ReceitaCnt = await dbService.deleteMany(Modelos_Receita,Modelos_ReceitaFilter);

      let deleted  = await dbService.deleteMany(Modelos_Action,filter);
      let response = { Modelos_Receita :Modelos_ReceitaCnt, };
      return response; 
    } else {
      return {  modelos_action : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Item = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe_Item,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Entity = async (filter) =>{
  try {
    let modelos_entity = await dbService.findMany(Modelos_Entity,filter);
    if (modelos_entity && modelos_entity.length){
      modelos_entity = modelos_entity.map((obj) => obj.id);

      const Universe_EntityFilter = { $or: [{ Model : { $in : modelos_entity } }] };
      const Universe_EntityCnt = await dbService.deleteMany(Universe_Entity,Universe_EntityFilter);

      let deleted  = await dbService.deleteMany(Modelos_Entity,filter);
      let response = { Universe_Entity :Universe_EntityCnt, };
      return response; 
    } else {
      return {  modelos_entity : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Entity = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe_Entity,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Interface = async (filter) =>{
  try {
    let universe_interface = await dbService.findMany(Universe_Interface,filter);
    if (universe_interface && universe_interface.length){
      universe_interface = universe_interface.map((obj) => obj.id);

      const Universe_StorageFilter = { $or: [{ Interface : { $in : universe_interface } }] };
      const Universe_StorageCnt = await dbService.deleteMany(Universe_Storage,Universe_StorageFilter);

      let deleted  = await dbService.deleteMany(Universe_Interface,filter);
      let response = { Universe_Storage :Universe_StorageCnt, };
      return response; 
    } else {
      return {  universe_interface : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Storage = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe_Storage,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Slot = async (filter) =>{
  try {
    let universe_slot = await dbService.findMany(Universe_Slot,filter);
    if (universe_slot && universe_slot.length){
      universe_slot = universe_slot.map((obj) => obj.id);

      const Universe_ItemFilter = { $or: [{ slot : { $in : universe_slot } }] };
      const Universe_ItemCnt = await dbService.deleteMany(Universe_Item,Universe_ItemFilter);

      let deleted  = await dbService.deleteMany(Universe_Slot,filter);
      let response = { Universe_Item :Universe_ItemCnt, };
      return response; 
    } else {
      return {  universe_slot : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_interface = async (filter) =>{
  try {
    let modelos_interface = await dbService.findMany(Modelos_interface,filter);
    if (modelos_interface && modelos_interface.length){
      modelos_interface = modelos_interface.map((obj) => obj.id);

      const Universe_InterfaceFilter = { $or: [{ storage : { $in : modelos_interface } }] };
      const Universe_InterfaceCnt = await dbService.deleteMany(Universe_Interface,Universe_InterfaceFilter);

      const Modelos_itemFilter = { $or: [{ interface : { $in : modelos_interface } }] };
      const Modelos_itemCnt = await dbService.deleteMany(Modelos_item,Modelos_itemFilter);

      let deleted  = await dbService.deleteMany(Modelos_interface,filter);
      let response = {
        Universe_Interface :Universe_InterfaceCnt,
        Modelos_item :Modelos_itemCnt,
      };
      return response; 
    } else {
      return {  modelos_interface : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Structure = async (filter) =>{
  try {
    let modelos_structure = await dbService.findMany(Modelos_Structure,filter);
    if (modelos_structure && modelos_structure.length){
      modelos_structure = modelos_structure.map((obj) => obj.id);

      const Universe_BigitemFilter = { $or: [{ structure : { $in : modelos_structure } }] };
      const Universe_BigitemCnt = await dbService.deleteMany(Universe_Bigitem,Universe_BigitemFilter);

      let deleted  = await dbService.deleteMany(Modelos_Structure,filter);
      let response = { Universe_Bigitem :Universe_BigitemCnt, };
      return response; 
    } else {
      return {  modelos_structure : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Bigitem = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe_Bigitem,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Chunk = async (filter) =>{
  try {
    let universe_chunk = await dbService.findMany(Universe_Chunk,filter);
    if (universe_chunk && universe_chunk.length){
      universe_chunk = universe_chunk.map((obj) => obj.id);

      const Universe_EntityFilter = { $or: [{ Location : { $in : universe_chunk } }] };
      const Universe_EntityCnt = await dbService.deleteMany(Universe_Entity,Universe_EntityFilter);

      const Universe_cubeFilter = { $or: [{ chunk : { $in : universe_chunk } }] };
      const Universe_cubeCnt = await dbService.deleteMany(Universe_cube,Universe_cubeFilter);

      let deleted  = await dbService.deleteMany(Universe_Chunk,filter);
      let response = {
        Universe_Entity :Universe_EntityCnt,
        Universe_cube :Universe_cubeCnt,
      };
      return response; 
    } else {
      return {  universe_chunk : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_cube = async (filter) =>{
  try {
    let universe_cube = await dbService.findMany(Universe_cube,filter);
    if (universe_cube && universe_cube.length){
      universe_cube = universe_cube.map((obj) => obj.id);

      const Universe_ItemFilter = { $or: [{ cube : { $in : universe_cube } }] };
      const Universe_ItemCnt = await dbService.deleteMany(Universe_Item,Universe_ItemFilter);

      const Universe_InterfaceFilter = { $or: [{ Cube : { $in : universe_cube } }] };
      const Universe_InterfaceCnt = await dbService.deleteMany(Universe_Interface,Universe_InterfaceFilter);

      const Universe_ChunkFilter = { $or: [{ chunk : { $in : universe_cube } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      let deleted  = await dbService.deleteMany(Universe_cube,filter);
      let response = {
        Universe_Item :Universe_ItemCnt,
        Universe_Interface :Universe_InterfaceCnt,
        Universe_Chunk :Universe_ChunkCnt,
      };
      return response; 
    } else {
      return {  universe_cube : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Biomes = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_Biomes,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Rule = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_Rule,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Tag = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_Tag,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_TexturePart = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_TexturePart,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_TextureMap = async (filter) =>{
  try {
    let modelos_texturemap = await dbService.findMany(Modelos_TextureMap,filter);
    if (modelos_texturemap && modelos_texturemap.length){
      modelos_texturemap = modelos_texturemap.map((obj) => obj.id);

      const Modelos_itemFilter = { $or: [{ texture : { $in : modelos_texturemap } }] };
      const Modelos_itemCnt = await dbService.deleteMany(Modelos_item,Modelos_itemFilter);

      let deleted  = await dbService.deleteMany(Modelos_TextureMap,filter);
      let response = { Modelos_item :Modelos_itemCnt, };
      return response; 
    } else {
      return {  modelos_texturemap : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_item = async (filter) =>{
  try {
    let modelos_item = await dbService.findMany(Modelos_item,filter);
    if (modelos_item && modelos_item.length){
      modelos_item = modelos_item.map((obj) => obj.id);

      const Modelos_EntityFilter = { $or: [{ model : { $in : modelos_item } }] };
      const Modelos_EntityCnt = await dbService.deleteMany(Modelos_Entity,Modelos_EntityFilter);

      const Universe_InterfaceFilter = { $or: [{ Item : { $in : modelos_item } }] };
      const Universe_InterfaceCnt = await dbService.deleteMany(Universe_Interface,Universe_InterfaceFilter);

      let deleted  = await dbService.deleteMany(Modelos_item,filter);
      let response = {
        Modelos_Entity :Modelos_EntityCnt,
        Universe_Interface :Universe_InterfaceCnt,
      };
      return response; 
    } else {
      return {  modelos_item : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAtomModelos_File = async (filter) =>{
  try {
    let atommodelos_file = await dbService.findMany(AtomModelos_File,filter);
    if (atommodelos_file && atommodelos_file.length){
      atommodelos_file = atommodelos_file.map((obj) => obj.id);

      const Modelos_TexturePartFilter = { $or: [{ texture : { $in : atommodelos_file } }] };
      const Modelos_TexturePartCnt = await dbService.deleteMany(Modelos_TexturePart,Modelos_TexturePartFilter);

      let deleted  = await dbService.deleteMany(AtomModelos_File,filter);
      let response = { Modelos_TexturePart :Modelos_TexturePartCnt, };
      return response; 
    } else {
      return {  atommodelos_file : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAtomModelos_Model = async (filter) =>{
  try {
    let atommodelos_model = await dbService.findMany(AtomModelos_Model,filter);
    if (atommodelos_model && atommodelos_model.length){
      atommodelos_model = atommodelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { $or: [{ model : { $in : atommodelos_model } }] };
      const Modelos_itemCnt = await dbService.deleteMany(Modelos_item,Modelos_itemFilter);

      let deleted  = await dbService.deleteMany(AtomModelos_Model,filter);
      let response = { Modelos_item :Modelos_itemCnt, };
      return response; 
    } else {
      return {  atommodelos_model : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Settings = async (filter) =>{
  try {
    let universe_settings = await dbService.findMany(Universe_Settings,filter);
    if (universe_settings && universe_settings.length){
      universe_settings = universe_settings.map((obj) => obj.id);

      const Universe_EntityFilter = { $or: [{ Universe : { $in : universe_settings } }] };
      const Universe_EntityCnt = await dbService.deleteMany(Universe_Entity,Universe_EntityFilter);

      const Universe_BigitemFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Universe_BigitemCnt = await dbService.deleteMany(Universe_Bigitem,Universe_BigitemFilter);

      const Universe_ChunkFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      const Universe_cubeFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Universe_cubeCnt = await dbService.deleteMany(Universe_cube,Universe_cubeFilter);

      let deleted  = await dbService.deleteMany(Universe_Settings,filter);
      let response = {
        Universe_Entity :Universe_EntityCnt,
        Universe_Bigitem :Universe_BigitemCnt,
        Universe_Chunk :Universe_ChunkCnt,
        Universe_cube :Universe_cubeCnt,
      };
      return response; 
    } else {
      return {  universe_settings : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Universe_ChunkFilter = { $or: [{ chat : { $in : chat_group } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = {
        Universe_Chunk :Universe_ChunkCnt,
        Chat_message :Chat_messageCnt,
      };
      return response; 
    } else {
      return {  chat_group : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_message = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chat_message,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const Modelos_ReceitaFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_ReceitaCnt = await dbService.deleteMany(Modelos_Receita,Modelos_ReceitaFilter);

      const Modelos_ActionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_ActionCnt = await dbService.deleteMany(Modelos_Action,Modelos_ActionFilter);

      const Universe_ItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_ItemCnt = await dbService.deleteMany(Universe_Item,Universe_ItemFilter);

      const Modelos_EntityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_EntityCnt = await dbService.deleteMany(Modelos_Entity,Modelos_EntityFilter);

      const Universe_EntityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_EntityCnt = await dbService.deleteMany(Universe_Entity,Universe_EntityFilter);

      const Universe_InterfaceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_InterfaceCnt = await dbService.deleteMany(Universe_Interface,Universe_InterfaceFilter);

      const Universe_StorageFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_StorageCnt = await dbService.deleteMany(Universe_Storage,Universe_StorageFilter);

      const Universe_SlotFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_SlotCnt = await dbService.deleteMany(Universe_Slot,Universe_SlotFilter);

      const Modelos_interfaceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_interfaceCnt = await dbService.deleteMany(Modelos_interface,Modelos_interfaceFilter);

      const Modelos_StructureFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_StructureCnt = await dbService.deleteMany(Modelos_Structure,Modelos_StructureFilter);

      const Universe_BigitemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_BigitemCnt = await dbService.deleteMany(Universe_Bigitem,Universe_BigitemFilter);

      const Universe_ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      const Universe_cubeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_cubeCnt = await dbService.deleteMany(Universe_cube,Universe_cubeFilter);

      const Modelos_BiomesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_BiomesCnt = await dbService.deleteMany(Modelos_Biomes,Modelos_BiomesFilter);

      const Modelos_RuleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_RuleCnt = await dbService.deleteMany(Modelos_Rule,Modelos_RuleFilter);

      const Modelos_TagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TagCnt = await dbService.deleteMany(Modelos_Tag,Modelos_TagFilter);

      const Modelos_TexturePartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TexturePartCnt = await dbService.deleteMany(Modelos_TexturePart,Modelos_TexturePartFilter);

      const Modelos_TextureMapFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TextureMapCnt = await dbService.deleteMany(Modelos_TextureMap,Modelos_TextureMapFilter);

      const Modelos_itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_itemCnt = await dbService.deleteMany(Modelos_item,Modelos_itemFilter);

      const AtomModelos_FileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const AtomModelos_FileCnt = await dbService.deleteMany(AtomModelos_File,AtomModelos_FileFilter);

      const AtomModelos_ModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const AtomModelos_ModelCnt = await dbService.deleteMany(AtomModelos_Model,AtomModelos_ModelFilter);

      const Universe_SettingsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_SettingsCnt = await dbService.deleteMany(Universe_Settings,Universe_SettingsFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        Modelos_Receita :Modelos_ReceitaCnt,
        Modelos_Action :Modelos_ActionCnt,
        Universe_Item :Universe_ItemCnt,
        Modelos_Entity :Modelos_EntityCnt,
        Universe_Entity :Universe_EntityCnt,
        Universe_Interface :Universe_InterfaceCnt,
        Universe_Storage :Universe_StorageCnt,
        Universe_Slot :Universe_SlotCnt,
        Modelos_interface :Modelos_interfaceCnt,
        Modelos_Structure :Modelos_StructureCnt,
        Universe_Bigitem :Universe_BigitemCnt,
        Universe_Chunk :Universe_ChunkCnt,
        Universe_cube :Universe_cubeCnt,
        Modelos_Biomes :Modelos_BiomesCnt,
        Modelos_Rule :Modelos_RuleCnt,
        Modelos_Tag :Modelos_TagCnt,
        Modelos_TexturePart :Modelos_TexturePartCnt,
        Modelos_TextureMap :Modelos_TextureMapCnt,
        Modelos_item :Modelos_itemCnt,
        AtomModelos_File :AtomModelos_FileCnt,
        AtomModelos_Model :AtomModelos_ModelCnt,
        Universe_Settings :Universe_SettingsCnt,
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        user :userCnt + deleted,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteActivityLog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ActivityLog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Blockstate = async (filter) =>{
  try {
    let universe_blockstate = await dbService.findMany(Universe_Blockstate,filter);
    if (universe_blockstate && universe_blockstate.length){
      universe_blockstate = universe_blockstate.map((obj) => obj.id);

      const Universe_SettingsFilter = { $or: [{ Blockstate : { $in : universe_blockstate } }] };
      const Universe_SettingsCnt =  await dbService.count(Universe_Settings,Universe_SettingsFilter);

      let response = { Universe_Settings : Universe_SettingsCnt, };
      return response; 
    } else {
      return {  universe_blockstate : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Receita = async (filter) =>{
  try {
    const Modelos_ReceitaCnt =  await dbService.count(Modelos_Receita,filter);
    return { Modelos_Receita : Modelos_ReceitaCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Action = async (filter) =>{
  try {
    let modelos_action = await dbService.findMany(Modelos_Action,filter);
    if (modelos_action && modelos_action.length){
      modelos_action = modelos_action.map((obj) => obj.id);

      const Modelos_ReceitaFilter = { $or: [{ action : { $in : modelos_action } }] };
      const Modelos_ReceitaCnt =  await dbService.count(Modelos_Receita,Modelos_ReceitaFilter);

      let response = { Modelos_Receita : Modelos_ReceitaCnt, };
      return response; 
    } else {
      return {  modelos_action : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Item = async (filter) =>{
  try {
    const Universe_ItemCnt =  await dbService.count(Universe_Item,filter);
    return { Universe_Item : Universe_ItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Entity = async (filter) =>{
  try {
    let modelos_entity = await dbService.findMany(Modelos_Entity,filter);
    if (modelos_entity && modelos_entity.length){
      modelos_entity = modelos_entity.map((obj) => obj.id);

      const Universe_EntityFilter = { $or: [{ Model : { $in : modelos_entity } }] };
      const Universe_EntityCnt =  await dbService.count(Universe_Entity,Universe_EntityFilter);

      let response = { Universe_Entity : Universe_EntityCnt, };
      return response; 
    } else {
      return {  modelos_entity : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Entity = async (filter) =>{
  try {
    const Universe_EntityCnt =  await dbService.count(Universe_Entity,filter);
    return { Universe_Entity : Universe_EntityCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Interface = async (filter) =>{
  try {
    let universe_interface = await dbService.findMany(Universe_Interface,filter);
    if (universe_interface && universe_interface.length){
      universe_interface = universe_interface.map((obj) => obj.id);

      const Universe_StorageFilter = { $or: [{ Interface : { $in : universe_interface } }] };
      const Universe_StorageCnt =  await dbService.count(Universe_Storage,Universe_StorageFilter);

      let response = { Universe_Storage : Universe_StorageCnt, };
      return response; 
    } else {
      return {  universe_interface : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Storage = async (filter) =>{
  try {
    const Universe_StorageCnt =  await dbService.count(Universe_Storage,filter);
    return { Universe_Storage : Universe_StorageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Slot = async (filter) =>{
  try {
    let universe_slot = await dbService.findMany(Universe_Slot,filter);
    if (universe_slot && universe_slot.length){
      universe_slot = universe_slot.map((obj) => obj.id);

      const Universe_ItemFilter = { $or: [{ slot : { $in : universe_slot } }] };
      const Universe_ItemCnt =  await dbService.count(Universe_Item,Universe_ItemFilter);

      let response = { Universe_Item : Universe_ItemCnt, };
      return response; 
    } else {
      return {  universe_slot : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_interface = async (filter) =>{
  try {
    let modelos_interface = await dbService.findMany(Modelos_interface,filter);
    if (modelos_interface && modelos_interface.length){
      modelos_interface = modelos_interface.map((obj) => obj.id);

      const Universe_InterfaceFilter = { $or: [{ storage : { $in : modelos_interface } }] };
      const Universe_InterfaceCnt =  await dbService.count(Universe_Interface,Universe_InterfaceFilter);

      const Modelos_itemFilter = { $or: [{ interface : { $in : modelos_interface } }] };
      const Modelos_itemCnt =  await dbService.count(Modelos_item,Modelos_itemFilter);

      let response = {
        Universe_Interface : Universe_InterfaceCnt,
        Modelos_item : Modelos_itemCnt,
      };
      return response; 
    } else {
      return {  modelos_interface : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Structure = async (filter) =>{
  try {
    let modelos_structure = await dbService.findMany(Modelos_Structure,filter);
    if (modelos_structure && modelos_structure.length){
      modelos_structure = modelos_structure.map((obj) => obj.id);

      const Universe_BigitemFilter = { $or: [{ structure : { $in : modelos_structure } }] };
      const Universe_BigitemCnt =  await dbService.count(Universe_Bigitem,Universe_BigitemFilter);

      let response = { Universe_Bigitem : Universe_BigitemCnt, };
      return response; 
    } else {
      return {  modelos_structure : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Bigitem = async (filter) =>{
  try {
    const Universe_BigitemCnt =  await dbService.count(Universe_Bigitem,filter);
    return { Universe_Bigitem : Universe_BigitemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Chunk = async (filter) =>{
  try {
    let universe_chunk = await dbService.findMany(Universe_Chunk,filter);
    if (universe_chunk && universe_chunk.length){
      universe_chunk = universe_chunk.map((obj) => obj.id);

      const Universe_EntityFilter = { $or: [{ Location : { $in : universe_chunk } }] };
      const Universe_EntityCnt =  await dbService.count(Universe_Entity,Universe_EntityFilter);

      const Universe_cubeFilter = { $or: [{ chunk : { $in : universe_chunk } }] };
      const Universe_cubeCnt =  await dbService.count(Universe_cube,Universe_cubeFilter);

      let response = {
        Universe_Entity : Universe_EntityCnt,
        Universe_cube : Universe_cubeCnt,
      };
      return response; 
    } else {
      return {  universe_chunk : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_cube = async (filter) =>{
  try {
    let universe_cube = await dbService.findMany(Universe_cube,filter);
    if (universe_cube && universe_cube.length){
      universe_cube = universe_cube.map((obj) => obj.id);

      const Universe_ItemFilter = { $or: [{ cube : { $in : universe_cube } }] };
      const Universe_ItemCnt =  await dbService.count(Universe_Item,Universe_ItemFilter);

      const Universe_InterfaceFilter = { $or: [{ Cube : { $in : universe_cube } }] };
      const Universe_InterfaceCnt =  await dbService.count(Universe_Interface,Universe_InterfaceFilter);

      const Universe_ChunkFilter = { $or: [{ chunk : { $in : universe_cube } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      let response = {
        Universe_Item : Universe_ItemCnt,
        Universe_Interface : Universe_InterfaceCnt,
        Universe_Chunk : Universe_ChunkCnt,
      };
      return response; 
    } else {
      return {  universe_cube : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Biomes = async (filter) =>{
  try {
    const Modelos_BiomesCnt =  await dbService.count(Modelos_Biomes,filter);
    return { Modelos_Biomes : Modelos_BiomesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Rule = async (filter) =>{
  try {
    const Modelos_RuleCnt =  await dbService.count(Modelos_Rule,filter);
    return { Modelos_Rule : Modelos_RuleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Tag = async (filter) =>{
  try {
    const Modelos_TagCnt =  await dbService.count(Modelos_Tag,filter);
    return { Modelos_Tag : Modelos_TagCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_TexturePart = async (filter) =>{
  try {
    const Modelos_TexturePartCnt =  await dbService.count(Modelos_TexturePart,filter);
    return { Modelos_TexturePart : Modelos_TexturePartCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_TextureMap = async (filter) =>{
  try {
    let modelos_texturemap = await dbService.findMany(Modelos_TextureMap,filter);
    if (modelos_texturemap && modelos_texturemap.length){
      modelos_texturemap = modelos_texturemap.map((obj) => obj.id);

      const Modelos_itemFilter = { $or: [{ texture : { $in : modelos_texturemap } }] };
      const Modelos_itemCnt =  await dbService.count(Modelos_item,Modelos_itemFilter);

      let response = { Modelos_item : Modelos_itemCnt, };
      return response; 
    } else {
      return {  modelos_texturemap : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_item = async (filter) =>{
  try {
    let modelos_item = await dbService.findMany(Modelos_item,filter);
    if (modelos_item && modelos_item.length){
      modelos_item = modelos_item.map((obj) => obj.id);

      const Modelos_EntityFilter = { $or: [{ model : { $in : modelos_item } }] };
      const Modelos_EntityCnt =  await dbService.count(Modelos_Entity,Modelos_EntityFilter);

      const Universe_InterfaceFilter = { $or: [{ Item : { $in : modelos_item } }] };
      const Universe_InterfaceCnt =  await dbService.count(Universe_Interface,Universe_InterfaceFilter);

      let response = {
        Modelos_Entity : Modelos_EntityCnt,
        Universe_Interface : Universe_InterfaceCnt,
      };
      return response; 
    } else {
      return {  modelos_item : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAtomModelos_File = async (filter) =>{
  try {
    let atommodelos_file = await dbService.findMany(AtomModelos_File,filter);
    if (atommodelos_file && atommodelos_file.length){
      atommodelos_file = atommodelos_file.map((obj) => obj.id);

      const Modelos_TexturePartFilter = { $or: [{ texture : { $in : atommodelos_file } }] };
      const Modelos_TexturePartCnt =  await dbService.count(Modelos_TexturePart,Modelos_TexturePartFilter);

      let response = { Modelos_TexturePart : Modelos_TexturePartCnt, };
      return response; 
    } else {
      return {  atommodelos_file : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAtomModelos_Model = async (filter) =>{
  try {
    let atommodelos_model = await dbService.findMany(AtomModelos_Model,filter);
    if (atommodelos_model && atommodelos_model.length){
      atommodelos_model = atommodelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { $or: [{ model : { $in : atommodelos_model } }] };
      const Modelos_itemCnt =  await dbService.count(Modelos_item,Modelos_itemFilter);

      let response = { Modelos_item : Modelos_itemCnt, };
      return response; 
    } else {
      return {  atommodelos_model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Settings = async (filter) =>{
  try {
    let universe_settings = await dbService.findMany(Universe_Settings,filter);
    if (universe_settings && universe_settings.length){
      universe_settings = universe_settings.map((obj) => obj.id);

      const Universe_EntityFilter = { $or: [{ Universe : { $in : universe_settings } }] };
      const Universe_EntityCnt =  await dbService.count(Universe_Entity,Universe_EntityFilter);

      const Universe_BigitemFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Universe_BigitemCnt =  await dbService.count(Universe_Bigitem,Universe_BigitemFilter);

      const Universe_ChunkFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      const Universe_cubeFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Universe_cubeCnt =  await dbService.count(Universe_cube,Universe_cubeFilter);

      let response = {
        Universe_Entity : Universe_EntityCnt,
        Universe_Bigitem : Universe_BigitemCnt,
        Universe_Chunk : Universe_ChunkCnt,
        Universe_cube : Universe_cubeCnt,
      };
      return response; 
    } else {
      return {  universe_settings : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Universe_ChunkFilter = { $or: [{ chat : { $in : chat_group } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = {
        Universe_Chunk : Universe_ChunkCnt,
        Chat_message : Chat_messageCnt,
      };
      return response; 
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_message = async (filter) =>{
  try {
    const Chat_messageCnt =  await dbService.count(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const Modelos_ReceitaFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_ReceitaCnt =  await dbService.count(Modelos_Receita,Modelos_ReceitaFilter);

      const Modelos_ActionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_ActionCnt =  await dbService.count(Modelos_Action,Modelos_ActionFilter);

      const Universe_ItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_ItemCnt =  await dbService.count(Universe_Item,Universe_ItemFilter);

      const Modelos_EntityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_EntityCnt =  await dbService.count(Modelos_Entity,Modelos_EntityFilter);

      const Universe_EntityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_EntityCnt =  await dbService.count(Universe_Entity,Universe_EntityFilter);

      const Universe_InterfaceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_InterfaceCnt =  await dbService.count(Universe_Interface,Universe_InterfaceFilter);

      const Universe_StorageFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_StorageCnt =  await dbService.count(Universe_Storage,Universe_StorageFilter);

      const Universe_SlotFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_SlotCnt =  await dbService.count(Universe_Slot,Universe_SlotFilter);

      const Modelos_interfaceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_interfaceCnt =  await dbService.count(Modelos_interface,Modelos_interfaceFilter);

      const Modelos_StructureFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_StructureCnt =  await dbService.count(Modelos_Structure,Modelos_StructureFilter);

      const Universe_BigitemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_BigitemCnt =  await dbService.count(Universe_Bigitem,Universe_BigitemFilter);

      const Universe_ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      const Universe_cubeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_cubeCnt =  await dbService.count(Universe_cube,Universe_cubeFilter);

      const Modelos_BiomesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_BiomesCnt =  await dbService.count(Modelos_Biomes,Modelos_BiomesFilter);

      const Modelos_RuleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_RuleCnt =  await dbService.count(Modelos_Rule,Modelos_RuleFilter);

      const Modelos_TagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TagCnt =  await dbService.count(Modelos_Tag,Modelos_TagFilter);

      const Modelos_TexturePartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TexturePartCnt =  await dbService.count(Modelos_TexturePart,Modelos_TexturePartFilter);

      const Modelos_TextureMapFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TextureMapCnt =  await dbService.count(Modelos_TextureMap,Modelos_TextureMapFilter);

      const Modelos_itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_itemCnt =  await dbService.count(Modelos_item,Modelos_itemFilter);

      const AtomModelos_FileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const AtomModelos_FileCnt =  await dbService.count(AtomModelos_File,AtomModelos_FileFilter);

      const AtomModelos_ModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const AtomModelos_ModelCnt =  await dbService.count(AtomModelos_Model,AtomModelos_ModelFilter);

      const Universe_SettingsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_SettingsCnt =  await dbService.count(Universe_Settings,Universe_SettingsFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        Modelos_Receita : Modelos_ReceitaCnt,
        Modelos_Action : Modelos_ActionCnt,
        Universe_Item : Universe_ItemCnt,
        Modelos_Entity : Modelos_EntityCnt,
        Universe_Entity : Universe_EntityCnt,
        Universe_Interface : Universe_InterfaceCnt,
        Universe_Storage : Universe_StorageCnt,
        Universe_Slot : Universe_SlotCnt,
        Modelos_interface : Modelos_interfaceCnt,
        Modelos_Structure : Modelos_StructureCnt,
        Universe_Bigitem : Universe_BigitemCnt,
        Universe_Chunk : Universe_ChunkCnt,
        Universe_cube : Universe_cubeCnt,
        Modelos_Biomes : Modelos_BiomesCnt,
        Modelos_Rule : Modelos_RuleCnt,
        Modelos_Tag : Modelos_TagCnt,
        Modelos_TexturePart : Modelos_TexturePartCnt,
        Modelos_TextureMap : Modelos_TextureMapCnt,
        Modelos_item : Modelos_itemCnt,
        AtomModelos_File : AtomModelos_FileCnt,
        AtomModelos_Model : AtomModelos_ModelCnt,
        Universe_Settings : Universe_SettingsCnt,
        Chat_group : Chat_groupCnt,
        Chat_message : Chat_messageCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countActivityLog = async (filter) =>{
  try {
    const activityLogCnt =  await dbService.count(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Blockstate = async (filter,updateBody) =>{  
  try {
    let universe_blockstate = await dbService.findMany(Universe_Blockstate,filter, { id:1 });
    if (universe_blockstate.length){
      universe_blockstate = universe_blockstate.map((obj) => obj.id);

      const Universe_SettingsFilter = { '$or': [{ Blockstate : { '$in' : universe_blockstate } }] };
      const Universe_SettingsCnt = await dbService.updateMany(Universe_Settings,Universe_SettingsFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Blockstate,filter,updateBody);

      let response = { Universe_Settings :Universe_SettingsCnt, };
      return response;
    } else {
      return {  universe_blockstate : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Receita = async (filter,updateBody) =>{  
  try {
    const Modelos_ReceitaCnt =  await dbService.updateMany(Modelos_Receita,filter);
    return { Modelos_Receita : Modelos_ReceitaCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Action = async (filter,updateBody) =>{  
  try {
    let modelos_action = await dbService.findMany(Modelos_Action,filter, { id:1 });
    if (modelos_action.length){
      modelos_action = modelos_action.map((obj) => obj.id);

      const Modelos_ReceitaFilter = { '$or': [{ action : { '$in' : modelos_action } }] };
      const Modelos_ReceitaCnt = await dbService.updateMany(Modelos_Receita,Modelos_ReceitaFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_Action,filter,updateBody);

      let response = { Modelos_Receita :Modelos_ReceitaCnt, };
      return response;
    } else {
      return {  modelos_action : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Item = async (filter,updateBody) =>{  
  try {
    const Universe_ItemCnt =  await dbService.updateMany(Universe_Item,filter);
    return { Universe_Item : Universe_ItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Entity = async (filter,updateBody) =>{  
  try {
    let modelos_entity = await dbService.findMany(Modelos_Entity,filter, { id:1 });
    if (modelos_entity.length){
      modelos_entity = modelos_entity.map((obj) => obj.id);

      const Universe_EntityFilter = { '$or': [{ Model : { '$in' : modelos_entity } }] };
      const Universe_EntityCnt = await dbService.updateMany(Universe_Entity,Universe_EntityFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_Entity,filter,updateBody);

      let response = { Universe_Entity :Universe_EntityCnt, };
      return response;
    } else {
      return {  modelos_entity : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Entity = async (filter,updateBody) =>{  
  try {
    const Universe_EntityCnt =  await dbService.updateMany(Universe_Entity,filter);
    return { Universe_Entity : Universe_EntityCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Interface = async (filter,updateBody) =>{  
  try {
    let universe_interface = await dbService.findMany(Universe_Interface,filter, { id:1 });
    if (universe_interface.length){
      universe_interface = universe_interface.map((obj) => obj.id);

      const Universe_StorageFilter = { '$or': [{ Interface : { '$in' : universe_interface } }] };
      const Universe_StorageCnt = await dbService.updateMany(Universe_Storage,Universe_StorageFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Interface,filter,updateBody);

      let response = { Universe_Storage :Universe_StorageCnt, };
      return response;
    } else {
      return {  universe_interface : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Storage = async (filter,updateBody) =>{  
  try {
    const Universe_StorageCnt =  await dbService.updateMany(Universe_Storage,filter);
    return { Universe_Storage : Universe_StorageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Slot = async (filter,updateBody) =>{  
  try {
    let universe_slot = await dbService.findMany(Universe_Slot,filter, { id:1 });
    if (universe_slot.length){
      universe_slot = universe_slot.map((obj) => obj.id);

      const Universe_ItemFilter = { '$or': [{ slot : { '$in' : universe_slot } }] };
      const Universe_ItemCnt = await dbService.updateMany(Universe_Item,Universe_ItemFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Slot,filter,updateBody);

      let response = { Universe_Item :Universe_ItemCnt, };
      return response;
    } else {
      return {  universe_slot : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_interface = async (filter,updateBody) =>{  
  try {
    let modelos_interface = await dbService.findMany(Modelos_interface,filter, { id:1 });
    if (modelos_interface.length){
      modelos_interface = modelos_interface.map((obj) => obj.id);

      const Universe_InterfaceFilter = { '$or': [{ storage : { '$in' : modelos_interface } }] };
      const Universe_InterfaceCnt = await dbService.updateMany(Universe_Interface,Universe_InterfaceFilter,updateBody);

      const Modelos_itemFilter = { '$or': [{ interface : { '$in' : modelos_interface } }] };
      const Modelos_itemCnt = await dbService.updateMany(Modelos_item,Modelos_itemFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_interface,filter,updateBody);

      let response = {
        Universe_Interface :Universe_InterfaceCnt,
        Modelos_item :Modelos_itemCnt,
      };
      return response;
    } else {
      return {  modelos_interface : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Structure = async (filter,updateBody) =>{  
  try {
    let modelos_structure = await dbService.findMany(Modelos_Structure,filter, { id:1 });
    if (modelos_structure.length){
      modelos_structure = modelos_structure.map((obj) => obj.id);

      const Universe_BigitemFilter = { '$or': [{ structure : { '$in' : modelos_structure } }] };
      const Universe_BigitemCnt = await dbService.updateMany(Universe_Bigitem,Universe_BigitemFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_Structure,filter,updateBody);

      let response = { Universe_Bigitem :Universe_BigitemCnt, };
      return response;
    } else {
      return {  modelos_structure : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Bigitem = async (filter,updateBody) =>{  
  try {
    const Universe_BigitemCnt =  await dbService.updateMany(Universe_Bigitem,filter);
    return { Universe_Bigitem : Universe_BigitemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Chunk = async (filter,updateBody) =>{  
  try {
    let universe_chunk = await dbService.findMany(Universe_Chunk,filter, { id:1 });
    if (universe_chunk.length){
      universe_chunk = universe_chunk.map((obj) => obj.id);

      const Universe_EntityFilter = { '$or': [{ Location : { '$in' : universe_chunk } }] };
      const Universe_EntityCnt = await dbService.updateMany(Universe_Entity,Universe_EntityFilter,updateBody);

      const Universe_cubeFilter = { '$or': [{ chunk : { '$in' : universe_chunk } }] };
      const Universe_cubeCnt = await dbService.updateMany(Universe_cube,Universe_cubeFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Chunk,filter,updateBody);

      let response = {
        Universe_Entity :Universe_EntityCnt,
        Universe_cube :Universe_cubeCnt,
      };
      return response;
    } else {
      return {  universe_chunk : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_cube = async (filter,updateBody) =>{  
  try {
    let universe_cube = await dbService.findMany(Universe_cube,filter, { id:1 });
    if (universe_cube.length){
      universe_cube = universe_cube.map((obj) => obj.id);

      const Universe_ItemFilter = { '$or': [{ cube : { '$in' : universe_cube } }] };
      const Universe_ItemCnt = await dbService.updateMany(Universe_Item,Universe_ItemFilter,updateBody);

      const Universe_InterfaceFilter = { '$or': [{ Cube : { '$in' : universe_cube } }] };
      const Universe_InterfaceCnt = await dbService.updateMany(Universe_Interface,Universe_InterfaceFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ chunk : { '$in' : universe_cube } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);
      let updated = await dbService.updateMany(Universe_cube,filter,updateBody);

      let response = {
        Universe_Item :Universe_ItemCnt,
        Universe_Interface :Universe_InterfaceCnt,
        Universe_Chunk :Universe_ChunkCnt,
      };
      return response;
    } else {
      return {  universe_cube : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Biomes = async (filter,updateBody) =>{  
  try {
    const Modelos_BiomesCnt =  await dbService.updateMany(Modelos_Biomes,filter);
    return { Modelos_Biomes : Modelos_BiomesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Rule = async (filter,updateBody) =>{  
  try {
    const Modelos_RuleCnt =  await dbService.updateMany(Modelos_Rule,filter);
    return { Modelos_Rule : Modelos_RuleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Tag = async (filter,updateBody) =>{  
  try {
    const Modelos_TagCnt =  await dbService.updateMany(Modelos_Tag,filter);
    return { Modelos_Tag : Modelos_TagCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_TexturePart = async (filter,updateBody) =>{  
  try {
    const Modelos_TexturePartCnt =  await dbService.updateMany(Modelos_TexturePart,filter);
    return { Modelos_TexturePart : Modelos_TexturePartCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_TextureMap = async (filter,updateBody) =>{  
  try {
    let modelos_texturemap = await dbService.findMany(Modelos_TextureMap,filter, { id:1 });
    if (modelos_texturemap.length){
      modelos_texturemap = modelos_texturemap.map((obj) => obj.id);

      const Modelos_itemFilter = { '$or': [{ texture : { '$in' : modelos_texturemap } }] };
      const Modelos_itemCnt = await dbService.updateMany(Modelos_item,Modelos_itemFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_TextureMap,filter,updateBody);

      let response = { Modelos_item :Modelos_itemCnt, };
      return response;
    } else {
      return {  modelos_texturemap : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_item = async (filter,updateBody) =>{  
  try {
    let modelos_item = await dbService.findMany(Modelos_item,filter, { id:1 });
    if (modelos_item.length){
      modelos_item = modelos_item.map((obj) => obj.id);

      const Modelos_EntityFilter = { '$or': [{ model : { '$in' : modelos_item } }] };
      const Modelos_EntityCnt = await dbService.updateMany(Modelos_Entity,Modelos_EntityFilter,updateBody);

      const Universe_InterfaceFilter = { '$or': [{ Item : { '$in' : modelos_item } }] };
      const Universe_InterfaceCnt = await dbService.updateMany(Universe_Interface,Universe_InterfaceFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_item,filter,updateBody);

      let response = {
        Modelos_Entity :Modelos_EntityCnt,
        Universe_Interface :Universe_InterfaceCnt,
      };
      return response;
    } else {
      return {  modelos_item : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAtomModelos_File = async (filter,updateBody) =>{  
  try {
    let atommodelos_file = await dbService.findMany(AtomModelos_File,filter, { id:1 });
    if (atommodelos_file.length){
      atommodelos_file = atommodelos_file.map((obj) => obj.id);

      const Modelos_TexturePartFilter = { '$or': [{ texture : { '$in' : atommodelos_file } }] };
      const Modelos_TexturePartCnt = await dbService.updateMany(Modelos_TexturePart,Modelos_TexturePartFilter,updateBody);
      let updated = await dbService.updateMany(AtomModelos_File,filter,updateBody);

      let response = { Modelos_TexturePart :Modelos_TexturePartCnt, };
      return response;
    } else {
      return {  atommodelos_file : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAtomModelos_Model = async (filter,updateBody) =>{  
  try {
    let atommodelos_model = await dbService.findMany(AtomModelos_Model,filter, { id:1 });
    if (atommodelos_model.length){
      atommodelos_model = atommodelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { '$or': [{ model : { '$in' : atommodelos_model } }] };
      const Modelos_itemCnt = await dbService.updateMany(Modelos_item,Modelos_itemFilter,updateBody);
      let updated = await dbService.updateMany(AtomModelos_Model,filter,updateBody);

      let response = { Modelos_item :Modelos_itemCnt, };
      return response;
    } else {
      return {  atommodelos_model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Settings = async (filter,updateBody) =>{  
  try {
    let universe_settings = await dbService.findMany(Universe_Settings,filter, { id:1 });
    if (universe_settings.length){
      universe_settings = universe_settings.map((obj) => obj.id);

      const Universe_EntityFilter = { '$or': [{ Universe : { '$in' : universe_settings } }] };
      const Universe_EntityCnt = await dbService.updateMany(Universe_Entity,Universe_EntityFilter,updateBody);

      const Universe_BigitemFilter = { '$or': [{ universe : { '$in' : universe_settings } }] };
      const Universe_BigitemCnt = await dbService.updateMany(Universe_Bigitem,Universe_BigitemFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ universe : { '$in' : universe_settings } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);

      const Universe_cubeFilter = { '$or': [{ universe : { '$in' : universe_settings } }] };
      const Universe_cubeCnt = await dbService.updateMany(Universe_cube,Universe_cubeFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Settings,filter,updateBody);

      let response = {
        Universe_Entity :Universe_EntityCnt,
        Universe_Bigitem :Universe_BigitemCnt,
        Universe_Chunk :Universe_ChunkCnt,
        Universe_cube :Universe_cubeCnt,
      };
      return response;
    } else {
      return {  universe_settings : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Universe_ChunkFilter = { '$or': [{ chat : { '$in' : chat_group } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = {
        Universe_Chunk :Universe_ChunkCnt,
        Chat_message :Chat_messageCnt,
      };
      return response;
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_message = async (filter,updateBody) =>{  
  try {
    const Chat_messageCnt =  await dbService.updateMany(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const Modelos_ReceitaFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_ReceitaCnt = await dbService.updateMany(Modelos_Receita,Modelos_ReceitaFilter,updateBody);

      const Modelos_ActionFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_ActionCnt = await dbService.updateMany(Modelos_Action,Modelos_ActionFilter,updateBody);

      const Universe_ItemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_ItemCnt = await dbService.updateMany(Universe_Item,Universe_ItemFilter,updateBody);

      const Modelos_EntityFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_EntityCnt = await dbService.updateMany(Modelos_Entity,Modelos_EntityFilter,updateBody);

      const Universe_EntityFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_EntityCnt = await dbService.updateMany(Universe_Entity,Universe_EntityFilter,updateBody);

      const Universe_InterfaceFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_InterfaceCnt = await dbService.updateMany(Universe_Interface,Universe_InterfaceFilter,updateBody);

      const Universe_StorageFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_StorageCnt = await dbService.updateMany(Universe_Storage,Universe_StorageFilter,updateBody);

      const Universe_SlotFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_SlotCnt = await dbService.updateMany(Universe_Slot,Universe_SlotFilter,updateBody);

      const Modelos_interfaceFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_interfaceCnt = await dbService.updateMany(Modelos_interface,Modelos_interfaceFilter,updateBody);

      const Modelos_StructureFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_StructureCnt = await dbService.updateMany(Modelos_Structure,Modelos_StructureFilter,updateBody);

      const Universe_BigitemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_BigitemCnt = await dbService.updateMany(Universe_Bigitem,Universe_BigitemFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);

      const Universe_cubeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_cubeCnt = await dbService.updateMany(Universe_cube,Universe_cubeFilter,updateBody);

      const Modelos_BiomesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_BiomesCnt = await dbService.updateMany(Modelos_Biomes,Modelos_BiomesFilter,updateBody);

      const Modelos_RuleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_RuleCnt = await dbService.updateMany(Modelos_Rule,Modelos_RuleFilter,updateBody);

      const Modelos_TagFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_TagCnt = await dbService.updateMany(Modelos_Tag,Modelos_TagFilter,updateBody);

      const Modelos_TexturePartFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_TexturePartCnt = await dbService.updateMany(Modelos_TexturePart,Modelos_TexturePartFilter,updateBody);

      const Modelos_TextureMapFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_TextureMapCnt = await dbService.updateMany(Modelos_TextureMap,Modelos_TextureMapFilter,updateBody);

      const Modelos_itemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_itemCnt = await dbService.updateMany(Modelos_item,Modelos_itemFilter,updateBody);

      const AtomModelos_FileFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const AtomModelos_FileCnt = await dbService.updateMany(AtomModelos_File,AtomModelos_FileFilter,updateBody);

      const AtomModelos_ModelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const AtomModelos_ModelCnt = await dbService.updateMany(AtomModelos_Model,AtomModelos_ModelFilter,updateBody);

      const Universe_SettingsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_SettingsCnt = await dbService.updateMany(Universe_Settings,Universe_SettingsFilter,updateBody);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        Modelos_Receita :Modelos_ReceitaCnt,
        Modelos_Action :Modelos_ActionCnt,
        Universe_Item :Universe_ItemCnt,
        Modelos_Entity :Modelos_EntityCnt,
        Universe_Entity :Universe_EntityCnt,
        Universe_Interface :Universe_InterfaceCnt,
        Universe_Storage :Universe_StorageCnt,
        Universe_Slot :Universe_SlotCnt,
        Modelos_interface :Modelos_interfaceCnt,
        Modelos_Structure :Modelos_StructureCnt,
        Universe_Bigitem :Universe_BigitemCnt,
        Universe_Chunk :Universe_ChunkCnt,
        Universe_cube :Universe_cubeCnt,
        Modelos_Biomes :Modelos_BiomesCnt,
        Modelos_Rule :Modelos_RuleCnt,
        Modelos_Tag :Modelos_TagCnt,
        Modelos_TexturePart :Modelos_TexturePartCnt,
        Modelos_TextureMap :Modelos_TextureMapCnt,
        Modelos_item :Modelos_itemCnt,
        AtomModelos_File :AtomModelos_FileCnt,
        AtomModelos_Model :AtomModelos_ModelCnt,
        Universe_Settings :Universe_SettingsCnt,
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        user :userCnt + updated,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteActivityLog = async (filter,updateBody) =>{  
  try {
    const activityLogCnt =  await dbService.updateMany(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUniverse_Blockstate,
  deleteModelos_Receita,
  deleteModelos_Action,
  deleteUniverse_Item,
  deleteModelos_Entity,
  deleteUniverse_Entity,
  deleteUniverse_Interface,
  deleteUniverse_Storage,
  deleteUniverse_Slot,
  deleteModelos_interface,
  deleteModelos_Structure,
  deleteUniverse_Bigitem,
  deleteUniverse_Chunk,
  deleteUniverse_cube,
  deleteModelos_Biomes,
  deleteModelos_Rule,
  deleteModelos_Tag,
  deleteModelos_TexturePart,
  deleteModelos_TextureMap,
  deleteModelos_item,
  deleteAtomModelos_File,
  deleteAtomModelos_Model,
  deleteUniverse_Settings,
  deleteChat_group,
  deleteChat_message,
  deleteUser,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUniverse_Blockstate,
  countModelos_Receita,
  countModelos_Action,
  countUniverse_Item,
  countModelos_Entity,
  countUniverse_Entity,
  countUniverse_Interface,
  countUniverse_Storage,
  countUniverse_Slot,
  countModelos_interface,
  countModelos_Structure,
  countUniverse_Bigitem,
  countUniverse_Chunk,
  countUniverse_cube,
  countModelos_Biomes,
  countModelos_Rule,
  countModelos_Tag,
  countModelos_TexturePart,
  countModelos_TextureMap,
  countModelos_item,
  countAtomModelos_File,
  countAtomModelos_Model,
  countUniverse_Settings,
  countChat_group,
  countChat_message,
  countUser,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUniverse_Blockstate,
  softDeleteModelos_Receita,
  softDeleteModelos_Action,
  softDeleteUniverse_Item,
  softDeleteModelos_Entity,
  softDeleteUniverse_Entity,
  softDeleteUniverse_Interface,
  softDeleteUniverse_Storage,
  softDeleteUniverse_Slot,
  softDeleteModelos_interface,
  softDeleteModelos_Structure,
  softDeleteUniverse_Bigitem,
  softDeleteUniverse_Chunk,
  softDeleteUniverse_cube,
  softDeleteModelos_Biomes,
  softDeleteModelos_Rule,
  softDeleteModelos_Tag,
  softDeleteModelos_TexturePart,
  softDeleteModelos_TextureMap,
  softDeleteModelos_item,
  softDeleteAtomModelos_File,
  softDeleteAtomModelos_Model,
  softDeleteUniverse_Settings,
  softDeleteChat_group,
  softDeleteChat_message,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteActivityLog,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
