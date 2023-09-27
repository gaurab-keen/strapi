'use strict';

/**
 * A set of functions called "actions" for `homepage`
 */
 const {dataServiceApi,dataWhosWhoApi,modalPath,dataSpotlightApi,dataDiscoverApi} = require('../../commonFile/pathList')
 const {dataHomepageQuery} = require('../../commonFile/query')
module.exports = {
  async homepageData(ctx) {
    //const serviceData= await strapi.service(servicePath).getData(dataServiceApi,dataServiceQuery);
    const serviceData= await strapi.service(modalPath).getData(dataServiceApi,dataHomepageQuery);
    const whoswho= await strapi.service(modalPath).getData(dataWhosWhoApi,dataHomepageQuery);
    const spotlight= await strapi.service(modalPath).getData(dataSpotlightApi,dataHomepageQuery);
    const discover= await strapi.service(modalPath).getData(dataDiscoverApi,dataHomepageQuery);
    const homepage = {
      serviceData,
      whoswho,
      spotlight,
      discover
    };
    
     ctx.send(JSON.stringify(homepage))
  }
};
