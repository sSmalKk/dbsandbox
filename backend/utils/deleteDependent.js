/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Universe_Age = require('../model/Universe_Age');
let Modelos_Age = require('../model/Modelos_Age');
let Base_Cube = require('../model/Base_Cube');
let Base_Chunk = require('../model/Base_Chunk');
let Modelos_chemistry_element = require('../model/Modelos_chemistry_element');
let User_character = require('../model/user_character');
let Modelos_chemistry_Substances = require('../model/Modelos_chemistry_Substances');
let Modelos_chemistry_compounds = require('../model/Modelos_chemistry_compounds');
let User_section = require('../model/user_section');
let Modelos_Size = require('../model/Modelos_Size');
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
let Universe_Structure = require('../model/Universe_Structure');
let Universe_Chunk = require('../model/Universe_Chunk');
let Universe_cube = require('../model/Universe_cube');
let Modelos_Biomes = require('../model/Modelos_Biomes');
let Modelos_Rule = require('../model/Modelos_Rule');
let Modelos_Tag = require('../model/Modelos_Tag');
let Modelos_Part = require('../model/Modelos_Part');
let Modelos_TextureMap = require('../model/Modelos_TextureMap');
let Modelos_item = require('../model/Modelos_item');
let Base_Modelos_File = require('../model/Base_Modelos_File');
let Base_Modelos_Model = require('../model/Base_Modelos_Model');
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

