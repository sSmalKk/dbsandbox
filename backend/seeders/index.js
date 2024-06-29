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
      'password':'sSmalKk369',
      'isDeleted':false,
      'username':'sSmalKk2',
      'email':'Coralie_Luettgen3@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'sSmalKk' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'sSmalKk369',
      'isDeleted':false,
      'username':'adm',
      'email':'Jalon.Hagenes49@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'Buddy.DuBuque58' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
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
        role: 'User',
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
        role: 'User',
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
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'System_User',
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
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'System_User',
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
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
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
        role: 'User',
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
        role: 'User',
        method: 'DELETE' 
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
        role: 'User',
        method: 'POST' 
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
        route: '/admin/wallpaper/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/wallpaper/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallpaper/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/wallpaper/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/wallpaper/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/wallpaper/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallpaper/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallpaper/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallpaper/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallpaper/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallpaper/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallpaper/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallpaper/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallpaper/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/wallpaper/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/event/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/event/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/event/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/event/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/event/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/event/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/event/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/event/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/event/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/event/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemmodel/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemmodel/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemmodel/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemmodel/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemmodel/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemmodel/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/itemmodel/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/itemmodel/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/itemmodel/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemmodel/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemmodel/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/itemmodel/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemmodel/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itemmodel/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemmodel/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/itemmodel/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemmodel/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itemmodel/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemmodel/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/itemmodel/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemmodel/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/itemmodel/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/itemmodel/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/itemmodel/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pattern/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pattern/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/pattern/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pattern/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pattern/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pattern/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/pattern/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/pattern/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/pattern/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pattern/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/pattern/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/pattern/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pattern/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/pattern/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pattern/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/pattern/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pattern/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/pattern/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pattern/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/pattern/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pattern/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/pattern/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/pattern/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pattern/deletemany',
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
        route: '/admin/worlddata/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/worlddata/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/worlddata/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/worlddata/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/worlddata/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/worlddata/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/worlddata/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/worlddata/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/worlddata/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/worlddata/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/worlddata/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/worlddata/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/worlddata/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/worlddata/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/worlddata/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/worlddata/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/worlddata/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/worlddata/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/worlddata/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/worlddata/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/worlddata/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/worlddata/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/worlddata/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/worlddata/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/humanaperance/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/humanaperance/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/humanaperance/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/humanaperance/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/humanaperance/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/humanaperance/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/humanaperance/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/humanaperance/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/humanaperance/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/humanaperance/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/humanaperance/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/humanaperance/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/humanaperance/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/humanaperance/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/humanaperance/deletemany',
        role: 'System_User',
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
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/size/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/updatebulk',
        role: 'System_User',
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
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/deletemany',
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
        role: 'User',
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
        role: 'User',
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
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'System_User',
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
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'System_User',
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
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
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
        role: 'User',
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
        role: 'User',
        method: 'DELETE'
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
        role: 'User',
        method: 'POST'
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
        route: '/device/api/v1/wallpaper/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallpaper/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallpaper/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/wallpaper/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/wallpaper/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallpaper/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallpaper/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallpaper/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallpaper/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallpaper/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallpaper/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallpaper/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallpaper/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallpaper/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wallpaper/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/event/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/event/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/event/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/itemmodel/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/itemmodel/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemmodel/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/itemmodel/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/itemmodel/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemmodel/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pattern/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/pattern/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pattern/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pattern/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pattern/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pattern/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pattern/deletemany',
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
        route: '/device/api/v1/worlddata/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/worlddata/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/worlddata/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/worlddata/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/worlddata/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/worlddata/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/worlddata/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/humanaperance/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/humanaperance/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/humanaperance/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/humanaperance/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/humanaperance/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/humanaperance/deletemany',
        role: 'System_User',
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
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'System_User',
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
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/deletemany',
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

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
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
      'username':'Ludwig45',
      'password':'dK5FgpbMnr510ax'
    },{
      'username':'Buddy.DuBuque58',
      'password':'ZRwoOQCYROnUf3N'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
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