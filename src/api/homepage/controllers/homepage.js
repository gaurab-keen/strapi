'use strict';

/**
 * A set of functions called "actions" for `homepage`
 */
 const {pathHomeservice,pathService,pathWhosWho,pathSpotlight,pathDiscover,pathInitiative,pathImages} = require('../../commonFile/modelPathList')
 const {getHomepageQuery, serviceCount} = require('../../commonFile/query')
 const {selectHomeWhoswho,selectHomeService,selectHomeSpotlight,selectHomeDiscover,selectHomeInitiative,selectHomeImage} = require("../../commonFile/selectField")
module.exports = {
  async homepageData(ctx) {

    const serviceData= await strapi.service(pathHomeservice).getData(pathService,getHomepageQuery(selectHomeService));
    const whoswho= await strapi.service(pathHomeservice).getData(pathWhosWho,getHomepageQuery(selectHomeWhoswho));
    const spotlight= await strapi.service(pathHomeservice).getData(pathSpotlight,getHomepageQuery(selectHomeSpotlight));
    const discover= await strapi.service(pathHomeservice).getData(pathDiscover,getHomepageQuery(selectHomeDiscover));
    const initiative= await strapi.service(pathHomeservice).getData(pathInitiative,getHomepageQuery(selectHomeInitiative));
    const images= await strapi.service(pathHomeservice).getData(pathImages,getHomepageQuery(selectHomeImage));
    const servicesCount= await strapi.query(pathService).count(serviceCount);
    const homepage = {
      servicesCount,
      serviceData,
      initiative,
      whoswho,
      spotlight,
      discover,
      images
    };
    
     ctx.send(JSON.stringify(homepage))
  }
};
