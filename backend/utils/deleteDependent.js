/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Friendship = require('../model/friendship');
let Lobby = require('../model/lobby');
let Model = require('../model/Model');
let Item = require('../model/Item');
let Room = require('../model/Room');
let Roomtemplate = require('../model/roomtemplate');
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

const deleteFriendship = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Friendship,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteLobby = async (filter) =>{
  try {
    let lobby = await dbService.findMany(Lobby,filter);
    if (lobby && lobby.length){
      lobby = lobby.map((obj) => obj.id);

      const userFilter = { $or: [{ mainlobby : { $in : lobby } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      let deleted  = await dbService.deleteMany(Lobby,filter);
      let response = { user :userCnt, };
      return response; 
    } else {
      return {  lobby : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModel = async (filter) =>{
  try {
    let model = await dbService.findMany(Model,filter);
    if (model && model.length){
      model = model.map((obj) => obj.id);

      const ItemFilter = { $or: [{ Model : { $in : model } }] };
      const ItemCnt = await dbService.deleteMany(Item,ItemFilter);

      let deleted  = await dbService.deleteMany(Model,filter);
      let response = { Item :ItemCnt, };
      return response; 
    } else {
      return {  model : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItem = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Item,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRoom = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Room,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRoomtemplate = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Roomtemplate,filter);
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

      const lobbyFilter = { $or: [{ chat : { $in : chat_group } }] };
      const lobbyCnt = await dbService.deleteMany(Lobby,lobbyFilter);

      const RoomFilter = { $or: [{ chat : { $in : chat_group } }] };
      const RoomCnt = await dbService.deleteMany(Room,RoomFilter);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = {
        lobby :lobbyCnt,
        Room :RoomCnt,
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

      const friendshipFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const friendshipCnt = await dbService.deleteMany(Friendship,friendshipFilter);

      const lobbyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const lobbyCnt = await dbService.deleteMany(Lobby,lobbyFilter);

      const ModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ModelCnt = await dbService.deleteMany(Model,ModelFilter);

      const ItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ItemCnt = await dbService.deleteMany(Item,ItemFilter);

      const RoomFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const RoomCnt = await dbService.deleteMany(Room,RoomFilter);

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
        friendship :friendshipCnt,
        lobby :lobbyCnt,
        Model :ModelCnt,
        Item :ItemCnt,
        Room :RoomCnt,
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

const countFriendship = async (filter) =>{
  try {
    const friendshipCnt =  await dbService.count(Friendship,filter);
    return { friendship : friendshipCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countLobby = async (filter) =>{
  try {
    let lobby = await dbService.findMany(Lobby,filter);
    if (lobby && lobby.length){
      lobby = lobby.map((obj) => obj.id);

      const userFilter = { $or: [{ mainlobby : { $in : lobby } }] };
      const userCnt =  await dbService.count(User,userFilter);

      let response = { user : userCnt, };
      return response; 
    } else {
      return {  lobby : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countModel = async (filter) =>{
  try {
    let model = await dbService.findMany(Model,filter);
    if (model && model.length){
      model = model.map((obj) => obj.id);

      const ItemFilter = { $or: [{ Model : { $in : model } }] };
      const ItemCnt =  await dbService.count(Item,ItemFilter);

      let response = { Item : ItemCnt, };
      return response; 
    } else {
      return {  model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countItem = async (filter) =>{
  try {
    const ItemCnt =  await dbService.count(Item,filter);
    return { Item : ItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRoom = async (filter) =>{
  try {
    const RoomCnt =  await dbService.count(Room,filter);
    return { Room : RoomCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRoomtemplate = async (filter) =>{
  try {
    const roomtemplateCnt =  await dbService.count(Roomtemplate,filter);
    return { roomtemplate : roomtemplateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const lobbyFilter = { $or: [{ chat : { $in : chat_group } }] };
      const lobbyCnt =  await dbService.count(Lobby,lobbyFilter);

      const RoomFilter = { $or: [{ chat : { $in : chat_group } }] };
      const RoomCnt =  await dbService.count(Room,RoomFilter);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = {
        lobby : lobbyCnt,
        Room : RoomCnt,
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

      const friendshipFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const friendshipCnt =  await dbService.count(Friendship,friendshipFilter);

      const lobbyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const lobbyCnt =  await dbService.count(Lobby,lobbyFilter);

      const ModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ModelCnt =  await dbService.count(Model,ModelFilter);

      const ItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ItemCnt =  await dbService.count(Item,ItemFilter);

      const RoomFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const RoomCnt =  await dbService.count(Room,RoomFilter);

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
        friendship : friendshipCnt,
        lobby : lobbyCnt,
        Model : ModelCnt,
        Item : ItemCnt,
        Room : RoomCnt,
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

const softDeleteFriendship = async (filter,updateBody) =>{  
  try {
    const friendshipCnt =  await dbService.updateMany(Friendship,filter);
    return { friendship : friendshipCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteLobby = async (filter,updateBody) =>{  
  try {
    let lobby = await dbService.findMany(Lobby,filter, { id:1 });
    if (lobby.length){
      lobby = lobby.map((obj) => obj.id);

      const userFilter = { '$or': [{ mainlobby : { '$in' : lobby } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);
      let updated = await dbService.updateMany(Lobby,filter,updateBody);

      let response = { user :userCnt, };
      return response;
    } else {
      return {  lobby : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModel = async (filter,updateBody) =>{  
  try {
    let model = await dbService.findMany(Model,filter, { id:1 });
    if (model.length){
      model = model.map((obj) => obj.id);

      const ItemFilter = { '$or': [{ Model : { '$in' : model } }] };
      const ItemCnt = await dbService.updateMany(Item,ItemFilter,updateBody);
      let updated = await dbService.updateMany(Model,filter,updateBody);

      let response = { Item :ItemCnt, };
      return response;
    } else {
      return {  model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItem = async (filter,updateBody) =>{  
  try {
    const ItemCnt =  await dbService.updateMany(Item,filter);
    return { Item : ItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRoom = async (filter,updateBody) =>{  
  try {
    const RoomCnt =  await dbService.updateMany(Room,filter);
    return { Room : RoomCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRoomtemplate = async (filter,updateBody) =>{  
  try {
    const roomtemplateCnt =  await dbService.updateMany(Roomtemplate,filter);
    return { roomtemplate : roomtemplateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const lobbyFilter = { '$or': [{ chat : { '$in' : chat_group } }] };
      const lobbyCnt = await dbService.updateMany(Lobby,lobbyFilter,updateBody);

      const RoomFilter = { '$or': [{ chat : { '$in' : chat_group } }] };
      const RoomCnt = await dbService.updateMany(Room,RoomFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = {
        lobby :lobbyCnt,
        Room :RoomCnt,
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

      const friendshipFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const friendshipCnt = await dbService.updateMany(Friendship,friendshipFilter,updateBody);

      const lobbyFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const lobbyCnt = await dbService.updateMany(Lobby,lobbyFilter,updateBody);

      const ModelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ModelCnt = await dbService.updateMany(Model,ModelFilter,updateBody);

      const ItemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ItemCnt = await dbService.updateMany(Item,ItemFilter,updateBody);

      const RoomFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const RoomCnt = await dbService.updateMany(Room,RoomFilter,updateBody);

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
        friendship :friendshipCnt,
        lobby :lobbyCnt,
        Model :ModelCnt,
        Item :ItemCnt,
        Room :RoomCnt,
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
  deleteFriendship,
  deleteLobby,
  deleteModel,
  deleteItem,
  deleteRoom,
  deleteRoomtemplate,
  deleteChat_group,
  deleteChat_message,
  deleteUser,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countFriendship,
  countLobby,
  countModel,
  countItem,
  countRoom,
  countRoomtemplate,
  countChat_group,
  countChat_message,
  countUser,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteFriendship,
  softDeleteLobby,
  softDeleteModel,
  softDeleteItem,
  softDeleteRoom,
  softDeleteRoomtemplate,
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
