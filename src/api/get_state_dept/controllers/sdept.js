"use strict";
const xlsx = require("xlsx");
const moment = require("moment-timezone");

module.exports = {
  async sdept_data(ctx) {
    const path = require("path");
    const filePath = path.join(__dirname, "../../sampleData.xlsx");
    const workbook = xlsx.readFile(filePath);
    const stateSheet = workbook.SheetNames[7];

    try {
      const stateData = xlsx.utils.sheet_to_json(workbook.Sheets[stateSheet]);
      const createdRecords = await Promise.all(
        districtData.map(async (data, index) => {
          let state_dist_id = 0;
          stateData.map((data1,index1)=>{

            if(data1.code===data.state_id)
             {
              state_dist_id=index1+1;
            }
            })
          if (index == 1) {
            console.log("data>>>>", JSON.stringify(data));
          }

          const datamodified = {
            id: data.sd_id,  //modifying the id of strapi DB with the index of data
            title: data.title,
            lgd_code: data["lgd_code"],
            state_code: data["state_id"],
            lgd_short_name: data["lgd_short_name"],
            review: "Approved",
            district_id: data["_id"],
            state_dist: state_dist_id,
            created_by_id: 8,
            updated_by_id: 9,
          };

          // Create a new record
          const createdRecord = await strapi
            .query('api::district.district')
            .create({ data: datamodified });
        })
      );
      strapi.log.debug("Created Records:", createdRecords);

      return {
        message:
          "XLSX data converted and inserted into the database successfully",
      };
    } catch (error) {
      strapi.log.debug("error is ", error);
    }
  },
};
