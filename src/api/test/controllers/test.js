"use strict";
const xlsx = require("xlsx");
const moment = require("moment-timezone");

module.exports = {
  async testData(ctx) {
    const path = require("path");
    const filePath = path.join(__dirname, "../../sampleData.xlsx");
    const workbook = xlsx.readFile(filePath);
    const stateSheet = workbook.SheetNames[7];
    const districtSheet = workbook.SheetNames[2];

    try {
      const stateData = xlsx.utils.sheet_to_json(workbook.Sheets[stateSheet]);
      const districtData = xlsx.utils.sheet_to_json(workbook.Sheets[districtSheet]);
      
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

          const currentTime = new Date();
          // Get individual components of the date and time
          const year = currentTime.getFullYear();
          const month = String(currentTime.getMonth() + 1).padStart(2, "0"); // Months are zero-based
          const day = String(currentTime.getDate()).padStart(2, "0");
          const hours = String(currentTime.getHours()).padStart(2, "0");
          const minutes = String(currentTime.getMinutes()).padStart(2, "0");
          const seconds = String(currentTime.getSeconds()).padStart(2, "0");
          const milliseconds = String(currentTime.getMilliseconds()).padStart(3,"0");

          // Format the timestamp
          const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

          const originalCreateTime = data["_source/created_at"];
          const originalUpdateTime = data["_source/updated_at"];

          const parsedCreateTime = moment(originalCreateTime);
          const parsedUpdateTime = moment(originalUpdateTime);

          const newCreateTime = parsedCreateTime.format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          );
          const newUpdateTime = parsedUpdateTime.format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          );

          console.log("Created_at>>>>>", newCreateTime);
          console.log("Updated_at>>>>>", newUpdateTime);

          const datamodified = {
            title: data.title,
            id: index+1,                        //modifying the id of strapi DB with the index of data
            lgd_code: data["lgd_code"],
            state_code: data["state_id"],
            lgd_short_name: data["lgd_short_name"],
            review: "Approved",
            district_id: data["_id"],
            state_dist: state_dist_id,
            created_by_id: 8,
            updated_by_id: 9,
            published_at: formattedTimestamp,
          };

          // Create a new record
          const createdRecord = await strapi
            .query('api::district.district')
            .create({ data: datamodified });

          // Log the created record for verification
          // console.log("Created Record:", JSON.stringify(createdRecord));

          // const createdRecord = await strapi.db.query('api::service.service').create(mydata);
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
