/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Wallpaper = require('../model/wallpaper');
let HumanAperance = require('../model/humanAperance');
let Size = require('../model/size');
let Pattern = require('../model/Pattern');
let ItemModel = require('../model/ItemModel');
let Universe = require('../model/Universe');
let WorldData = require('../model/WorldData');
let Chat_message = require('../model/Chat_message');
let Chat_group = require('../model/Chat_group');
let Event = require('../model/Event');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteWallpaper = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Wallpaper,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteHumanAperance = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(HumanAperance,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSize = async (filter) =>{
  try {
    let size = await dbService.findMany(Size,filter);
    if (size && size.length){
      size = size.map((obj) => obj.id);

      const PatternFilter = { $or: [{ sizeMax : { $in : size } }] };
      const PatternCnt = await dbService.deleteMany(Pattern,PatternFilter);

      const ItemModelFilter = { $or: [{ sizeMax : { $in : size } }] };
      const ItemModelCnt = await dbService.deleteMany(ItemModel,ItemModelFilter);

      const UniverseFilter = { $or: [{ sizeMax : { $in : size } }] };
      const UniverseCnt = await dbService.deleteMany(Universe,UniverseFilter);

      const WorldDataFilter = { $or: [{ sizeMax : { $in : size } }] };
      const WorldDataCnt = await dbService.deleteMany(WorldData,WorldDataFilter);

      let deleted  = await dbService.deleteMany(Size,filter);
      let response = {
        Pattern :PatternCnt,
        ItemModel :ItemModelCnt,
        Universe :UniverseCnt,
        WorldData :WorldDataCnt,
      };
      return response; 
    } else {
      return {  size : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deletePattern = async (filter) =>{
  try {
    let pattern = await dbService.findMany(Pattern,filter);
    if (pattern && pattern.length){
      pattern = pattern.map((obj) => obj.id);

      const sizeFilter = { $or: [{ Pattern : { $in : pattern } }] };
      const sizeCnt = await dbService.deleteMany(Size,sizeFilter);

      const ItemModelFilter = { $or: [{ Pattern : { $in : pattern } }] };
      const ItemModelCnt = await dbService.deleteMany(ItemModel,ItemModelFilter);

      const UniverseFilter = { $or: [{ pattern : { $in : pattern } }] };
      const UniverseCnt = await dbService.deleteMany(Universe,UniverseFilter);

      const WorldDataFilter = { $or: [{ pattern : { $in : pattern } }] };
      const WorldDataCnt = await dbService.deleteMany(WorldData,WorldDataFilter);

      let deleted  = await dbService.deleteMany(Pattern,filter);
      let response = {
        size :sizeCnt,
        ItemModel :ItemModelCnt,
        Universe :UniverseCnt,
        WorldData :WorldDataCnt,
      };
      return response; 
    } else {
      return {  pattern : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItemModel = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ItemModel,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteWorldData = async (filter) =>{
  try {
    let worlddata = await dbService.findMany(WorldData,filter);
    if (worlddata && worlddata.length){
      worlddata = worlddata.map((obj) => obj.id);

      const UniverseFilter = { $or: [{ innerDim : { $in : worlddata } }] };
      const UniverseCnt = await dbService.deleteMany(Universe,UniverseFilter);

      const Chat_groupFilter = { $or: [{ location : { $in : worlddata } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const userFilter = { $or: [{ location : { $in : worlddata } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      let deleted  = await dbService.deleteMany(WorldData,filter);
      let response = {
        Universe :UniverseCnt,
        Chat_group :Chat_groupCnt,
        user :userCnt,
      };
      return response; 
    } else {
      return {  worlddata : 0 };
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

const deleteEvent = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Event,filter);
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

      const wallpaperFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const wallpaperCnt = await dbService.deleteMany(Wallpaper,wallpaperFilter);

      const humanAperanceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const humanAperanceCnt = await dbService.deleteMany(HumanAperance,humanAperanceFilter);

      const sizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const sizeCnt = await dbService.deleteMany(Size,sizeFilter);

      const PatternFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PatternCnt = await dbService.deleteMany(Pattern,PatternFilter);

      const ItemModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ItemModelCnt = await dbService.deleteMany(ItemModel,ItemModelFilter);

      const UniverseFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const UniverseCnt = await dbService.deleteMany(Universe,UniverseFilter);

      const WorldDataFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const WorldDataCnt = await dbService.deleteMany(WorldData,WorldDataFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const EventFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const EventCnt = await dbService.deleteMany(Event,EventFilter);

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
        wallpaper :wallpaperCnt,
        humanAperance :humanAperanceCnt,
        size :sizeCnt,
        Pattern :PatternCnt,
        ItemModel :ItemModelCnt,
        Universe :UniverseCnt,
        WorldData :WorldDataCnt,
        Chat_message :Chat_messageCnt,
        Chat_group :Chat_groupCnt,
        Event :EventCnt,
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

const countWallpaper = async (filter) =>{
  try {
    const wallpaperCnt =  await dbService.count(Wallpaper,filter);
    return { wallpaper : wallpaperCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countHumanAperance = async (filter) =>{
  try {
    const humanAperanceCnt =  await dbService.count(HumanAperance,filter);
    return { humanAperance : humanAperanceCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSize = async (filter) =>{
  try {
    let size = await dbService.findMany(Size,filter);
    if (size && size.length){
      size = size.map((obj) => obj.id);

      const PatternFilter = { $or: [{ sizeMax : { $in : size } }] };
      const PatternCnt =  await dbService.count(Pattern,PatternFilter);

      const ItemModelFilter = { $or: [{ sizeMax : { $in : size } }] };
      const ItemModelCnt =  await dbService.count(ItemModel,ItemModelFilter);

      const UniverseFilter = { $or: [{ sizeMax : { $in : size } }] };
      const UniverseCnt =  await dbService.count(Universe,UniverseFilter);

      const WorldDataFilter = { $or: [{ sizeMax : { $in : size } }] };
      const WorldDataCnt =  await dbService.count(WorldData,WorldDataFilter);

      let response = {
        Pattern : PatternCnt,
        ItemModel : ItemModelCnt,
        Universe : UniverseCnt,
        WorldData : WorldDataCnt,
      };
      return response; 
    } else {
      return {  size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPattern = async (filter) =>{
  try {
    let pattern = await dbService.findMany(Pattern,filter);
    if (pattern && pattern.length){
      pattern = pattern.map((obj) => obj.id);

      const sizeFilter = { $or: [{ Pattern : { $in : pattern } }] };
      const sizeCnt =  await dbService.count(Size,sizeFilter);

      const ItemModelFilter = { $or: [{ Pattern : { $in : pattern } }] };
      const ItemModelCnt =  await dbService.count(ItemModel,ItemModelFilter);

      const UniverseFilter = { $or: [{ pattern : { $in : pattern } }] };
      const UniverseCnt =  await dbService.count(Universe,UniverseFilter);

      const WorldDataFilter = { $or: [{ pattern : { $in : pattern } }] };
      const WorldDataCnt =  await dbService.count(WorldData,WorldDataFilter);

      let response = {
        size : sizeCnt,
        ItemModel : ItemModelCnt,
        Universe : UniverseCnt,
        WorldData : WorldDataCnt,
      };
      return response; 
    } else {
      return {  pattern : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countItemModel = async (filter) =>{
  try {
    const ItemModelCnt =  await dbService.count(ItemModel,filter);
    return { ItemModel : ItemModelCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse = async (filter) =>{
  try {
    const UniverseCnt =  await dbService.count(Universe,filter);
    return { Universe : UniverseCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countWorldData = async (filter) =>{
  try {
    let worlddata = await dbService.findMany(WorldData,filter);
    if (worlddata && worlddata.length){
      worlddata = worlddata.map((obj) => obj.id);

      const UniverseFilter = { $or: [{ innerDim : { $in : worlddata } }] };
      const UniverseCnt =  await dbService.count(Universe,UniverseFilter);

      const Chat_groupFilter = { $or: [{ location : { $in : worlddata } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const userFilter = { $or: [{ location : { $in : worlddata } }] };
      const userCnt =  await dbService.count(User,userFilter);

      let response = {
        Universe : UniverseCnt,
        Chat_group : Chat_groupCnt,
        user : userCnt,
      };
      return response; 
    } else {
      return {  worlddata : 0 };
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

const countEvent = async (filter) =>{
  try {
    const EventCnt =  await dbService.count(Event,filter);
    return { Event : EventCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const wallpaperFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const wallpaperCnt =  await dbService.count(Wallpaper,wallpaperFilter);

      const humanAperanceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const humanAperanceCnt =  await dbService.count(HumanAperance,humanAperanceFilter);

      const sizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const sizeCnt =  await dbService.count(Size,sizeFilter);

      const PatternFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PatternCnt =  await dbService.count(Pattern,PatternFilter);

      const ItemModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ItemModelCnt =  await dbService.count(ItemModel,ItemModelFilter);

      const UniverseFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const UniverseCnt =  await dbService.count(Universe,UniverseFilter);

      const WorldDataFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const WorldDataCnt =  await dbService.count(WorldData,WorldDataFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const EventFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const EventCnt =  await dbService.count(Event,EventFilter);

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
        wallpaper : wallpaperCnt,
        humanAperance : humanAperanceCnt,
        size : sizeCnt,
        Pattern : PatternCnt,
        ItemModel : ItemModelCnt,
        Universe : UniverseCnt,
        WorldData : WorldDataCnt,
        Chat_message : Chat_messageCnt,
        Chat_group : Chat_groupCnt,
        Event : EventCnt,
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

const softDeleteWallpaper = async (filter,updateBody) =>{  
  try {
    const wallpaperCnt =  await dbService.updateMany(Wallpaper,filter);
    return { wallpaper : wallpaperCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteHumanAperance = async (filter,updateBody) =>{  
  try {
    const humanAperanceCnt =  await dbService.updateMany(HumanAperance,filter);
    return { humanAperance : humanAperanceCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSize = async (filter,updateBody) =>{  
  try {
    let size = await dbService.findMany(Size,filter, { id:1 });
    if (size.length){
      size = size.map((obj) => obj.id);

      const PatternFilter = { '$or': [{ sizeMax : { '$in' : size } }] };
      const PatternCnt = await dbService.updateMany(Pattern,PatternFilter,updateBody);

      const ItemModelFilter = { '$or': [{ sizeMax : { '$in' : size } }] };
      const ItemModelCnt = await dbService.updateMany(ItemModel,ItemModelFilter,updateBody);

      const UniverseFilter = { '$or': [{ sizeMax : { '$in' : size } }] };
      const UniverseCnt = await dbService.updateMany(Universe,UniverseFilter,updateBody);

      const WorldDataFilter = { '$or': [{ sizeMax : { '$in' : size } }] };
      const WorldDataCnt = await dbService.updateMany(WorldData,WorldDataFilter,updateBody);
      let updated = await dbService.updateMany(Size,filter,updateBody);

      let response = {
        Pattern :PatternCnt,
        ItemModel :ItemModelCnt,
        Universe :UniverseCnt,
        WorldData :WorldDataCnt,
      };
      return response;
    } else {
      return {  size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePattern = async (filter,updateBody) =>{  
  try {
    let pattern = await dbService.findMany(Pattern,filter, { id:1 });
    if (pattern.length){
      pattern = pattern.map((obj) => obj.id);

      const sizeFilter = { '$or': [{ Pattern : { '$in' : pattern } }] };
      const sizeCnt = await dbService.updateMany(Size,sizeFilter,updateBody);

      const ItemModelFilter = { '$or': [{ Pattern : { '$in' : pattern } }] };
      const ItemModelCnt = await dbService.updateMany(ItemModel,ItemModelFilter,updateBody);

      const UniverseFilter = { '$or': [{ pattern : { '$in' : pattern } }] };
      const UniverseCnt = await dbService.updateMany(Universe,UniverseFilter,updateBody);

      const WorldDataFilter = { '$or': [{ pattern : { '$in' : pattern } }] };
      const WorldDataCnt = await dbService.updateMany(WorldData,WorldDataFilter,updateBody);
      let updated = await dbService.updateMany(Pattern,filter,updateBody);

      let response = {
        size :sizeCnt,
        ItemModel :ItemModelCnt,
        Universe :UniverseCnt,
        WorldData :WorldDataCnt,
      };
      return response;
    } else {
      return {  pattern : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItemModel = async (filter,updateBody) =>{  
  try {
    const ItemModelCnt =  await dbService.updateMany(ItemModel,filter);
    return { ItemModel : ItemModelCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse = async (filter,updateBody) =>{  
  try {
    const UniverseCnt =  await dbService.updateMany(Universe,filter);
    return { Universe : UniverseCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWorldData = async (filter,updateBody) =>{  
  try {
    let worlddata = await dbService.findMany(WorldData,filter, { id:1 });
    if (worlddata.length){
      worlddata = worlddata.map((obj) => obj.id);

      const UniverseFilter = { '$or': [{ innerDim : { '$in' : worlddata } }] };
      const UniverseCnt = await dbService.updateMany(Universe,UniverseFilter,updateBody);

      const Chat_groupFilter = { '$or': [{ location : { '$in' : worlddata } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const userFilter = { '$or': [{ location : { '$in' : worlddata } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);
      let updated = await dbService.updateMany(WorldData,filter,updateBody);

      let response = {
        Universe :UniverseCnt,
        Chat_group :Chat_groupCnt,
        user :userCnt,
      };
      return response;
    } else {
      return {  worlddata : 0 };
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

const softDeleteEvent = async (filter,updateBody) =>{  
  try {
    const EventCnt =  await dbService.updateMany(Event,filter);
    return { Event : EventCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const wallpaperFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const wallpaperCnt = await dbService.updateMany(Wallpaper,wallpaperFilter,updateBody);

      const humanAperanceFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const humanAperanceCnt = await dbService.updateMany(HumanAperance,humanAperanceFilter,updateBody);

      const sizeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const sizeCnt = await dbService.updateMany(Size,sizeFilter,updateBody);

      const PatternFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const PatternCnt = await dbService.updateMany(Pattern,PatternFilter,updateBody);

      const ItemModelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ItemModelCnt = await dbService.updateMany(ItemModel,ItemModelFilter,updateBody);

      const UniverseFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const UniverseCnt = await dbService.updateMany(Universe,UniverseFilter,updateBody);

      const WorldDataFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const WorldDataCnt = await dbService.updateMany(WorldData,WorldDataFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const EventFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const EventCnt = await dbService.updateMany(Event,EventFilter,updateBody);

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
        wallpaper :wallpaperCnt,
        humanAperance :humanAperanceCnt,
        size :sizeCnt,
        Pattern :PatternCnt,
        ItemModel :ItemModelCnt,
        Universe :UniverseCnt,
        WorldData :WorldDataCnt,
        Chat_message :Chat_messageCnt,
        Chat_group :Chat_groupCnt,
        Event :EventCnt,
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
  deleteWallpaper,
  deleteHumanAperance,
  deleteSize,
  deletePattern,
  deleteItemModel,
  deleteUniverse,
  deleteWorldData,
  deleteChat_message,
  deleteChat_group,
  deleteEvent,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countWallpaper,
  countHumanAperance,
  countSize,
  countPattern,
  countItemModel,
  countUniverse,
  countWorldData,
  countChat_message,
  countChat_group,
  countEvent,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteWallpaper,
  softDeleteHumanAperance,
  softDeleteSize,
  softDeletePattern,
  softDeleteItemModel,
  softDeleteUniverse,
  softDeleteWorldData,
  softDeleteChat_message,
  softDeleteChat_group,
  softDeleteEvent,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
