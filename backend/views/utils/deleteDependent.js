/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Modelos_TextureMap = require('../model/Modelos_TextureMap');
let Modelos_item = require('../model/Modelos_item');
let Modelos_Texture = require('../model/Modelos_Texture');
let Modelos_model = require('../model/Modelos_model');
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
    let response  = await dbService.deleteMany(Modelos_item,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_Texture = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Modelos_Texture,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModelos_model = async (filter) =>{
  try {
    let modelos_model = await dbService.findMany(Modelos_model,filter);
    if (modelos_model && modelos_model.length){
      modelos_model = modelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { $or: [{ model : { $in : modelos_model } }] };
      const Modelos_itemCnt = await dbService.deleteMany(Modelos_item,Modelos_itemFilter);

      let deleted  = await dbService.deleteMany(Modelos_model,filter);
      let response = { Modelos_item :Modelos_itemCnt, };
      return response; 
    } else {
      return {  modelos_model : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse_Settings = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe_Settings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = { Chat_message :Chat_messageCnt, };
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

      const Modelos_TextureMapFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TextureMapCnt = await dbService.deleteMany(Modelos_TextureMap,Modelos_TextureMapFilter);

      const Modelos_itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_itemCnt = await dbService.deleteMany(Modelos_item,Modelos_itemFilter);

      const Modelos_TextureFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TextureCnt = await dbService.deleteMany(Modelos_Texture,Modelos_TextureFilter);

      const Modelos_modelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_modelCnt = await dbService.deleteMany(Modelos_model,Modelos_modelFilter);

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
        Modelos_TextureMap :Modelos_TextureMapCnt,
        Modelos_item :Modelos_itemCnt,
        Modelos_Texture :Modelos_TextureCnt,
        Modelos_model :Modelos_modelCnt,
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
    const Modelos_itemCnt =  await dbService.count(Modelos_item,filter);
    return { Modelos_item : Modelos_itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_Texture = async (filter) =>{
  try {
    const Modelos_TextureCnt =  await dbService.count(Modelos_Texture,filter);
    return { Modelos_Texture : Modelos_TextureCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModelos_model = async (filter) =>{
  try {
    let modelos_model = await dbService.findMany(Modelos_model,filter);
    if (modelos_model && modelos_model.length){
      modelos_model = modelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { $or: [{ model : { $in : modelos_model } }] };
      const Modelos_itemCnt =  await dbService.count(Modelos_item,Modelos_itemFilter);

      let response = { Modelos_item : Modelos_itemCnt, };
      return response; 
    } else {
      return {  modelos_model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse_Settings = async (filter) =>{
  try {
    const Universe_SettingsCnt =  await dbService.count(Universe_Settings,filter);
    return { Universe_Settings : Universe_SettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
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

      const Modelos_TextureMapFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TextureMapCnt =  await dbService.count(Modelos_TextureMap,Modelos_TextureMapFilter);

      const Modelos_itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_itemCnt =  await dbService.count(Modelos_item,Modelos_itemFilter);

      const Modelos_TextureFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_TextureCnt =  await dbService.count(Modelos_Texture,Modelos_TextureFilter);

      const Modelos_modelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Modelos_modelCnt =  await dbService.count(Modelos_model,Modelos_modelFilter);

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
        Modelos_TextureMap : Modelos_TextureMapCnt,
        Modelos_item : Modelos_itemCnt,
        Modelos_Texture : Modelos_TextureCnt,
        Modelos_model : Modelos_modelCnt,
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
    const Modelos_itemCnt =  await dbService.updateMany(Modelos_item,filter);
    return { Modelos_item : Modelos_itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_Texture = async (filter,updateBody) =>{  
  try {
    const Modelos_TextureCnt =  await dbService.updateMany(Modelos_Texture,filter);
    return { Modelos_Texture : Modelos_TextureCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModelos_model = async (filter,updateBody) =>{  
  try {
    let modelos_model = await dbService.findMany(Modelos_model,filter, { id:1 });
    if (modelos_model.length){
      modelos_model = modelos_model.map((obj) => obj.id);

      const Modelos_itemFilter = { '$or': [{ model : { '$in' : modelos_model } }] };
      const Modelos_itemCnt = await dbService.updateMany(Modelos_item,Modelos_itemFilter,updateBody);
      let updated = await dbService.updateMany(Modelos_model,filter,updateBody);

      let response = { Modelos_item :Modelos_itemCnt, };
      return response;
    } else {
      return {  modelos_model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse_Settings = async (filter,updateBody) =>{  
  try {
    const Universe_SettingsCnt =  await dbService.updateMany(Universe_Settings,filter);
    return { Universe_Settings : Universe_SettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = { Chat_message :Chat_messageCnt, };
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

      const Modelos_TextureMapFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_TextureMapCnt = await dbService.updateMany(Modelos_TextureMap,Modelos_TextureMapFilter,updateBody);

      const Modelos_itemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_itemCnt = await dbService.updateMany(Modelos_item,Modelos_itemFilter,updateBody);

      const Modelos_TextureFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_TextureCnt = await dbService.updateMany(Modelos_Texture,Modelos_TextureFilter,updateBody);

      const Modelos_modelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Modelos_modelCnt = await dbService.updateMany(Modelos_model,Modelos_modelFilter,updateBody);

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
        Modelos_TextureMap :Modelos_TextureMapCnt,
        Modelos_item :Modelos_itemCnt,
        Modelos_Texture :Modelos_TextureCnt,
        Modelos_model :Modelos_modelCnt,
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
  deleteModelos_TextureMap,
  deleteModelos_item,
  deleteModelos_Texture,
  deleteModelos_model,
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
  countModelos_TextureMap,
  countModelos_item,
  countModelos_Texture,
  countModelos_model,
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
  softDeleteModelos_TextureMap,
  softDeleteModelos_item,
  softDeleteModelos_Texture,
  softDeleteModelos_model,
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