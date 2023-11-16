module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/getTestData',
     handler: 'test.testData',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
