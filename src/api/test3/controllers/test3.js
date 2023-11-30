"use strict";
const xlsx = require("xlsx");
const moment = require("moment-timezone");

module.exports = {
  async testData3(ctx) {
    const path = require("path");
    const filePath = path.join(__dirname, "sampleData.xlsx");
    const workbook = xlsx.readFile(filePath);
    const ministrySheet = workbook.SheetNames[3];
    const departmentSheet = workbook.SheetNames[4];

    try {
      const ministryData = xlsx.utils.sheet_to_json(workbook.Sheets[ministrySheet]);
      const departmentData = xlsx.utils.sheet_to_json(workbook.Sheets[departmentSheet]);
      const createdRecords = await Promise.all(
        departmentData.map(async (data, index) => {
          let cmd_id = 0;
          ministryData.map((data1,index1)=>{

            if(data1._id ===data.ug_min_id)
             {
              cmd_id=index1+1;
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
            id: index+1,   //modifying the id of strapi DB with the index of data
            title: data.title,
            is_dept: 1,
            ug_min_id: data.ug_min_id,
            review: "Approved",
            igod_cmd_id: data["_id"],
            ministries : cmd_id,
            created_by_id: 1,
            updated_by_id: 1,
            published_at: formattedTimestamp,
          };

          // Create a new record
          const createdRecord = await strapi
            .query('api::ug-department.ug-department')
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
