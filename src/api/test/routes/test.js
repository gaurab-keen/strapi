module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/getDistrictData',
     handler: 'test.testData',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
