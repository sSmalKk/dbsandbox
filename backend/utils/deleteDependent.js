/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Voxel = require('../model/Voxel');
let Universe = require('../model/Universe');
let Tick = require('../model/Tick');
let Texture = require('../model/texture');
let Size = require('../model/Size');
let Part = require('../model/Part');
let Material = require('../model/Material');
let Itens = require('../model/Itens');
let Biome = require('../model/Biome');
let Action = require('../model/Action');
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

const deleteVoxel = async (filter) =>{
  try {
    let voxel = await dbService.findMany(Voxel,filter);
    if (voxel && voxel.length){
      voxel = voxel.map((obj) => obj.id);

      const VoxelFilter = { $or: [{ parent : { $in : voxel } }] };
      const VoxelCnt = await dbService.deleteMany(Voxel,VoxelFilter);

      const TickFilter = { $or: [{ voxel : { $in : voxel } }] };
      const TickCnt = await dbService.deleteMany(Tick,TickFilter);

      let deleted  = await dbService.deleteMany(Voxel,filter);
      let response = {
        Voxel :VoxelCnt,
        Tick :TickCnt,
      };
      return response; 
    } else {
      return {  voxel : 0 };
    }

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

const deleteTick = async (filter) =>{
  try {
    let tick = await dbService.findMany(Tick,filter);
    if (tick && tick.length){
      tick = tick.map((obj) => obj.id);

      const TickFilter = { $or: [{ tickmain : { $in : tick } }] };
      const TickCnt = await dbService.deleteMany(Tick,TickFilter);

      let deleted  = await dbService.deleteMany(Tick,filter);
      let response = { Tick :TickCnt, };
      return response; 
    } else {
      return {  tick : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTexture = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Texture,filter);
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

      const VoxelFilter = { $or: [{ size : { $in : size } }] };
      const VoxelCnt = await dbService.deleteMany(Voxel,VoxelFilter);

      let deleted  = await dbService.deleteMany(Size,filter);
      let response = { Voxel :VoxelCnt, };
      return response; 
    } else {
      return {  size : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deletePart = async (filter) =>{
  try {
    let part = await dbService.findMany(Part,filter);
    if (part && part.length){
      part = part.map((obj) => obj.id);

      const ItensFilter = { $or: [{ model : { $in : part } }] };
      const ItensCnt = await dbService.deleteMany(Itens,ItensFilter);

      let deleted  = await dbService.deleteMany(Part,filter);
      let response = { Itens :ItensCnt, };
      return response; 
    } else {
      return {  part : 0 };
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

      const ItensFilter = { $or: [{ material : { $in : material } }] };
      const ItensCnt = await dbService.deleteMany(Itens,ItensFilter);

      let deleted  = await dbService.deleteMany(Material,filter);
      let response = { Itens :ItensCnt, };
      return response; 
    } else {
      return {  material : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItens = async (filter) =>{
  try {
    let itens = await dbService.findMany(Itens,filter);
    if (itens && itens.length){
      itens = itens.map((obj) => obj.id);

      const VoxelFilter = { $or: [{ item : { $in : itens } }] };
      const VoxelCnt = await dbService.deleteMany(Voxel,VoxelFilter);

      let deleted  = await dbService.deleteMany(Itens,filter);
      let response = { Voxel :VoxelCnt, };
      return response; 
    } else {
      return {  itens : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBiome = async (filter) =>{
  try {
    let biome = await dbService.findMany(Biome,filter);
    if (biome && biome.length){
      biome = biome.map((obj) => obj.id);

      const VoxelFilter = { $or: [{ biome : { $in : biome } }] };
      const VoxelCnt = await dbService.deleteMany(Voxel,VoxelFilter);

      let deleted  = await dbService.deleteMany(Biome,filter);
      let response = { Voxel :VoxelCnt, };
      return response; 
    } else {
      return {  biome : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAction = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Action,filter);
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

const countVoxel = async (filter) =>{
  try {
    let voxel = await dbService.findMany(Voxel,filter);
    if (voxel && voxel.length){
      voxel = voxel.map((obj) => obj.id);

      const VoxelFilter = { $or: [{ parent : { $in : voxel } }] };
      const VoxelCnt =  await dbService.count(Voxel,VoxelFilter);

      const TickFilter = { $or: [{ voxel : { $in : voxel } }] };
      const TickCnt =  await dbService.count(Tick,TickFilter);

      let response = {
        Voxel : VoxelCnt,
        Tick : TickCnt,
      };
      return response; 
    } else {
      return {  voxel : 0 };
    }
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

const countTick = async (filter) =>{
  try {
    let tick = await dbService.findMany(Tick,filter);
    if (tick && tick.length){
      tick = tick.map((obj) => obj.id);

      const TickFilter = { $or: [{ tickmain : { $in : tick } }] };
      const TickCnt =  await dbService.count(Tick,TickFilter);

      let response = { Tick : TickCnt, };
      return response; 
    } else {
      return {  tick : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTexture = async (filter) =>{
  try {
    const textureCnt =  await dbService.count(Texture,filter);
    return { texture : textureCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSize = async (filter) =>{
  try {
    let size = await dbService.findMany(Size,filter);
    if (size && size.length){
      size = size.map((obj) => obj.id);

      const VoxelFilter = { $or: [{ size : { $in : size } }] };
      const VoxelCnt =  await dbService.count(Voxel,VoxelFilter);

      let response = { Voxel : VoxelCnt, };
      return response; 
    } else {
      return {  size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPart = async (filter) =>{
  try {
    let part = await dbService.findMany(Part,filter);
    if (part && part.length){
      part = part.map((obj) => obj.id);

      const ItensFilter = { $or: [{ model : { $in : part } }] };
      const ItensCnt =  await dbService.count(Itens,ItensFilter);

      let response = { Itens : ItensCnt, };
      return response; 
    } else {
      return {  part : 0 };
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

      const ItensFilter = { $or: [{ material : { $in : material } }] };
      const ItensCnt =  await dbService.count(Itens,ItensFilter);

      let response = { Itens : ItensCnt, };
      return response; 
    } else {
      return {  material : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countItens = async (filter) =>{
  try {
    let itens = await dbService.findMany(Itens,filter);
    if (itens && itens.length){
      itens = itens.map((obj) => obj.id);

      const VoxelFilter = { $or: [{ item : { $in : itens } }] };
      const VoxelCnt =  await dbService.count(Voxel,VoxelFilter);

      let response = { Voxel : VoxelCnt, };
      return response; 
    } else {
      return {  itens : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBiome = async (filter) =>{
  try {
    let biome = await dbService.findMany(Biome,filter);
    if (biome && biome.length){
      biome = biome.map((obj) => obj.id);

      const VoxelFilter = { $or: [{ biome : { $in : biome } }] };
      const VoxelCnt =  await dbService.count(Voxel,VoxelFilter);

      let response = { Voxel : VoxelCnt, };
      return response; 
    } else {
      return {  biome : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAction = async (filter) =>{
  try {
    const ActionCnt =  await dbService.count(Action,filter);
    return { Action : ActionCnt };
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

const softDeleteVoxel = async (filter,updateBody) =>{  
  try {
    let voxel = await dbService.findMany(Voxel,filter, { id:1 });
    if (voxel.length){
      voxel = voxel.map((obj) => obj.id);

      const VoxelFilter = { '$or': [{ parent : { '$in' : voxel } }] };
      const VoxelCnt = await dbService.updateMany(Voxel,VoxelFilter,updateBody);

      const TickFilter = { '$or': [{ voxel : { '$in' : voxel } }] };
      const TickCnt = await dbService.updateMany(Tick,TickFilter,updateBody);
      let updated = await dbService.updateMany(Voxel,filter,updateBody);

      let response = {
        Voxel :VoxelCnt,
        Tick :TickCnt,
      };
      return response;
    } else {
      return {  voxel : 0 };
    }
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

const softDeleteTick = async (filter,updateBody) =>{  
  try {
    let tick = await dbService.findMany(Tick,filter, { id:1 });
    if (tick.length){
      tick = tick.map((obj) => obj.id);

      const TickFilter = { '$or': [{ tickmain : { '$in' : tick } }] };
      const TickCnt = await dbService.updateMany(Tick,TickFilter,updateBody);
      let updated = await dbService.updateMany(Tick,filter,updateBody);

      let response = { Tick :TickCnt, };
      return response;
    } else {
      return {  tick : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTexture = async (filter,updateBody) =>{  
  try {
    const textureCnt =  await dbService.updateMany(Texture,filter);
    return { texture : textureCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSize = async (filter,updateBody) =>{  
  try {
    let size = await dbService.findMany(Size,filter, { id:1 });
    if (size.length){
      size = size.map((obj) => obj.id);

      const VoxelFilter = { '$or': [{ size : { '$in' : size } }] };
      const VoxelCnt = await dbService.updateMany(Voxel,VoxelFilter,updateBody);
      let updated = await dbService.updateMany(Size,filter,updateBody);

      let response = { Voxel :VoxelCnt, };
      return response;
    } else {
      return {  size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePart = async (filter,updateBody) =>{  
  try {
    let part = await dbService.findMany(Part,filter, { id:1 });
    if (part.length){
      part = part.map((obj) => obj.id);

      const ItensFilter = { '$or': [{ model : { '$in' : part } }] };
      const ItensCnt = await dbService.updateMany(Itens,ItensFilter,updateBody);
      let updated = await dbService.updateMany(Part,filter,updateBody);

      let response = { Itens :ItensCnt, };
      return response;
    } else {
      return {  part : 0 };
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

      const ItensFilter = { '$or': [{ material : { '$in' : material } }] };
      const ItensCnt = await dbService.updateMany(Itens,ItensFilter,updateBody);
      let updated = await dbService.updateMany(Material,filter,updateBody);

      let response = { Itens :ItensCnt, };
      return response;
    } else {
      return {  material : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItens = async (filter,updateBody) =>{  
  try {
    let itens = await dbService.findMany(Itens,filter, { id:1 });
    if (itens.length){
      itens = itens.map((obj) => obj.id);

      const VoxelFilter = { '$or': [{ item : { '$in' : itens } }] };
      const VoxelCnt = await dbService.updateMany(Voxel,VoxelFilter,updateBody);
      let updated = await dbService.updateMany(Itens,filter,updateBody);

      let response = { Voxel :VoxelCnt, };
      return response;
    } else {
      return {  itens : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBiome = async (filter,updateBody) =>{  
  try {
    let biome = await dbService.findMany(Biome,filter, { id:1 });
    if (biome.length){
      biome = biome.map((obj) => obj.id);

      const VoxelFilter = { '$or': [{ biome : { '$in' : biome } }] };
      const VoxelCnt = await dbService.updateMany(Voxel,VoxelFilter,updateBody);
      let updated = await dbService.updateMany(Biome,filter,updateBody);

      let response = { Voxel :VoxelCnt, };
      return response;
    } else {
      return {  biome : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAction = async (filter,updateBody) =>{  
  try {
    const ActionCnt =  await dbService.updateMany(Action,filter);
    return { Action : ActionCnt };
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
  deleteVoxel,
  deleteUniverse,
  deleteTick,
  deleteTexture,
  deleteSize,
  deletePart,
  deleteMaterial,
  deleteItens,
  deleteBiome,
  deleteAction,
  deleteChat_group,
  deleteChat_message,
  deleteUser,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countVoxel,
  countUniverse,
  countTick,
  countTexture,
  countSize,
  countPart,
  countMaterial,
  countItens,
  countBiome,
  countAction,
  countChat_group,
  countChat_message,
  countUser,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteVoxel,
  softDeleteUniverse,
  softDeleteTick,
  softDeleteTexture,
  softDeleteSize,
  softDeletePart,
  softDeleteMaterial,
  softDeleteItens,
  softDeleteBiome,
  softDeleteAction,
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
