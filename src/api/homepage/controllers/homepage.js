'use strict';

/**
 * A set of functions called "actions" for `homepage`
 */
 const {dataServiceApi,dataWhosWhoApi,modelPath,dataSpotlightApi,dataDiscoverApi} = require('../../commonFile/modelPathList')
 const {getHomepageQuery, serviceCount} = require('../../commonFile/query')
 const {selectHomeWhoswho,selectHomeService,selectHomeSpotlight,selectHomeDiscover} = require("../../commonFile/selectField")
module.exports = {
  async homepageData(ctx) {

    const serviceData= await strapi.service(modelPath).getData(dataServiceApi,getHomepageQuery(selectHomeService));
    const whoswho= await strapi.service(modelPath).getData(dataWhosWhoApi,getHomepageQuery(selectHomeWhoswho));
    const spotlight= await strapi.service(modelPath).getData(dataSpotlightApi,getHomepageQuery(selectHomeSpotlight));
    const discover= await strapi.service(modelPath).getData(dataDiscoverApi,getHomepageQuery(selectHomeDiscover));
    const servicesCount= await strapi.query(dataServiceApi).count(serviceCount);
    const homepage = {
      servicesCount,
      serviceData,
      whoswho,
      spotlight,
      discover
    };
    
     ctx.send(JSON.stringify(homepage))
  }
};
