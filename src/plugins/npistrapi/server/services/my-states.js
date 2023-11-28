"use strict";

module.exports = ({ strapi }) => ({
  async getData() {
    try {
      const entries = await strapi.db.query('api::location-state-dist.location-state-dist')
        .findMany({
          where: {
            publishedAt: {
              $notNull: true,
            },
          },
          populate: ["districts"],
          select: ["title"],
        });
      console.log("data of states " + JSON.stringify(entries));
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

