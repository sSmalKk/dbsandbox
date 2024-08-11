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
        route: '/admin/action/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/action/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/action/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/action/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/action/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/action/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/action/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/action/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/action/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/action/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/action/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/action/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/action/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/action/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/action/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/action/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/action/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/action/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/action/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/action/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/action/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/action/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/action/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/action/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/action/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/action/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/action/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/action/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/action/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/action/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/action/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/action/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/action/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/action/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/action/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/action/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/action/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/action/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/action/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/action/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/action/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/action/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/biome/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/biome/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/biome/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/biome/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/biome/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/biome/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/biome/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/biome/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/biome/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/biome/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/biome/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/biome/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/biome/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/biome/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/biome/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/biome/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/biome/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/biome/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/biome/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/biome/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/biome/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/biome/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/biome/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/biome/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/biome/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/biome/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/biome/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/biome/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/biome/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/biome/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/biome/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/biome/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/biome/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/biome/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/biome/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/biome/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/biome/delete/:id',
        role: 'Manager',
        method: 'DELETE' 
      },
      {
        route: '/admin/biome/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/biome/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/biome/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/biome/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/biome/deletemany',
        role: 'System_User',
        method: 'POST'
      },
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
        route: '/admin/itens/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/itens/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itens/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/itens/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/itens/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itens/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/itens/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/itens/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itens/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/itens/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/itens/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/itens/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/itens/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/itens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/itens/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/itens/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itens/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/itens/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/itens/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/itens/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/itens/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/itens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itens/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/itens/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itens/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/itens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itens/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/itens/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/itens/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/itens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itens/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/itens/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/itens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itens/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/itens/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/itens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itens/delete/:id',
        role: 'Manager',
        method: 'DELETE' 
      },
      {
        route: '/admin/itens/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/itens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/itens/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/itens/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/material/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/material/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/material/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/material/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/material/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/material/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/material/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/material/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/material/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/material/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/material/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/material/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/material/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/material/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/material/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/material/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/material/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/part/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/part/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/part/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/part/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/part/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/part/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/part/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/part/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/part/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/part/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/part/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/part/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/part/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/part/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/part/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/part/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/part/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/part/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/part/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/part/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/part/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/part/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/part/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/part/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/part/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/part/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/part/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/part/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/part/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/part/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/part/softdelete/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/part/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/part/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/part/softdeletemany',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/part/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/part/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/part/delete/:id',
        role: 'Manager',
        method: 'DELETE' 
      },
      {
        route: '/admin/part/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/part/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/part/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/part/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/part/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/size/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/size/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/size/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/size/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/size/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/size/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/size/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/size/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdelete/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/softdeletemany',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/delete/:id',
        role: 'Manager',
        method: 'DELETE' 
      },
      {
        route: '/admin/size/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/size/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/tick/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/tick/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tick/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/tick/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tick/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/tick/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tick/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/tick/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tick/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/tick/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tick/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/tick/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tick/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/tick/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/tick/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/tick/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/tick/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/tick/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tick/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/tick/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tick/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/tick/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/tick/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/tick/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tick/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/softdelete/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tick/softdeletemany',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/tick/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tick/delete/:id',
        role: 'Manager',
        method: 'DELETE' 
      },
      {
        route: '/admin/tick/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/tick/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/tick/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/tick/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tick/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/voxel/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/voxel/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/voxel/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/voxel/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/voxel/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/voxel/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/voxel/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/voxel/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/voxel/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/voxel/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/voxel/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/voxel/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/voxel/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/voxel/delete/:id',
        role: 'Manager',
        method: 'DELETE' 
      },
      {
        route: '/admin/voxel/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/voxel/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/voxel/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/voxel/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/texture/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/texture/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/texture/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/texture/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/texture/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/texture/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/texture/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/texture/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/texture/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/texture/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/texture/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/texture/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/texture/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/texture/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/texture/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/texture/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/texture/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/texture/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/texture/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/texture/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/texture/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/texture/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/texture/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/texture/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/texture/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/texture/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/texture/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/texture/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/texture/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/texture/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/texture/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/texture/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/texture/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/texture/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/texture/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/texture/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/texture/deletemany',
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
        route: '/admin/universe/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/universe/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/universe/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/universe/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/universe/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/universe/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/deletemany',
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
        route: '/device/api/v1/action/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/action/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/action/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/action/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/action/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/action/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/action/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/action/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/action/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/action/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/action/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/action/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/action/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/action/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/biome/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/biome/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/biome/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/biome/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/biome/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/biome/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/biome/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/biome/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/biome/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/biome/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/biome/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/biome/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/biome/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/biome/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/biome/deletemany',
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
        route: '/device/api/v1/itens/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/itens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/itens/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/itens/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/itens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/itens/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/itens/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/itens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/itens/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/itens/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/itens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itens/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/itens/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/itens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/itens/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/material/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/part/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/part/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/part/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/part/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/part/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/part/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/part/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/part/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/part/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/part/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/part/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/part/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/part/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/part/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/part/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/part/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/part/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/size/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/size/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/size/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tick/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tick/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tick/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/tick/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tick/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tick/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tick/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tick/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tick/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tick/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/voxel/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/voxel/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/voxel/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/voxel/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/voxel/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/voxel/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/voxel/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/voxel/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/voxel/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/voxel/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/voxel/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/voxel/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/voxel/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/voxel/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/voxel/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/texture/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/texture/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/texture/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/texture/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/texture/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/texture/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/texture/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/texture/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/texture/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/texture/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/texture/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/texture/deletemany',
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
        route: '/device/api/v1/universe/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/deletemany',
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
        route: '/client/api/v1/action/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/action/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/action/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/action/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/action/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/action/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/action/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/action/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/action/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/action/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/action/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/action/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/action/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/action/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/biome/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/biome/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/biome/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/biome/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/biome/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/biome/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/biome/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/biome/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/biome/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/biome/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/biome/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/biome/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/biome/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/biome/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/biome/deletemany',
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
        route: '/client/api/v1/itens/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/itens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/itens/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/itens/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/itens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/itens/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/itens/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/itens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/itens/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/itens/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/itens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itens/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/itens/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/itens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/itens/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/material/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/part/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/part/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/part/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/part/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/part/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/part/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/part/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/part/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/part/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/part/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/part/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/part/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/part/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/part/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/part/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/size/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tick/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tick/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tick/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/tick/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/tick/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tick/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tick/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tick/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tick/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tick/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/voxel/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/voxel/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/voxel/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/voxel/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/voxel/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/voxel/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/voxel/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/voxel/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/voxel/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/voxel/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/voxel/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/voxel/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/voxel/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/voxel/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/voxel/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/texture/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/texture/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/texture/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/texture/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/texture/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/texture/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/texture/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/texture/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/texture/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/texture/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/deletemany',
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
        route: '/client/api/v1/universe/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/deletemany',
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
      {
        route: '/startserver',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/tickupdate',
        role: 'System_User',
        method: 'GET' 
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