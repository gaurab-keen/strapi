
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/getadmin/",
    handler: "myAdmin.getAdminUser",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/getstates/",
    handler: "myStates.getStateData",
    config: {
      policies: [],
    },
  },
 
];
