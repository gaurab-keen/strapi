"use strict";
const xlsx = require("xlsx");
const moment = require("moment-timezone");

module.exports = {
  async testData4(ctx) {
    const path = require("path");
    const filePath = path.join(__dirname, "sampleData.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[3]; //Assuming data is on sheet2 [1]

    try {
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const createdRecords = await Promise.all(
        sheetData.map(async (data, index) => {
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

          // Assuming you have a date string
          // const dateString = "2023-11-29 15:06:17.616000";

          // Parse the date string into a Date object
          // const parsedDate = new Date(dateString);

          console.log("formatted time>>>>", formattedTimestamp);

          const originalCreateTime = data["_source/created_at"];
          const parsedCreateTime = moment(originalCreateTime);
          const newCreateTime = parsedCreateTime.format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          );
          console.log("Created_at>>>>>", newCreateTime);

          const originalUpdateTime = data["_source/updated_at"];
          const parsedUpdateTime = moment(originalUpdateTime);
          const newUpdateTime = parsedUpdateTime.format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          );
          console.log("Updated_at>>>>>", newUpdateTime);

          const datamodified = {
            id: index + 1, //modifying the id of strapi DB with the index of data
            title: data["title"],
            igod_cmd_id: data["_id"],
            is_dept: 0,
            review: "Approved",
            created_by_id: 1,
            updated_by_id: 1,
            published_at: formattedTimestamp,
          };

          // Create a new record
          const createdRecord = await strapi
            .query("api::central-ministry-dept.central-ministry-dept")
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