const deleteUniverse_Age = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe_Age,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Age = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_Age,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBase_Cube = async (filter) =>{
  try {
    let base_cube = await dbService.findMany(Base_Cube,filter);
    if (base_cube && base_cube.length){
      base_cube = base_cube.map((obj) => obj.id);

      const Base_ChunkFilter = { $or: [{ chunk : { $in : base_cube } }] };
      const Base_ChunkCnt = await dbService.deleteMany(Base_Chunk,Base_ChunkFilter);

      let deleted  = await dbService.deleteMany(Base_Cube,filter);
      let response = { Base_Chunk :Base_ChunkCnt, };
      return response; 
    } else {
      return {  base_cube : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBase_Chunk = async (filter) =>{
  try {
    let base_chunk = await dbService.findMany(Base_Chunk,filter);
    if (base_chunk && base_chunk.length){
      base_chunk = base_chunk.map((obj) => obj.id);

      const Base_CubeFilter = { $or: [{ chunk : { $in : base_chunk } }] };
      const Base_CubeCnt = await dbService.deleteMany(Base_Cube,Base_CubeFilter);

      let deleted  = await dbService.deleteMany(Base_Chunk,filter);
      let response = { Base_Cube :Base_CubeCnt, };
      return response; 
    } else {
      return {  base_chunk : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_chemistry_element = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_chemistry_element,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser_character = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(User_character,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_chemistry_Substances = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_chemistry_Substances,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_chemistry_compounds = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_chemistry_compounds,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser_section = async (filter) =>{
  try {
    let user_section = await dbService.findMany(User_section,filter);
    if (user_section && user_section.length){
      user_section = user_section.map((obj) => obj.id);

      const userFilter = { $or: [{ lastsection : { $in : user_section } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      let deleted  = await dbService.deleteMany(User_section,filter);
      let response = { user :userCnt, };
      return response; 
    } else {
      return {  user_section : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Size = async (filter) =>{
  try {
    let modelos_size = await dbService.findMany(Modelos_Size,filter);
    if (modelos_size && modelos_size.length){
      modelos_size = modelos_size.map((obj) => obj.id);

      const Base_ChunkFilter = { $or: [{ size : { $in : modelos_size } }] };
      const Base_ChunkCnt = await dbService.deleteMany(Base_Chunk,Base_ChunkFilter);

      const Modelos_EntityFilter = { $or: [{ Size : { $in : modelos_size } }] };
      const Modelos_EntityCnt = await dbService.deleteMany(Modelos_Entity,Modelos_EntityFilter);

      const Modelos_StructureFilter = { $or: [{ size : { $in : modelos_size } }] };
      const Modelos_StructureCnt = await dbService.deleteMany(Modelos_Structure,Modelos_StructureFilter);

      const Universe_StructureFilter = { $or: [{ size : { $in : modelos_size } }] };
      const Universe_StructureCnt = await dbService.deleteMany(Universe_Structure,Universe_StructureFilter);

      const Universe_ChunkFilter = { $or: [{ size : { $in : modelos_size } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      let deleted  = await dbService.deleteMany(Modelos_Size,filter);
      let response = {
        Base_Chunk :Base_ChunkCnt,
        Modelos_Entity :Modelos_EntityCnt,
        Modelos_Structure :Modelos_StructureCnt,
        Universe_Structure :Universe_StructureCnt,
        Universe_Chunk :Universe_ChunkCnt,
      };
      return response; 
    } else {
      return {  modelos_size : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Blockstate = async (filter) =>{
  try {
    let universe_blockstate = await dbService.findMany(Universe_Blockstate,filter);
    if (universe_blockstate && universe_blockstate.length){
      universe_blockstate = universe_blockstate.map((obj) => obj.id);

      const Modelos_StructureFilter = { $or: [{ Blockstate : { $in : universe_blockstate } }] };
      const Modelos_StructureCnt = await dbService.deleteMany(Modelos_Structure,Modelos_StructureFilter);

      const Universe_StructureFilter = { $or: [{ Blockstate : { $in : universe_blockstate } }] };
      const Universe_StructureCnt = await dbService.deleteMany(Universe_Structure,Universe_StructureFilter);

      const Universe_SettingsFilter = { $or: [{ Blockstate : { $in : universe_blockstate } }] };
      const Universe_SettingsCnt = await dbService.deleteMany(Universe_Settings,Universe_SettingsFilter);

      let deleted  = await dbService.deleteMany(Universe_Blockstate,filter);
      let response = {
        Modelos_Structure :Modelos_StructureCnt,
        Universe_Structure :Universe_StructureCnt,
        Universe_Settings :Universe_SettingsCnt,
      };
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

      const Base_CubeFilter = { $or: [{ interface : { $in : universe_interface } }] };
      const Base_CubeCnt = await dbService.deleteMany(Base_Cube,Base_CubeFilter);

      const Universe_StorageFilter = { $or: [{ Interface : { $in : universe_interface } }] };
      const Universe_StorageCnt = await dbService.deleteMany(Universe_Storage,Universe_StorageFilter);

      const Universe_cubeFilter = { $or: [{ interface : { $in : universe_interface } }] };
      const Universe_cubeCnt = await dbService.deleteMany(Universe_cube,Universe_cubeFilter);

      let deleted  = await dbService.deleteMany(Universe_Interface,filter);
      let response = {
        Base_Cube :Base_CubeCnt,
        Universe_Storage :Universe_StorageCnt,
        Universe_cube :Universe_cubeCnt,
      };
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
    let universe_storage = await dbService.findMany(Universe_Storage,filter);
    if (universe_storage && universe_storage.length){
      universe_storage = universe_storage.map((obj) => obj.id);

      const Base_CubeFilter = { $or: [{ storage : { $in : universe_storage } }] };
      const Base_CubeCnt = await dbService.deleteMany(Base_Cube,Base_CubeFilter);

      const Universe_cubeFilter = { $or: [{ storage : { $in : universe_storage } }] };
      const Universe_cubeCnt = await dbService.deleteMany(Universe_cube,Universe_cubeFilter);

      let deleted  = await dbService.deleteMany(Universe_Storage,filter);
      let response = {
        Base_Cube :Base_CubeCnt,
        Universe_cube :Universe_cubeCnt,
      };
      return response; 
    } else {
      return {  universe_storage : 0 };
    }

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

      const Universe_AgeFilter = { $or: [{ relativeto : { $in : modelos_structure } }] };
      const Universe_AgeCnt = await dbService.deleteMany(Universe_Age,Universe_AgeFilter);

      const Modelos_AgeFilter = { $or: [{ relativeto : { $in : modelos_structure } }] };
      const Modelos_AgeCnt = await dbService.deleteMany(Modelos_Age,Modelos_AgeFilter);

      let deleted  = await dbService.deleteMany(Modelos_Structure,filter);
      let response = {
        Universe_Age :Universe_AgeCnt,
        Modelos_Age :Modelos_AgeCnt,
      };
      return response; 
    } else {
      return {  modelos_structure : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Structure = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe_Structure,filter);
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

      const Modelos_PartFilter = { $or: [{ chunk : { $in : universe_chunk } }] };
      const Modelos_PartCnt = await dbService.deleteMany(Modelos_Part,Modelos_PartFilter);

      let deleted  = await dbService.deleteMany(Universe_Chunk,filter);
      let response = {
        Universe_Entity :Universe_EntityCnt,
        Universe_cube :Universe_cubeCnt,
        Modelos_Part :Modelos_PartCnt,
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

      const Modelos_EntityFilter = { $or: [{ Location : { $in : universe_cube } }] };
      const Modelos_EntityCnt = await dbService.deleteMany(Modelos_Entity,Modelos_EntityFilter);

      const Universe_InterfaceFilter = { $or: [{ Cube : { $in : universe_cube } }] };
      const Universe_InterfaceCnt = await dbService.deleteMany(Universe_Interface,Universe_InterfaceFilter);

      const Universe_ChunkFilter = { $or: [{ chunk : { $in : universe_cube } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      let deleted  = await dbService.deleteMany(Universe_cube,filter);
      let response = {
        Universe_Item :Universe_ItemCnt,
        Modelos_Entity :Modelos_EntityCnt,
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
    let modelos_biomes = await dbService.findMany(Modelos_Biomes,filter);
    if (modelos_biomes && modelos_biomes.length){
      modelos_biomes = modelos_biomes.map((obj) => obj.id);

      const Base_ChunkFilter = { $or: [{ biome : { $in : modelos_biomes } }] };
      const Base_ChunkCnt = await dbService.deleteMany(Base_Chunk,Base_ChunkFilter);

      const Universe_ChunkFilter = { $or: [{ biome : { $in : modelos_biomes } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      let deleted  = await dbService.deleteMany(Modelos_Biomes,filter);
      let response = {
        Base_Chunk :Base_ChunkCnt,
        Universe_Chunk :Universe_ChunkCnt,
      };
      return response; 
    } else {
      return {  modelos_biomes : 0 };
    }

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

const deleteModelos_Part = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_Part,filter);
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

const deleteBase_Modelos_File = async (filter) =>{
  try {
    let base_modelos_file = await dbService.findMany(Base_Modelos_File,filter);
    if (base_modelos_file && base_modelos_file.length){
      base_modelos_file = base_modelos_file.map((obj) => obj.id);

      const Modelos_PartFilter = { $or: [{ texture : { $in : base_modelos_file } }] };
      const Modelos_PartCnt = await dbService.deleteMany(Modelos_Part,Modelos_PartFilter);

      let deleted  = await dbService.deleteMany(Base_Modelos_File,filter);
      let response = { Modelos_Part :Modelos_PartCnt, };
      return response; 
    } else {
      return {  base_modelos_file : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBase_Modelos_Model = async (filter) =>{
  try {
    let base_modelos_model = await dbService.findMany(Base_Modelos_Model,filter);
    if (base_modelos_model && base_modelos_model.length){
      base_modelos_model = base_modelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { $or: [{ model : { $in : base_modelos_model } }] };
      const Modelos_itemCnt = await dbService.deleteMany(Modelos_item,Modelos_itemFilter);

      let deleted  = await dbService.deleteMany(Base_Modelos_Model,filter);
      let response = { Modelos_item :Modelos_itemCnt, };
      return response; 
    } else {
      return {  base_modelos_model : 0 };
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

      const Base_CubeFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Base_CubeCnt = await dbService.deleteMany(Base_Cube,Base_CubeFilter);

      const Base_ChunkFilter = { $or: [{ settings : { $in : universe_settings } }] };
      const Base_ChunkCnt = await dbService.deleteMany(Base_Chunk,Base_ChunkFilter);

      const Universe_EntityFilter = { $or: [{ Universe : { $in : universe_settings } }] };
      const Universe_EntityCnt = await dbService.deleteMany(Universe_Entity,Universe_EntityFilter);

      const Universe_ChunkFilter = { $or: [{ settings : { $in : universe_settings } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      const Universe_cubeFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Universe_cubeCnt = await dbService.deleteMany(Universe_cube,Universe_cubeFilter);

      let deleted  = await dbService.deleteMany(Universe_Settings,filter);
      let response = {
        Base_Cube :Base_CubeCnt,
        Base_Chunk :Base_ChunkCnt,
        Universe_Entity :Universe_EntityCnt,
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

      const Base_ChunkFilter = { $or: [{ chat : { $in : chat_group } }] };
      const Base_ChunkCnt = await dbService.deleteMany(Base_Chunk,Base_ChunkFilter);

      const Universe_ChunkFilter = { $or: [{ chat : { $in : chat_group } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = {
        Base_Chunk :Base_ChunkCnt,
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

      const Base_CubeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_CubeCnt = await dbService.deleteMany(Base_Cube,Base_CubeFilter);

      const Base_ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ op : { $in : user } }] };
      const Base_ChunkCnt = await dbService.deleteMany(Base_Chunk,Base_ChunkFilter);

      const Modelos_chemistry_elementFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_chemistry_elementCnt = await dbService.deleteMany(Modelos_chemistry_element,Modelos_chemistry_elementFilter);

      const user_characterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const user_characterCnt = await dbService.deleteMany(User_character,user_characterFilter);

      const Modelos_chemistry_SubstancesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_chemistry_SubstancesCnt = await dbService.deleteMany(Modelos_chemistry_Substances,Modelos_chemistry_SubstancesFilter);

      const Modelos_chemistry_compoundsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_chemistry_compoundsCnt = await dbService.deleteMany(Modelos_chemistry_compounds,Modelos_chemistry_compoundsFilter);

      const user_sectionFilter = { $or: [{ user : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const user_sectionCnt = await dbService.deleteMany(User_section,user_sectionFilter);

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

      const Universe_StructureFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_StructureCnt = await dbService.deleteMany(Universe_Structure,Universe_StructureFilter);

      const Universe_ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ op : { $in : user } }] };
      const Universe_ChunkCnt = await dbService.deleteMany(Universe_Chunk,Universe_ChunkFilter);

      const Universe_cubeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_cubeCnt = await dbService.deleteMany(Universe_cube,Universe_cubeFilter);

      const Modelos_BiomesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_BiomesCnt = await dbService.deleteMany(Modelos_Biomes,Modelos_BiomesFilter);

      const Modelos_RuleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_RuleCnt = await dbService.deleteMany(Modelos_Rule,Modelos_RuleFilter);

      const Modelos_TagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TagCnt = await dbService.deleteMany(Modelos_Tag,Modelos_TagFilter);

      const Modelos_PartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_PartCnt = await dbService.deleteMany(Modelos_Part,Modelos_PartFilter);

      const Modelos_TextureMapFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TextureMapCnt = await dbService.deleteMany(Modelos_TextureMap,Modelos_TextureMapFilter);

      const Modelos_itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_itemCnt = await dbService.deleteMany(Modelos_item,Modelos_itemFilter);

      const Base_Modelos_FileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_Modelos_FileCnt = await dbService.deleteMany(Base_Modelos_File,Base_Modelos_FileFilter);

      const Base_Modelos_ModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_Modelos_ModelCnt = await dbService.deleteMany(Base_Modelos_Model,Base_Modelos_ModelFilter);

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
        Base_Cube :Base_CubeCnt,
        Base_Chunk :Base_ChunkCnt,
        Modelos_chemistry_element :Modelos_chemistry_elementCnt,
        user_character :user_characterCnt,
        Modelos_chemistry_Substances :Modelos_chemistry_SubstancesCnt,
        Modelos_chemistry_compounds :Modelos_chemistry_compoundsCnt,
        user_section :user_sectionCnt,
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
        Universe_Structure :Universe_StructureCnt,
        Universe_Chunk :Universe_ChunkCnt,
        Universe_cube :Universe_cubeCnt,
        Modelos_Biomes :Modelos_BiomesCnt,
        Modelos_Rule :Modelos_RuleCnt,
        Modelos_Tag :Modelos_TagCnt,
        Modelos_Part :Modelos_PartCnt,
        Modelos_TextureMap :Modelos_TextureMapCnt,
        Modelos_item :Modelos_itemCnt,
        Base_Modelos_File :Base_Modelos_FileCnt,
        Base_Modelos_Model :Base_Modelos_ModelCnt,
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

const countUniverse_Age = async (filter) =>{
  try {
    const Universe_AgeCnt =  await dbService.count(Universe_Age,filter);
    return { Universe_Age : Universe_AgeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Age = async (filter) =>{
  try {
    const Modelos_AgeCnt =  await dbService.count(Modelos_Age,filter);
    return { Modelos_Age : Modelos_AgeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBase_Cube = async (filter) =>{
  try {
    let base_cube = await dbService.findMany(Base_Cube,filter);
    if (base_cube && base_cube.length){
      base_cube = base_cube.map((obj) => obj.id);

      const Base_ChunkFilter = { $or: [{ chunk : { $in : base_cube } }] };
      const Base_ChunkCnt =  await dbService.count(Base_Chunk,Base_ChunkFilter);

      let response = { Base_Chunk : Base_ChunkCnt, };
      return response; 
    } else {
      return {  base_cube : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBase_Chunk = async (filter) =>{
  try {
    let base_chunk = await dbService.findMany(Base_Chunk,filter);
    if (base_chunk && base_chunk.length){
      base_chunk = base_chunk.map((obj) => obj.id);

      const Base_CubeFilter = { $or: [{ chunk : { $in : base_chunk } }] };
      const Base_CubeCnt =  await dbService.count(Base_Cube,Base_CubeFilter);

      let response = { Base_Cube : Base_CubeCnt, };
      return response; 
    } else {
      return {  base_chunk : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_chemistry_element = async (filter) =>{
  try {
    const Modelos_chemistry_elementCnt =  await dbService.count(Modelos_chemistry_element,filter);
    return { Modelos_chemistry_element : Modelos_chemistry_elementCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser_character = async (filter) =>{
  try {
    const user_characterCnt =  await dbService.count(User_character,filter);
    return { user_character : user_characterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_chemistry_Substances = async (filter) =>{
  try {
    const Modelos_chemistry_SubstancesCnt =  await dbService.count(Modelos_chemistry_Substances,filter);
    return { Modelos_chemistry_Substances : Modelos_chemistry_SubstancesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_chemistry_compounds = async (filter) =>{
  try {
    const Modelos_chemistry_compoundsCnt =  await dbService.count(Modelos_chemistry_compounds,filter);
    return { Modelos_chemistry_compounds : Modelos_chemistry_compoundsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser_section = async (filter) =>{
  try {
    let user_section = await dbService.findMany(User_section,filter);
    if (user_section && user_section.length){
      user_section = user_section.map((obj) => obj.id);

      const userFilter = { $or: [{ lastsection : { $in : user_section } }] };
      const userCnt =  await dbService.count(User,userFilter);

      let response = { user : userCnt, };
      return response; 
    } else {
      return {  user_section : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Size = async (filter) =>{
  try {
    let modelos_size = await dbService.findMany(Modelos_Size,filter);
    if (modelos_size && modelos_size.length){
      modelos_size = modelos_size.map((obj) => obj.id);

      const Base_ChunkFilter = { $or: [{ size : { $in : modelos_size } }] };
      const Base_ChunkCnt =  await dbService.count(Base_Chunk,Base_ChunkFilter);

      const Modelos_EntityFilter = { $or: [{ Size : { $in : modelos_size } }] };
      const Modelos_EntityCnt =  await dbService.count(Modelos_Entity,Modelos_EntityFilter);

      const Modelos_StructureFilter = { $or: [{ size : { $in : modelos_size } }] };
      const Modelos_StructureCnt =  await dbService.count(Modelos_Structure,Modelos_StructureFilter);

      const Universe_StructureFilter = { $or: [{ size : { $in : modelos_size } }] };
      const Universe_StructureCnt =  await dbService.count(Universe_Structure,Universe_StructureFilter);

      const Universe_ChunkFilter = { $or: [{ size : { $in : modelos_size } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      let response = {
        Base_Chunk : Base_ChunkCnt,
        Modelos_Entity : Modelos_EntityCnt,
        Modelos_Structure : Modelos_StructureCnt,
        Universe_Structure : Universe_StructureCnt,
        Universe_Chunk : Universe_ChunkCnt,
      };
      return response; 
    } else {
      return {  modelos_size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Blockstate = async (filter) =>{
  try {
    let universe_blockstate = await dbService.findMany(Universe_Blockstate,filter);
    if (universe_blockstate && universe_blockstate.length){
      universe_blockstate = universe_blockstate.map((obj) => obj.id);

      const Modelos_StructureFilter = { $or: [{ Blockstate : { $in : universe_blockstate } }] };
      const Modelos_StructureCnt =  await dbService.count(Modelos_Structure,Modelos_StructureFilter);

      const Universe_StructureFilter = { $or: [{ Blockstate : { $in : universe_blockstate } }] };
      const Universe_StructureCnt =  await dbService.count(Universe_Structure,Universe_StructureFilter);

      const Universe_SettingsFilter = { $or: [{ Blockstate : { $in : universe_blockstate } }] };
      const Universe_SettingsCnt =  await dbService.count(Universe_Settings,Universe_SettingsFilter);

      let response = {
        Modelos_Structure : Modelos_StructureCnt,
        Universe_Structure : Universe_StructureCnt,
        Universe_Settings : Universe_SettingsCnt,
      };
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

      const Base_CubeFilter = { $or: [{ interface : { $in : universe_interface } }] };
      const Base_CubeCnt =  await dbService.count(Base_Cube,Base_CubeFilter);

      const Universe_StorageFilter = { $or: [{ Interface : { $in : universe_interface } }] };
      const Universe_StorageCnt =  await dbService.count(Universe_Storage,Universe_StorageFilter);

      const Universe_cubeFilter = { $or: [{ interface : { $in : universe_interface } }] };
      const Universe_cubeCnt =  await dbService.count(Universe_cube,Universe_cubeFilter);

      let response = {
        Base_Cube : Base_CubeCnt,
        Universe_Storage : Universe_StorageCnt,
        Universe_cube : Universe_cubeCnt,
      };
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
    let universe_storage = await dbService.findMany(Universe_Storage,filter);
    if (universe_storage && universe_storage.length){
      universe_storage = universe_storage.map((obj) => obj.id);

      const Base_CubeFilter = { $or: [{ storage : { $in : universe_storage } }] };
      const Base_CubeCnt =  await dbService.count(Base_Cube,Base_CubeFilter);

      const Universe_cubeFilter = { $or: [{ storage : { $in : universe_storage } }] };
      const Universe_cubeCnt =  await dbService.count(Universe_cube,Universe_cubeFilter);

      let response = {
        Base_Cube : Base_CubeCnt,
        Universe_cube : Universe_cubeCnt,
      };
      return response; 
    } else {
      return {  universe_storage : 0 };
    }
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

      const Universe_AgeFilter = { $or: [{ relativeto : { $in : modelos_structure } }] };
      const Universe_AgeCnt =  await dbService.count(Universe_Age,Universe_AgeFilter);

      const Modelos_AgeFilter = { $or: [{ relativeto : { $in : modelos_structure } }] };
      const Modelos_AgeCnt =  await dbService.count(Modelos_Age,Modelos_AgeFilter);

      let response = {
        Universe_Age : Universe_AgeCnt,
        Modelos_Age : Modelos_AgeCnt,
      };
      return response; 
    } else {
      return {  modelos_structure : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Structure = async (filter) =>{
  try {
    const Universe_StructureCnt =  await dbService.count(Universe_Structure,filter);
    return { Universe_Structure : Universe_StructureCnt };
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

      const Modelos_PartFilter = { $or: [{ chunk : { $in : universe_chunk } }] };
      const Modelos_PartCnt =  await dbService.count(Modelos_Part,Modelos_PartFilter);

      let response = {
        Universe_Entity : Universe_EntityCnt,
        Universe_cube : Universe_cubeCnt,
        Modelos_Part : Modelos_PartCnt,
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

      const Modelos_EntityFilter = { $or: [{ Location : { $in : universe_cube } }] };
      const Modelos_EntityCnt =  await dbService.count(Modelos_Entity,Modelos_EntityFilter);

      const Universe_InterfaceFilter = { $or: [{ Cube : { $in : universe_cube } }] };
      const Universe_InterfaceCnt =  await dbService.count(Universe_Interface,Universe_InterfaceFilter);

      const Universe_ChunkFilter = { $or: [{ chunk : { $in : universe_cube } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      let response = {
        Universe_Item : Universe_ItemCnt,
        Modelos_Entity : Modelos_EntityCnt,
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
    let modelos_biomes = await dbService.findMany(Modelos_Biomes,filter);
    if (modelos_biomes && modelos_biomes.length){
      modelos_biomes = modelos_biomes.map((obj) => obj.id);

      const Base_ChunkFilter = { $or: [{ biome : { $in : modelos_biomes } }] };
      const Base_ChunkCnt =  await dbService.count(Base_Chunk,Base_ChunkFilter);

      const Universe_ChunkFilter = { $or: [{ biome : { $in : modelos_biomes } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      let response = {
        Base_Chunk : Base_ChunkCnt,
        Universe_Chunk : Universe_ChunkCnt,
      };
      return response; 
    } else {
      return {  modelos_biomes : 0 };
    }
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

const countModelos_Part = async (filter) =>{
  try {
    const Modelos_PartCnt =  await dbService.count(Modelos_Part,filter);
    return { Modelos_Part : Modelos_PartCnt };
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

const countBase_Modelos_File = async (filter) =>{
  try {
    let base_modelos_file = await dbService.findMany(Base_Modelos_File,filter);
    if (base_modelos_file && base_modelos_file.length){
      base_modelos_file = base_modelos_file.map((obj) => obj.id);

      const Modelos_PartFilter = { $or: [{ texture : { $in : base_modelos_file } }] };
      const Modelos_PartCnt =  await dbService.count(Modelos_Part,Modelos_PartFilter);

      let response = { Modelos_Part : Modelos_PartCnt, };
      return response; 
    } else {
      return {  base_modelos_file : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBase_Modelos_Model = async (filter) =>{
  try {
    let base_modelos_model = await dbService.findMany(Base_Modelos_Model,filter);
    if (base_modelos_model && base_modelos_model.length){
      base_modelos_model = base_modelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { $or: [{ model : { $in : base_modelos_model } }] };
      const Modelos_itemCnt =  await dbService.count(Modelos_item,Modelos_itemFilter);

      let response = { Modelos_item : Modelos_itemCnt, };
      return response; 
    } else {
      return {  base_modelos_model : 0 };
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

      const Base_CubeFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Base_CubeCnt =  await dbService.count(Base_Cube,Base_CubeFilter);

      const Base_ChunkFilter = { $or: [{ settings : { $in : universe_settings } }] };
      const Base_ChunkCnt =  await dbService.count(Base_Chunk,Base_ChunkFilter);

      const Universe_EntityFilter = { $or: [{ Universe : { $in : universe_settings } }] };
      const Universe_EntityCnt =  await dbService.count(Universe_Entity,Universe_EntityFilter);

      const Universe_ChunkFilter = { $or: [{ settings : { $in : universe_settings } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      const Universe_cubeFilter = { $or: [{ universe : { $in : universe_settings } }] };
      const Universe_cubeCnt =  await dbService.count(Universe_cube,Universe_cubeFilter);

      let response = {
        Base_Cube : Base_CubeCnt,
        Base_Chunk : Base_ChunkCnt,
        Universe_Entity : Universe_EntityCnt,
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

      const Base_ChunkFilter = { $or: [{ chat : { $in : chat_group } }] };
      const Base_ChunkCnt =  await dbService.count(Base_Chunk,Base_ChunkFilter);

      const Universe_ChunkFilter = { $or: [{ chat : { $in : chat_group } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = {
        Base_Chunk : Base_ChunkCnt,
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

      const Base_CubeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_CubeCnt =  await dbService.count(Base_Cube,Base_CubeFilter);

      const Base_ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ op : { $in : user } }] };
      const Base_ChunkCnt =  await dbService.count(Base_Chunk,Base_ChunkFilter);

      const Modelos_chemistry_elementFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_chemistry_elementCnt =  await dbService.count(Modelos_chemistry_element,Modelos_chemistry_elementFilter);

      const user_characterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const user_characterCnt =  await dbService.count(User_character,user_characterFilter);

      const Modelos_chemistry_SubstancesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_chemistry_SubstancesCnt =  await dbService.count(Modelos_chemistry_Substances,Modelos_chemistry_SubstancesFilter);

      const Modelos_chemistry_compoundsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_chemistry_compoundsCnt =  await dbService.count(Modelos_chemistry_compounds,Modelos_chemistry_compoundsFilter);

      const user_sectionFilter = { $or: [{ user : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const user_sectionCnt =  await dbService.count(User_section,user_sectionFilter);

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

      const Universe_StructureFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_StructureCnt =  await dbService.count(Universe_Structure,Universe_StructureFilter);

      const Universe_ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ op : { $in : user } }] };
      const Universe_ChunkCnt =  await dbService.count(Universe_Chunk,Universe_ChunkFilter);

      const Universe_cubeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Universe_cubeCnt =  await dbService.count(Universe_cube,Universe_cubeFilter);

      const Modelos_BiomesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_BiomesCnt =  await dbService.count(Modelos_Biomes,Modelos_BiomesFilter);

      const Modelos_RuleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_RuleCnt =  await dbService.count(Modelos_Rule,Modelos_RuleFilter);

      const Modelos_TagFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TagCnt =  await dbService.count(Modelos_Tag,Modelos_TagFilter);

      const Modelos_PartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_PartCnt =  await dbService.count(Modelos_Part,Modelos_PartFilter);

      const Modelos_TextureMapFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TextureMapCnt =  await dbService.count(Modelos_TextureMap,Modelos_TextureMapFilter);

      const Modelos_itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_itemCnt =  await dbService.count(Modelos_item,Modelos_itemFilter);

      const Base_Modelos_FileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_Modelos_FileCnt =  await dbService.count(Base_Modelos_File,Base_Modelos_FileFilter);

      const Base_Modelos_ModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_Modelos_ModelCnt =  await dbService.count(Base_Modelos_Model,Base_Modelos_ModelFilter);

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
        Base_Cube : Base_CubeCnt,
        Base_Chunk : Base_ChunkCnt,
        Modelos_chemistry_element : Modelos_chemistry_elementCnt,
        user_character : user_characterCnt,
        Modelos_chemistry_Substances : Modelos_chemistry_SubstancesCnt,
        Modelos_chemistry_compounds : Modelos_chemistry_compoundsCnt,
        user_section : user_sectionCnt,
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
        Universe_Structure : Universe_StructureCnt,
        Universe_Chunk : Universe_ChunkCnt,
        Universe_cube : Universe_cubeCnt,
        Modelos_Biomes : Modelos_BiomesCnt,
        Modelos_Rule : Modelos_RuleCnt,
        Modelos_Tag : Modelos_TagCnt,
        Modelos_Part : Modelos_PartCnt,
        Modelos_TextureMap : Modelos_TextureMapCnt,
        Modelos_item : Modelos_itemCnt,
        Base_Modelos_File : Base_Modelos_FileCnt,
        Base_Modelos_Model : Base_Modelos_ModelCnt,
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

const softDeleteUniverse_Age = async (filter,updateBody) =>{  
  try {
    const Universe_AgeCnt =  await dbService.updateMany(Universe_Age,filter);
    return { Universe_Age : Universe_AgeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Age = async (filter,updateBody) =>{  
  try {
    const Modelos_AgeCnt =  await dbService.updateMany(Modelos_Age,filter);
    return { Modelos_Age : Modelos_AgeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBase_Cube = async (filter,updateBody) =>{  
  try {
    let base_cube = await dbService.findMany(Base_Cube,filter, { id:1 });
    if (base_cube.length){
      base_cube = base_cube.map((obj) => obj.id);

      const Base_ChunkFilter = { '$or': [{ chunk : { '$in' : base_cube } }] };
      const Base_ChunkCnt = await dbService.updateMany(Base_Chunk,Base_ChunkFilter,updateBody);
      let updated = await dbService.updateMany(Base_Cube,filter,updateBody);

      let response = { Base_Chunk :Base_ChunkCnt, };
      return response;
    } else {
      return {  base_cube : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBase_Chunk = async (filter,updateBody) =>{  
  try {
    let base_chunk = await dbService.findMany(Base_Chunk,filter, { id:1 });
    if (base_chunk.length){
      base_chunk = base_chunk.map((obj) => obj.id);

      const Base_CubeFilter = { '$or': [{ chunk : { '$in' : base_chunk } }] };
      const Base_CubeCnt = await dbService.updateMany(Base_Cube,Base_CubeFilter,updateBody);
      let updated = await dbService.updateMany(Base_Chunk,filter,updateBody);

      let response = { Base_Cube :Base_CubeCnt, };
      return response;
    } else {
      return {  base_chunk : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_chemistry_element = async (filter,updateBody) =>{  
  try {
    const Modelos_chemistry_elementCnt =  await dbService.updateMany(Modelos_chemistry_element,filter);
    return { Modelos_chemistry_element : Modelos_chemistry_elementCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser_character = async (filter,updateBody) =>{  
  try {
    const user_characterCnt =  await dbService.updateMany(User_character,filter);
    return { user_character : user_characterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_chemistry_Substances = async (filter,updateBody) =>{  
  try {
    const Modelos_chemistry_SubstancesCnt =  await dbService.updateMany(Modelos_chemistry_Substances,filter);
    return { Modelos_chemistry_Substances : Modelos_chemistry_SubstancesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_chemistry_compounds = async (filter,updateBody) =>{  
  try {
    const Modelos_chemistry_compoundsCnt =  await dbService.updateMany(Modelos_chemistry_compounds,filter);
    return { Modelos_chemistry_compounds : Modelos_chemistry_compoundsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser_section = async (filter,updateBody) =>{  
  try {
    let user_section = await dbService.findMany(User_section,filter, { id:1 });
    if (user_section.length){
      user_section = user_section.map((obj) => obj.id);

      const userFilter = { '$or': [{ lastsection : { '$in' : user_section } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);
      let updated = await dbService.updateMany(User_section,filter,updateBody);

      let response = { user :userCnt, };
      return response;
    } else {
      return {  user_section : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Size = async (filter,updateBody) =>{  
  try {
    let modelos_size = await dbService.findMany(Modelos_Size,filter, { id:1 });
    if (modelos_size.length){
      modelos_size = modelos_size.map((obj) => obj.id);

      const Base_ChunkFilter = { '$or': [{ size : { '$in' : modelos_size } }] };
      const Base_ChunkCnt = await dbService.updateMany(Base_Chunk,Base_ChunkFilter,updateBody);

      const Modelos_EntityFilter = { '$or': [{ Size : { '$in' : modelos_size } }] };
      const Modelos_EntityCnt = await dbService.updateMany(Modelos_Entity,Modelos_EntityFilter,updateBody);

      const Modelos_StructureFilter = { '$or': [{ size : { '$in' : modelos_size } }] };
      const Modelos_StructureCnt = await dbService.updateMany(Modelos_Structure,Modelos_StructureFilter,updateBody);

      const Universe_StructureFilter = { '$or': [{ size : { '$in' : modelos_size } }] };
      const Universe_StructureCnt = await dbService.updateMany(Universe_Structure,Universe_StructureFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ size : { '$in' : modelos_size } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_Size,filter,updateBody);

      let response = {
        Base_Chunk :Base_ChunkCnt,
        Modelos_Entity :Modelos_EntityCnt,
        Modelos_Structure :Modelos_StructureCnt,
        Universe_Structure :Universe_StructureCnt,
        Universe_Chunk :Universe_ChunkCnt,
      };
      return response;
    } else {
      return {  modelos_size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Blockstate = async (filter,updateBody) =>{  
  try {
    let universe_blockstate = await dbService.findMany(Universe_Blockstate,filter, { id:1 });
    if (universe_blockstate.length){
      universe_blockstate = universe_blockstate.map((obj) => obj.id);

      const Modelos_StructureFilter = { '$or': [{ Blockstate : { '$in' : universe_blockstate } }] };
      const Modelos_StructureCnt = await dbService.updateMany(Modelos_Structure,Modelos_StructureFilter,updateBody);

      const Universe_StructureFilter = { '$or': [{ Blockstate : { '$in' : universe_blockstate } }] };
      const Universe_StructureCnt = await dbService.updateMany(Universe_Structure,Universe_StructureFilter,updateBody);

      const Universe_SettingsFilter = { '$or': [{ Blockstate : { '$in' : universe_blockstate } }] };
      const Universe_SettingsCnt = await dbService.updateMany(Universe_Settings,Universe_SettingsFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Blockstate,filter,updateBody);

      let response = {
        Modelos_Structure :Modelos_StructureCnt,
        Universe_Structure :Universe_StructureCnt,
        Universe_Settings :Universe_SettingsCnt,
      };
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

      const Base_CubeFilter = { '$or': [{ interface : { '$in' : universe_interface } }] };
      const Base_CubeCnt = await dbService.updateMany(Base_Cube,Base_CubeFilter,updateBody);

      const Universe_StorageFilter = { '$or': [{ Interface : { '$in' : universe_interface } }] };
      const Universe_StorageCnt = await dbService.updateMany(Universe_Storage,Universe_StorageFilter,updateBody);

      const Universe_cubeFilter = { '$or': [{ interface : { '$in' : universe_interface } }] };
      const Universe_cubeCnt = await dbService.updateMany(Universe_cube,Universe_cubeFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Interface,filter,updateBody);

      let response = {
        Base_Cube :Base_CubeCnt,
        Universe_Storage :Universe_StorageCnt,
        Universe_cube :Universe_cubeCnt,
      };
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
    let universe_storage = await dbService.findMany(Universe_Storage,filter, { id:1 });
    if (universe_storage.length){
      universe_storage = universe_storage.map((obj) => obj.id);

      const Base_CubeFilter = { '$or': [{ storage : { '$in' : universe_storage } }] };
      const Base_CubeCnt = await dbService.updateMany(Base_Cube,Base_CubeFilter,updateBody);

      const Universe_cubeFilter = { '$or': [{ storage : { '$in' : universe_storage } }] };
      const Universe_cubeCnt = await dbService.updateMany(Universe_cube,Universe_cubeFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Storage,filter,updateBody);

      let response = {
        Base_Cube :Base_CubeCnt,
        Universe_cube :Universe_cubeCnt,
      };
      return response;
    } else {
      return {  universe_storage : 0 };
    }
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

      const Universe_AgeFilter = { '$or': [{ relativeto : { '$in' : modelos_structure } }] };
      const Universe_AgeCnt = await dbService.updateMany(Universe_Age,Universe_AgeFilter,updateBody);

      const Modelos_AgeFilter = { '$or': [{ relativeto : { '$in' : modelos_structure } }] };
      const Modelos_AgeCnt = await dbService.updateMany(Modelos_Age,Modelos_AgeFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_Structure,filter,updateBody);

      let response = {
        Universe_Age :Universe_AgeCnt,
        Modelos_Age :Modelos_AgeCnt,
      };
      return response;
    } else {
      return {  modelos_structure : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Structure = async (filter,updateBody) =>{  
  try {
    const Universe_StructureCnt =  await dbService.updateMany(Universe_Structure,filter);
    return { Universe_Structure : Universe_StructureCnt };
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

      const Modelos_PartFilter = { '$or': [{ chunk : { '$in' : universe_chunk } }] };
      const Modelos_PartCnt = await dbService.updateMany(Modelos_Part,Modelos_PartFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Chunk,filter,updateBody);

      let response = {
        Universe_Entity :Universe_EntityCnt,
        Universe_cube :Universe_cubeCnt,
        Modelos_Part :Modelos_PartCnt,
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

      const Modelos_EntityFilter = { '$or': [{ Location : { '$in' : universe_cube } }] };
      const Modelos_EntityCnt = await dbService.updateMany(Modelos_Entity,Modelos_EntityFilter,updateBody);

      const Universe_InterfaceFilter = { '$or': [{ Cube : { '$in' : universe_cube } }] };
      const Universe_InterfaceCnt = await dbService.updateMany(Universe_Interface,Universe_InterfaceFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ chunk : { '$in' : universe_cube } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);
      let updated = await dbService.updateMany(Universe_cube,filter,updateBody);

      let response = {
        Universe_Item :Universe_ItemCnt,
        Modelos_Entity :Modelos_EntityCnt,
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
    let modelos_biomes = await dbService.findMany(Modelos_Biomes,filter, { id:1 });
    if (modelos_biomes.length){
      modelos_biomes = modelos_biomes.map((obj) => obj.id);

      const Base_ChunkFilter = { '$or': [{ biome : { '$in' : modelos_biomes } }] };
      const Base_ChunkCnt = await dbService.updateMany(Base_Chunk,Base_ChunkFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ biome : { '$in' : modelos_biomes } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_Biomes,filter,updateBody);

      let response = {
        Base_Chunk :Base_ChunkCnt,
        Universe_Chunk :Universe_ChunkCnt,
      };
      return response;
    } else {
      return {  modelos_biomes : 0 };
    }
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

const softDeleteModelos_Part = async (filter,updateBody) =>{  
  try {
    const Modelos_PartCnt =  await dbService.updateMany(Modelos_Part,filter);
    return { Modelos_Part : Modelos_PartCnt };
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

const softDeleteBase_Modelos_File = async (filter,updateBody) =>{  
  try {
    let base_modelos_file = await dbService.findMany(Base_Modelos_File,filter, { id:1 });
    if (base_modelos_file.length){
      base_modelos_file = base_modelos_file.map((obj) => obj.id);

      const Modelos_PartFilter = { '$or': [{ texture : { '$in' : base_modelos_file } }] };
      const Modelos_PartCnt = await dbService.updateMany(Modelos_Part,Modelos_PartFilter,updateBody);
      let updated = await dbService.updateMany(Base_Modelos_File,filter,updateBody);

      let response = { Modelos_Part :Modelos_PartCnt, };
      return response;
    } else {
      return {  base_modelos_file : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBase_Modelos_Model = async (filter,updateBody) =>{  
  try {
    let base_modelos_model = await dbService.findMany(Base_Modelos_Model,filter, { id:1 });
    if (base_modelos_model.length){
      base_modelos_model = base_modelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { '$or': [{ model : { '$in' : base_modelos_model } }] };
      const Modelos_itemCnt = await dbService.updateMany(Modelos_item,Modelos_itemFilter,updateBody);
      let updated = await dbService.updateMany(Base_Modelos_Model,filter,updateBody);

      let response = { Modelos_item :Modelos_itemCnt, };
      return response;
    } else {
      return {  base_modelos_model : 0 };
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

      const Base_CubeFilter = { '$or': [{ universe : { '$in' : universe_settings } }] };
      const Base_CubeCnt = await dbService.updateMany(Base_Cube,Base_CubeFilter,updateBody);

      const Base_ChunkFilter = { '$or': [{ settings : { '$in' : universe_settings } }] };
      const Base_ChunkCnt = await dbService.updateMany(Base_Chunk,Base_ChunkFilter,updateBody);

      const Universe_EntityFilter = { '$or': [{ Universe : { '$in' : universe_settings } }] };
      const Universe_EntityCnt = await dbService.updateMany(Universe_Entity,Universe_EntityFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ settings : { '$in' : universe_settings } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);

      const Universe_cubeFilter = { '$or': [{ universe : { '$in' : universe_settings } }] };
      const Universe_cubeCnt = await dbService.updateMany(Universe_cube,Universe_cubeFilter,updateBody);
      let updated = await dbService.updateMany(Universe_Settings,filter,updateBody);

      let response = {
        Base_Cube :Base_CubeCnt,
        Base_Chunk :Base_ChunkCnt,
        Universe_Entity :Universe_EntityCnt,
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

      const Base_ChunkFilter = { '$or': [{ chat : { '$in' : chat_group } }] };
      const Base_ChunkCnt = await dbService.updateMany(Base_Chunk,Base_ChunkFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ chat : { '$in' : chat_group } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = {
        Base_Chunk :Base_ChunkCnt,
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

      const Base_CubeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Base_CubeCnt = await dbService.updateMany(Base_Cube,Base_CubeFilter,updateBody);

      const Base_ChunkFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ op : { '$in' : user } }] };
      const Base_ChunkCnt = await dbService.updateMany(Base_Chunk,Base_ChunkFilter,updateBody);

      const Modelos_chemistry_elementFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_chemistry_elementCnt = await dbService.updateMany(Modelos_chemistry_element,Modelos_chemistry_elementFilter,updateBody);

      const user_characterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const user_characterCnt = await dbService.updateMany(User_character,user_characterFilter,updateBody);

      const Modelos_chemistry_SubstancesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_chemistry_SubstancesCnt = await dbService.updateMany(Modelos_chemistry_Substances,Modelos_chemistry_SubstancesFilter,updateBody);

      const Modelos_chemistry_compoundsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_chemistry_compoundsCnt = await dbService.updateMany(Modelos_chemistry_compounds,Modelos_chemistry_compoundsFilter,updateBody);

      const user_sectionFilter = { '$or': [{ user : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const user_sectionCnt = await dbService.updateMany(User_section,user_sectionFilter,updateBody);

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

      const Universe_StructureFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_StructureCnt = await dbService.updateMany(Universe_Structure,Universe_StructureFilter,updateBody);

      const Universe_ChunkFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ op : { '$in' : user } }] };
      const Universe_ChunkCnt = await dbService.updateMany(Universe_Chunk,Universe_ChunkFilter,updateBody);

      const Universe_cubeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Universe_cubeCnt = await dbService.updateMany(Universe_cube,Universe_cubeFilter,updateBody);

      const Modelos_BiomesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_BiomesCnt = await dbService.updateMany(Modelos_Biomes,Modelos_BiomesFilter,updateBody);

      const Modelos_RuleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_RuleCnt = await dbService.updateMany(Modelos_Rule,Modelos_RuleFilter,updateBody);

      const Modelos_TagFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_TagCnt = await dbService.updateMany(Modelos_Tag,Modelos_TagFilter,updateBody);

      const Modelos_PartFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_PartCnt = await dbService.updateMany(Modelos_Part,Modelos_PartFilter,updateBody);

      const Modelos_TextureMapFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_TextureMapCnt = await dbService.updateMany(Modelos_TextureMap,Modelos_TextureMapFilter,updateBody);

      const Modelos_itemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_itemCnt = await dbService.updateMany(Modelos_item,Modelos_itemFilter,updateBody);

      const Base_Modelos_FileFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Base_Modelos_FileCnt = await dbService.updateMany(Base_Modelos_File,Base_Modelos_FileFilter,updateBody);

      const Base_Modelos_ModelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Base_Modelos_ModelCnt = await dbService.updateMany(Base_Modelos_Model,Base_Modelos_ModelFilter,updateBody);

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
        Base_Cube :Base_CubeCnt,
        Base_Chunk :Base_ChunkCnt,
        Modelos_chemistry_element :Modelos_chemistry_elementCnt,
        user_character :user_characterCnt,
        Modelos_chemistry_Substances :Modelos_chemistry_SubstancesCnt,
        Modelos_chemistry_compounds :Modelos_chemistry_compoundsCnt,
        user_section :user_sectionCnt,
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
        Universe_Structure :Universe_StructureCnt,
        Universe_Chunk :Universe_ChunkCnt,
        Universe_cube :Universe_cubeCnt,
        Modelos_Biomes :Modelos_BiomesCnt,
        Modelos_Rule :Modelos_RuleCnt,
        Modelos_Tag :Modelos_TagCnt,
        Modelos_Part :Modelos_PartCnt,
        Modelos_TextureMap :Modelos_TextureMapCnt,
        Modelos_item :Modelos_itemCnt,
        Base_Modelos_File :Base_Modelos_FileCnt,
        Base_Modelos_Model :Base_Modelos_ModelCnt,
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
  deleteUniverse_Age,
  deleteModelos_Age,
  deleteBase_Cube,
  deleteBase_Chunk,
  deleteModelos_chemistry_element,
  deleteUser_character,
  deleteModelos_chemistry_Substances,
  deleteModelos_chemistry_compounds,
  deleteUser_section,
  deleteModelos_Size,
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
  deleteUniverse_Structure,
  deleteUniverse_Chunk,
  deleteUniverse_cube,
  deleteModelos_Biomes,
  deleteModelos_Rule,
  deleteModelos_Tag,
  deleteModelos_Part,
  deleteModelos_TextureMap,
  deleteModelos_item,
  deleteBase_Modelos_File,
  deleteBase_Modelos_Model,
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
  countUniverse_Age,
  countModelos_Age,
  countBase_Cube,
  countBase_Chunk,
  countModelos_chemistry_element,
  countUser_character,
  countModelos_chemistry_Substances,
  countModelos_chemistry_compounds,
  countUser_section,
  countModelos_Size,
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
  countUniverse_Structure,
  countUniverse_Chunk,
  countUniverse_cube,
  countModelos_Biomes,
  countModelos_Rule,
  countModelos_Tag,
  countModelos_Part,
  countModelos_TextureMap,
  countModelos_item,
  countBase_Modelos_File,
  countBase_Modelos_Model,
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
  softDeleteUniverse_Age,
  softDeleteModelos_Age,
  softDeleteBase_Cube,
  softDeleteBase_Chunk,
  softDeleteModelos_chemistry_element,
  softDeleteUser_character,
  softDeleteModelos_chemistry_Substances,
  softDeleteModelos_chemistry_compounds,
  softDeleteUser_section,
  softDeleteModelos_Size,
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
  softDeleteUniverse_Structure,
  softDeleteUniverse_Chunk,
  softDeleteUniverse_cube,
  softDeleteModelos_Biomes,
  softDeleteModelos_Rule,
  softDeleteModelos_Tag,
  softDeleteModelos_Part,
  softDeleteModelos_TextureMap,
  softDeleteModelos_item,
  softDeleteBase_Modelos_File,
  softDeleteBase_Modelos_Model,
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
