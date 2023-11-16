"use strict";
const xlsx = require("xlsx");

module.exports = {
  async testData(ctx) {
// const workbook = xlsx.readFile(sample);
    // const sheetName = workbook.SheetNames[0];
    // const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    // strapi.log.debug("sheetdata", JSON.stringify(sheetData));

    // return "success";

    const path = require("path");
    const filePath = path.join(__dirname, "sampleData.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assumes data is on the first sheet

    try {
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const createdRecords = await Promise.all(
        sheetData.map(async (data, index) => {
          if (index == 1) {
            console.log("data>>>>", JSON.stringify(data.Maturity));
          const datamodified = {
            title: data.Title,
            keywords: data.Keywords,
            description: data.Description,
            url: data.URL,
            url_is_on_gov_domain: data['Govt Domain'],
            category_list: data.Categories,
            // created_by_id: data.Author, >>>>>>>>>>>>>>>>>>>>>>>Need to discuss
            created_by_id: 1,
            service_maturity: 1,
            interaction_type: data.Interaction,
            metadata_language: data['Metadata Language'],
            service_language: data['Service Language'],
            // owner: data['Owner'],
            owner: 1,
            state_dept_orgs: data['State Dept/Org'],
            central_ministry_dept: data['Central Ministry/Dept.'],
            state_dists: data['Location (State/District)'],
            people_group: data['People Group'],
            
            translation_id: data['Translation ID'],
            translation_status: data['Translation Status'],
            power_by_service_plus: data['By Service Plus'],
            service_plus_id: data['Service Plus ID'],
            listing_page: data['Listing Page'],
            form_available: data['Form Available'],
            login_required: data['Login Required'],
            in_UMANG: data['In UMANG'],
            UMANG_url: data['UMANG URL'],
            in_service_plus: data['In Service Plus'],
            sp_url: data['SP URL']
          };

          // Create a new record
          const createdRecord = await strapi
            .query("api::service.service")
            .create({ data: datamodified });
        }
            
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
