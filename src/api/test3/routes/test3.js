module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/getDepartmentData',
     handler: 'test3.testData3',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
