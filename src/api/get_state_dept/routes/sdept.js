module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/getStateDeptData',
     handler: 'sdept.sdept_data',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
