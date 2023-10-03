'use strict';

/**
 * A set of functions called "actions" for `homepage`
 */
 const {dataServiceApi,dataWhosWhoApi,servicePath} = require('../commonFile/apilist')
 const {dataServiceQuery,dataWhosWhoQuery,serviceCount} = require('../commonFile/query')
module.exports = {
  async homepageData(ctx) {

    const service_count= await strapi.query(dataServiceApi).count(serviceCount);

    const services= await strapi.service(servicePath).getData(dataServiceApi,dataServiceQuery);
    const whoswho= await strapi.service(servicePath).getData(dataWhosWhoApi,dataWhosWhoQuery);
   
    const homepage = {
      service_count,
      services,
      whoswho
     
    };
    
     ctx.send(JSON.stringify(homepage))
  }
};
