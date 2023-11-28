"use strict";

module.exports = ({ strapi }) => ({
  async getData() {
    try {
      const entries = await strapi.db.query('api::category-group.category-group')
        .findMany({
          where: {
            publishedAt: {
              $notNull: true,
            },
          },
          populate: ["departments"],
          select: ["title"],
        });
      console.log("data of ministries " + JSON.stringify(entries));
      if (entries != null) {
        return entries;
      }
    } catch (err) {
      console.log("Something is wrong " + err);
    }

    const data = { errror: "no data found" };
    return data;
  },
});

