module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/getStateData',
     handler: 'test2.testData2',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
