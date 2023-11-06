'use strict';

 const {pathBanner,pathService,pathImages} = require('../../commonFile/modelPathList')
 const {getHomepageQuery, serviceCount} = require('../../commonFile/query')
 const {selectHomeImage} = require("../../commonFile/selectField")
module.exports = {
  async bannerData(ctx) {
    const imagesPromise = strapi.service(pathBanner).getData(pathImages, getHomepageQuery(selectHomeImage));
    const servicesCountPromise = strapi.query(pathService).count(serviceCount);

    // Use Promise.all to execute all promises in parallel
    return Promise.all([imagesPromise, servicesCountPromise])
      .then((results) => {
        const [images, servicesCount] = results;
        const banner = {servicesCount, images};
        return banner;
      })
      .catch((error) => {
        console.error("At least one promise was rejected:", error);
      });
  }
};
