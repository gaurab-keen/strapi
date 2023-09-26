module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/homepage/getStrapiData',
     handler: 'homepage.homepageData',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
