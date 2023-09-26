'use strict';

/**
 * A set of functions called "actions" for `homepage`
 */
 const {dataServiceApi,dataWhosWhoApi,servicePath} = require('../commonFile/apilist')
 const {dataServiceQuery,dataWhosWhoQuery} = require('../commonFile/query')
module.exports = {
  async homepageData(ctx) {
    //const serviceData= await strapi.service(servicePath).getData(dataServiceApi,dataServiceQuery);
    const serviceData= await strapi.service(servicePath).getData(dataServiceApi,dataServiceQuery);
    const whoswho= await strapi.service(servicePath).getData(dataWhosWhoApi,dataWhosWhoQuery);
    const homepage = {
      serviceData,
      whoswho,
    };
    
     ctx.send(JSON.stringify(homepage))
  }
};
