"use strict";
const xlsx = require("xlsx");
const moment = require('moment-timezone');

module.exports = {
  async testData(ctx) {

    const path = require("path");
    const filePath = path.join(__dirname, "sampleData.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[1];

    try {
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const createdRecords = await Promise.all(
        sheetData.map(async (data, index) => {
          if (index == 1) {
            console.log("data>>>>", JSON.stringify(data));
        }

        const originalCreateTime = data['_source/created_at'];
        const originalUpdateTime = data['_source/updated_at'];

        const parsedCreateTime = moment(originalCreateTime);
        const parsedUpdateTime = moment(originalUpdateTime);

        const newCreateTime = parsedCreateTime.format("YYYY-MM-DD HH:mm:ss.SSS");
        const newUpdateTime = parsedUpdateTime.format("YYYY-MM-DD HH:mm:ss.SSS");

        console.log("Created_at>>>>>", newCreateTime);
        console.log("Updated_at>>>>>", newUpdateTime);

        const datamodified = {
          title: data['_source/title/en'],
          cmd_id: data['_id'],
          is_dept: 0,
          created_at: newCreateTime,
          updated_at: newUpdateTime,
          published_at: newUpdateTime,
          review:"Approved",
          created_by_id: 1,
          updated_by_id: 1,
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
