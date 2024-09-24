/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'QpPCXqEiR8eGjOj',
      'isDeleted':false,
      'username':'Caleb.Erdman69',
      'email':'Euna_Yundt@gmail.com',
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'Caleb.Erdman69' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'H97DmukSybXgJTz',
      'isDeleted':false,
      'username':'Virgil.Jacobi19',
      'email':'Desiree_Strosin@yahoo.com',
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'Virgil.Jacobi19' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Manager', 'Admin', 'System_User', 'user' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/chat_group/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_group/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/atommodelos_file/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/atommodelos_file/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_file/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/atommodelos_file/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/atommodelos_file/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_file/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/modelos_texturemap/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_texturemap/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturemap/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_texturemap/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_texturemap/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturemap/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/modelos_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/modelos_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/modelos_item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/modelos_item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/modelos_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/modelos_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/atommodelos_model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/atommodelos_model/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/atommodelos_model/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/atommodelos_model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/atommodelos_model/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/atommodelos_model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/universe_settings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_settings/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_settings/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_settings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_settings/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/universe_settings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_receita/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_receita/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_receita/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_receita/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_receita/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_receita/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_receita/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_receita/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_receita/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_receita/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_receita/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_receita/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_action/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_action/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_action/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_action/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_action/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_action/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_action/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_action/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_action/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_action/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_action/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_action/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_interface/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_interface/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_interface/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_interface/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_interface/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_interface/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_interface/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_interface/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_interface/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_interface/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_interface/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_interface/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_storage/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_storage/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_storage/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_storage/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_storage/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_storage/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_storage/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_storage/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_storage/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_storage/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_storage/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_storage/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_slot/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_slot/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_slot/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_slot/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_slot/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_slot/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_slot/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_slot/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_slot/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_slot/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_slot/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_slot/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_interface/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_interface/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_interface/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_interface/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_interface/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_interface/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_interface/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_interface/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_interface/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_interface/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_interface/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_interface/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_structure/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_structure/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_structure/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_structure/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_structure/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_structure/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_structure/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_structure/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_structure/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_structure/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_structure/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_structure/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_bigitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_bigitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_bigitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_bigitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_bigitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_bigitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_bigitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_bigitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_bigitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_bigitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_bigitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_bigitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_cube/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_cube/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_cube/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_cube/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/universe_cube/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe_cube/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_cube/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_cube/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_cube/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_cube/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe_cube/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe_cube/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_biomes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_biomes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_biomes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_biomes/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_biomes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_biomes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_biomes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_biomes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_biomes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_biomes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_biomes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_biomes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_rule/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_rule/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_rule/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_rule/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_rule/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_rule/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_rule/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_rule/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_rule/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_rule/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_rule/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_rule/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_tag/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/modelos_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturepart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturepart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturepart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturepart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/modelos_texturepart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/modelos_texturepart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturepart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturepart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturepart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturepart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/modelos_texturepart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/modelos_texturepart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'user',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/atommodelos_file/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/atommodelos_file/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_file/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/atommodelos_file/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/atommodelos_file/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_file/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_texturemap/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_texturemap/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturemap/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_texturemap/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_texturemap/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturemap/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_item/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/atommodelos_model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/atommodelos_model/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/atommodelos_model/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/atommodelos_model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/atommodelos_model/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/atommodelos_model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_settings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_settings/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_settings/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_settings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_settings/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_settings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_receita/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_receita/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_receita/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_receita/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_receita/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_receita/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_receita/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_receita/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_receita/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_receita/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_receita/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_receita/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_action/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_action/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_action/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_action/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_action/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_action/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_action/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_action/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_action/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_action/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_action/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_action/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_interface/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_interface/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_interface/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_interface/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_interface/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_interface/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_interface/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_interface/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_interface/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_interface/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_interface/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_interface/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_storage/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_storage/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_storage/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_storage/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_storage/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_storage/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_storage/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_storage/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_storage/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_storage/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_storage/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_storage/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_slot/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_slot/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_slot/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_slot/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_slot/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_slot/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_slot/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_slot/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_slot/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_slot/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_slot/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_slot/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_interface/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_interface/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_interface/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_interface/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_interface/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_interface/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_interface/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_interface/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_interface/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_interface/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_interface/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_interface/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_structure/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_structure/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_structure/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_structure/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_structure/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_structure/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_structure/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_structure/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_structure/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_structure/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_structure/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_structure/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_bigitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_bigitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_bigitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_bigitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_bigitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_bigitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_bigitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_bigitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_bigitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_bigitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_bigitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_bigitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_cube/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_cube/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_cube/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_cube/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe_cube/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe_cube/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_cube/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_cube/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_cube/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_cube/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe_cube/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe_cube/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_biomes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_biomes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_biomes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_biomes/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_biomes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_biomes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_biomes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_biomes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_biomes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_biomes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_biomes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_biomes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_rule/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_rule/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_rule/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_rule/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_rule/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_rule/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_rule/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_rule/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_rule/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_rule/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_rule/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_rule/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_tag/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturepart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturepart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturepart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturepart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/modelos_texturepart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/modelos_texturepart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturepart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturepart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturepart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturepart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/modelos_texturepart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/modelos_texturepart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'user',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/atommodelos_file/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/atommodelos_file/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_file/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/atommodelos_file/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/atommodelos_file/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_file/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_texturemap/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_texturemap/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturemap/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_texturemap/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_texturemap/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturemap/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_item/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/atommodelos_model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/atommodelos_model/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/atommodelos_model/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/atommodelos_model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/atommodelos_model/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/atommodelos_model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_settings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_settings/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_settings/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_settings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_settings/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_settings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_receita/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_receita/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_receita/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_receita/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_receita/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_receita/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_receita/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_receita/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_receita/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_receita/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_receita/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_receita/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_action/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_action/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_action/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_action/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_action/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_action/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_action/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_action/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_action/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_action/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_action/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_action/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_interface/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_interface/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_interface/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_interface/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_interface/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_interface/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_interface/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_interface/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_interface/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_interface/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_interface/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_interface/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_storage/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_storage/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_storage/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_storage/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_storage/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_storage/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_storage/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_storage/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_storage/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_storage/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_storage/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_storage/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_slot/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_slot/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_slot/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_slot/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_slot/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_slot/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_slot/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_slot/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_slot/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_slot/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_slot/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_slot/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_interface/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_interface/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_interface/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_interface/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_interface/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_interface/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_interface/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_interface/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_interface/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_interface/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_interface/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_interface/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_structure/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_structure/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_structure/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_structure/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_structure/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_structure/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_structure/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_structure/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_structure/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_structure/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_structure/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_structure/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_bigitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_bigitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_bigitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_bigitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_bigitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_bigitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_bigitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_bigitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_bigitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_bigitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_bigitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_bigitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_cube/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_cube/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_cube/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_cube/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe_cube/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe_cube/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_cube/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_cube/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_cube/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_cube/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe_cube/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe_cube/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_biomes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_biomes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_biomes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_biomes/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_biomes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_biomes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_biomes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_biomes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_biomes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_biomes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_biomes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_biomes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_rule/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_rule/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_rule/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_rule/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_rule/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_rule/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_rule/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_rule/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_rule/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_rule/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_rule/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_rule/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_tag/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_tag/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_tag/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_tag/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_tag/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_tag/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_tag/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_tag/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturepart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturepart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturepart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturepart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/modelos_texturepart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/modelos_texturepart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturepart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturepart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturepart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturepart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/modelos_texturepart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/modelos_texturepart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Manager', 'Admin', 'System_User', 'user' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Caleb.Erdman69',
      'password':'QpPCXqEiR8eGjOj'
    },{
      'username':'Virgil.Jacobi19',
      'password':'H97DmukSybXgJTz'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;