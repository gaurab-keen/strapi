'use strict';

/**
 * A set of functions called "actions" for `homepage`
 */
 const {pathHomeservice,pathService,pathWhosWho,pathSpotlight,pathDiscover,pathInitiative,pathMenulist} = require('../../commonFile/modelPathList')
 const {getHomepageQuery, serviceCount} = require('../../commonFile/query')
 const {selectHomeWhoswho,selectHomeService,selectHomeSpotlight,selectHomeDiscover,selectHomeInitiative,selectHomeMenuList} = require("../../commonFile/selectField")
module.exports = {
  async homepageData(ctx) {

//     const serviceData= await strapi.service(pathHomeservice).getData(pathService,getHomepageQuery(selectHomeService));
//     const whoswho= await strapi.service(pathHomeservice).getData(pathWhosWho,getHomepageQuery(selectHomeWhoswho));
//     const spotlight= await strapi.service(pathHomeservice).getData(pathSpotlight,getHomepageQuery(selectHomeSpotlight));
//     const discover= await strapi.service(pathHomeservice).getData(pathDiscover,getHomepageQuery(selectHomeDiscover));
//     const initiative= await strapi.service(pathHomeservice).getData(pathInitiative,getHomepageQuery(selectHomeInitiative));
//     const images= await strapi.service(pathHomeservice).getData(pathImages,getHomepageQuery(selectHomeImage));
//     const servicesCount= await strapi.query(pathService).count(serviceCount);
//     const homepage = {
//       servicesCount,
//       serviceData,
//       initiative,
//       whoswho,
//       spotlight,
//       discover,
//       images
//     };
    
//      ctx.send(JSON.stringify(homepage))
//   }
// };

    const servicePromise = strapi.service(pathHomeservice).getData(pathService, getHomepageQuery(selectHomeService));
    const whoswhoPromise = strapi.service(pathHomeservice).getData(pathWhosWho, getHomepageQuery(selectHomeWhoswho));
    const spotlightPromise = strapi.service(pathHomeservice).getData(pathSpotlight, getHomepageQuery(selectHomeSpotlight));
    const discoverPromise = strapi.service(pathHomeservice).getData(pathDiscover, getHomepageQuery(selectHomeDiscover));
    const initiativePromise = strapi.service(pathHomeservice).getData(pathInitiative, getHomepageQuery(selectHomeInitiative));
    const menulistPromise = strapi.service(pathHomeservice).getData(pathMenulist, getHomepageQuery(selectHomeMenuList));
    const servicesCountPromise = strapi.query(pathService).count(serviceCount);

    // Use Promise.all to execute all promises in parallel
    return Promise.all([servicePromise, whoswhoPromise, spotlightPromise, discoverPromise, initiativePromise, menulistPromise, servicesCountPromise])
      .then((results) => {
        const [serviceData, whoswho, spotlight, discover, initiative, menuList, servicesCount] = results;
        const homepage = {servicesCount, serviceData, menuList, initiative, whoswho, spotlight, discover};
        return homepage;
      })
      .catch((error) => {
        console.error("At least one promise was rejected:", error);
      });
  }
};
