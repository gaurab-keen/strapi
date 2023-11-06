module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/homepage/getBannerData',
     handler: 'banner.bannerData',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
