/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Chat_group = require('../model/Chat_group');
let Chat_message = require('../model/Chat_message');
let Item = require('../model/item');
let Model = require('../model/model');
let Material = require('../model/material');
let Blockstate = require('../model/blockstate');
let Planet = require('../model/planet');
let Cluster = require('../model/cluster');
let Chunk = require('../model/chunk');
let Universe = require('../model/universe');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let ActivityLog = require('../model/activityLog');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const chunkFilter = { $or: [{ chat : { $in : chat_group } }] };
      const chunkCnt = await dbService.deleteMany(Chunk,chunkFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = {
        Chat_message :Chat_messageCnt,
        chunk :chunkCnt,
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

const deleteItem = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Item,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModel = async (filter) =>{
  try {
    let model = await dbService.findMany(Model,filter);
    if (model && model.length){
      model = model.map((obj) => obj.id);

      const blockstateFilter = { $or: [{ model : { $in : model } }] };
      const blockstateCnt = await dbService.deleteMany(Blockstate,blockstateFilter);

      let deleted  = await dbService.deleteMany(Model,filter);
      let response = { blockstate :blockstateCnt, };
      return response; 
    } else {
      return {  model : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMaterial = async (filter) =>{
  try {
    let material = await dbService.findMany(Material,filter);
    if (material && material.length){
      material = material.map((obj) => obj.id);

      const blockstateFilter = { $or: [{ material : { $in : material } }] };
      const blockstateCnt = await dbService.deleteMany(Blockstate,blockstateFilter);

      let deleted  = await dbService.deleteMany(Material,filter);
      let response = { blockstate :blockstateCnt, };
      return response; 
    } else {
      return {  material : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlockstate = async (filter) =>{
  try {
    let blockstate = await dbService.findMany(Blockstate,filter);
    if (blockstate && blockstate.length){
      blockstate = blockstate.map((obj) => obj.id);

      const itemFilter = { $or: [{ blockstate : { $in : blockstate } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      let deleted  = await dbService.deleteMany(Blockstate,filter);
      let response = { item :itemCnt, };
      return response; 
    } else {
      return {  blockstate : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deletePlanet = async (filter) =>{
  try {
    let planet = await dbService.findMany(Planet,filter);
    if (planet && planet.length){
      planet = planet.map((obj) => obj.id);

      const clusterFilter = { $or: [{ planet : { $in : planet } }] };
      const clusterCnt = await dbService.deleteMany(Cluster,clusterFilter);

      let deleted  = await dbService.deleteMany(Planet,filter);
      let response = { cluster :clusterCnt, };
      return response; 
    } else {
      return {  planet : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCluster = async (filter) =>{
  try {
    let cluster = await dbService.findMany(Cluster,filter);
    if (cluster && cluster.length){
      cluster = cluster.map((obj) => obj.id);

      const chunkFilter = { $or: [{ cluster : { $in : cluster } }] };
      const chunkCnt = await dbService.deleteMany(Chunk,chunkFilter);

      let deleted  = await dbService.deleteMany(Cluster,filter);
      let response = { chunk :chunkCnt, };
      return response; 
    } else {
      return {  cluster : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChunk = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chunk,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse = async (filter) =>{
  try {
    let universe = await dbService.findMany(Universe,filter);
    if (universe && universe.length){
      universe = universe.map((obj) => obj.id);

      const planetFilter = { $or: [{ universe : { $in : universe } }] };
      const planetCnt = await dbService.deleteMany(Planet,planetFilter);

      let deleted  = await dbService.deleteMany(Universe,filter);
      let response = { planet :planetCnt, };
      return response; 
    } else {
      return {  universe : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      const modelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const modelCnt = await dbService.deleteMany(Model,modelFilter);

      const materialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const materialCnt = await dbService.deleteMany(Material,materialFilter);

      const blockstateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const blockstateCnt = await dbService.deleteMany(Blockstate,blockstateFilter);

      const planetFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const planetCnt = await dbService.deleteMany(Planet,planetFilter);

      const clusterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const clusterCnt = await dbService.deleteMany(Cluster,clusterFilter);

      const chunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const chunkCnt = await dbService.deleteMany(Chunk,chunkFilter);

      const universeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const universeCnt = await dbService.deleteMany(Universe,universeFilter);

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
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        item :itemCnt,
        model :modelCnt,
        material :materialCnt,
        blockstate :blockstateCnt,
        planet :planetCnt,
        cluster :clusterCnt,
        chunk :chunkCnt,
        universe :universeCnt,
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

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const chunkFilter = { $or: [{ chat : { $in : chat_group } }] };
      const chunkCnt =  await dbService.count(Chunk,chunkFilter);

      let response = {
        Chat_message : Chat_messageCnt,
        chunk : chunkCnt,
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

const countItem = async (filter) =>{
  try {
    const itemCnt =  await dbService.count(Item,filter);
    return { item : itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModel = async (filter) =>{
  try {
    let model = await dbService.findMany(Model,filter);
    if (model && model.length){
      model = model.map((obj) => obj.id);

      const blockstateFilter = { $or: [{ model : { $in : model } }] };
      const blockstateCnt =  await dbService.count(Blockstate,blockstateFilter);

      let response = { blockstate : blockstateCnt, };
      return response; 
    } else {
      return {  model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countMaterial = async (filter) =>{
  try {
    let material = await dbService.findMany(Material,filter);
    if (material && material.length){
      material = material.map((obj) => obj.id);

      const blockstateFilter = { $or: [{ material : { $in : material } }] };
      const blockstateCnt =  await dbService.count(Blockstate,blockstateFilter);

      let response = { blockstate : blockstateCnt, };
      return response; 
    } else {
      return {  material : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlockstate = async (filter) =>{
  try {
    let blockstate = await dbService.findMany(Blockstate,filter);
    if (blockstate && blockstate.length){
      blockstate = blockstate.map((obj) => obj.id);

      const itemFilter = { $or: [{ blockstate : { $in : blockstate } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      let response = { item : itemCnt, };
      return response; 
    } else {
      return {  blockstate : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlanet = async (filter) =>{
  try {
    let planet = await dbService.findMany(Planet,filter);
    if (planet && planet.length){
      planet = planet.map((obj) => obj.id);

      const clusterFilter = { $or: [{ planet : { $in : planet } }] };
      const clusterCnt =  await dbService.count(Cluster,clusterFilter);

      let response = { cluster : clusterCnt, };
      return response; 
    } else {
      return {  planet : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCluster = async (filter) =>{
  try {
    let cluster = await dbService.findMany(Cluster,filter);
    if (cluster && cluster.length){
      cluster = cluster.map((obj) => obj.id);

      const chunkFilter = { $or: [{ cluster : { $in : cluster } }] };
      const chunkCnt =  await dbService.count(Chunk,chunkFilter);

      let response = { chunk : chunkCnt, };
      return response; 
    } else {
      return {  cluster : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChunk = async (filter) =>{
  try {
    const chunkCnt =  await dbService.count(Chunk,filter);
    return { chunk : chunkCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse = async (filter) =>{
  try {
    let universe = await dbService.findMany(Universe,filter);
    if (universe && universe.length){
      universe = universe.map((obj) => obj.id);

      const planetFilter = { $or: [{ universe : { $in : universe } }] };
      const planetCnt =  await dbService.count(Planet,planetFilter);

      let response = { planet : planetCnt, };
      return response; 
    } else {
      return {  universe : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      const modelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const modelCnt =  await dbService.count(Model,modelFilter);

      const materialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const materialCnt =  await dbService.count(Material,materialFilter);

      const blockstateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const blockstateCnt =  await dbService.count(Blockstate,blockstateFilter);

      const planetFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const planetCnt =  await dbService.count(Planet,planetFilter);

      const clusterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const clusterCnt =  await dbService.count(Cluster,clusterFilter);

      const chunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const chunkCnt =  await dbService.count(Chunk,chunkFilter);

      const universeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const universeCnt =  await dbService.count(Universe,universeFilter);

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
        Chat_group : Chat_groupCnt,
        Chat_message : Chat_messageCnt,
        item : itemCnt,
        model : modelCnt,
        material : materialCnt,
        blockstate : blockstateCnt,
        planet : planetCnt,
        cluster : clusterCnt,
        chunk : chunkCnt,
        universe : universeCnt,
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

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const chunkFilter = { '$or': [{ chat : { '$in' : chat_group } }] };
      const chunkCnt = await dbService.updateMany(Chunk,chunkFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = {
        Chat_message :Chat_messageCnt,
        chunk :chunkCnt,
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

const softDeleteItem = async (filter,updateBody) =>{  
  try {
    const itemCnt =  await dbService.updateMany(Item,filter);
    return { item : itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModel = async (filter,updateBody) =>{  
  try {
    let model = await dbService.findMany(Model,filter, { id:1 });
    if (model.length){
      model = model.map((obj) => obj.id);

      const blockstateFilter = { '$or': [{ model : { '$in' : model } }] };
      const blockstateCnt = await dbService.updateMany(Blockstate,blockstateFilter,updateBody);
      let updated = await dbService.updateMany(Model,filter,updateBody);

      let response = { blockstate :blockstateCnt, };
      return response;
    } else {
      return {  model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMaterial = async (filter,updateBody) =>{  
  try {
    let material = await dbService.findMany(Material,filter, { id:1 });
    if (material.length){
      material = material.map((obj) => obj.id);

      const blockstateFilter = { '$or': [{ material : { '$in' : material } }] };
      const blockstateCnt = await dbService.updateMany(Blockstate,blockstateFilter,updateBody);
      let updated = await dbService.updateMany(Material,filter,updateBody);

      let response = { blockstate :blockstateCnt, };
      return response;
    } else {
      return {  material : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlockstate = async (filter,updateBody) =>{  
  try {
    let blockstate = await dbService.findMany(Blockstate,filter, { id:1 });
    if (blockstate.length){
      blockstate = blockstate.map((obj) => obj.id);

      const itemFilter = { '$or': [{ blockstate : { '$in' : blockstate } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);
      let updated = await dbService.updateMany(Blockstate,filter,updateBody);

      let response = { item :itemCnt, };
      return response;
    } else {
      return {  blockstate : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlanet = async (filter,updateBody) =>{  
  try {
    let planet = await dbService.findMany(Planet,filter, { id:1 });
    if (planet.length){
      planet = planet.map((obj) => obj.id);

      const clusterFilter = { '$or': [{ planet : { '$in' : planet } }] };
      const clusterCnt = await dbService.updateMany(Cluster,clusterFilter,updateBody);
      let updated = await dbService.updateMany(Planet,filter,updateBody);

      let response = { cluster :clusterCnt, };
      return response;
    } else {
      return {  planet : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCluster = async (filter,updateBody) =>{  
  try {
    let cluster = await dbService.findMany(Cluster,filter, { id:1 });
    if (cluster.length){
      cluster = cluster.map((obj) => obj.id);

      const chunkFilter = { '$or': [{ cluster : { '$in' : cluster } }] };
      const chunkCnt = await dbService.updateMany(Chunk,chunkFilter,updateBody);
      let updated = await dbService.updateMany(Cluster,filter,updateBody);

      let response = { chunk :chunkCnt, };
      return response;
    } else {
      return {  cluster : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChunk = async (filter,updateBody) =>{  
  try {
    const chunkCnt =  await dbService.updateMany(Chunk,filter);
    return { chunk : chunkCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse = async (filter,updateBody) =>{  
  try {
    let universe = await dbService.findMany(Universe,filter, { id:1 });
    if (universe.length){
      universe = universe.map((obj) => obj.id);

      const planetFilter = { '$or': [{ universe : { '$in' : universe } }] };
      const planetCnt = await dbService.updateMany(Planet,planetFilter,updateBody);
      let updated = await dbService.updateMany(Universe,filter,updateBody);

      let response = { planet :planetCnt, };
      return response;
    } else {
      return {  universe : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const itemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);

      const modelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const modelCnt = await dbService.updateMany(Model,modelFilter,updateBody);

      const materialFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const materialCnt = await dbService.updateMany(Material,materialFilter,updateBody);

      const blockstateFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const blockstateCnt = await dbService.updateMany(Blockstate,blockstateFilter,updateBody);

      const planetFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const planetCnt = await dbService.updateMany(Planet,planetFilter,updateBody);

      const clusterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const clusterCnt = await dbService.updateMany(Cluster,clusterFilter,updateBody);

      const chunkFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const chunkCnt = await dbService.updateMany(Chunk,chunkFilter,updateBody);

      const universeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const universeCnt = await dbService.updateMany(Universe,universeFilter,updateBody);

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
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        item :itemCnt,
        model :modelCnt,
        material :materialCnt,
        blockstate :blockstateCnt,
        planet :planetCnt,
        cluster :clusterCnt,
        chunk :chunkCnt,
        universe :universeCnt,
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
  deleteChat_group,
  deleteChat_message,
  deleteItem,
  deleteModel,
  deleteMaterial,
  deleteBlockstate,
  deletePlanet,
  deleteCluster,
  deleteChunk,
  deleteUniverse,
  deleteUser,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countChat_group,
  countChat_message,
  countItem,
  countModel,
  countMaterial,
  countBlockstate,
  countPlanet,
  countCluster,
  countChunk,
  countUniverse,
  countUser,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteChat_group,
  softDeleteChat_message,
  softDeleteItem,
  softDeleteModel,
  softDeleteMaterial,
  softDeleteBlockstate,
  softDeletePlanet,
  softDeleteCluster,
  softDeleteChunk,
  softDeleteUniverse,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteActivityLog,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
