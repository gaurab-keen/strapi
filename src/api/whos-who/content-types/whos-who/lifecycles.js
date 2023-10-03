const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;
const {getDetailsById,updateDetailsById} = require('../../../commonFiles/LiveCycleMethod')
const {dataWhosWhoApi} = require('../../../commonFiles/apilist')

module.exports = {
     beforeCreate: async ({ params }) => {

     },
     beforeUpdate: async ({params})=>{
      const data=await getDetailsById(dataWhosWhoApi,params.where.id); 
        if(data==null)
          return;
        if (params.data.hasOwnProperty("publishedAt")) {// Check event  published or Unpublished button .
           if(params.data.publishedAt!=null || params.data.publishedAt!=undefined){
            strapi.log.debug("Data is Unpulished "+JSON.stringify(data.review))
              //  Published button event
                 if(data.review!='Approved'){// If Not Approved we can not save data
                   throw new ApplicationError('Collection data is not approved', { foo: 'bar' });
                 } 
                 strapi.log.debug("Data is Published  Status  "+JSON.stringify(data.review))
            }  else{
              //  Published button event
                strapi.log.debug("Data is Unpulished "+JSON.stringify(data.review))
                updateDetailsById(dataWhosWhoApi,params.where.id) //update data With Draft Mode When Unplished data
              strapi.log.debug("Data is unpublished  Status We will send Email to Reviewer")
            }   
        }
        else if(data.review=="Under Review"){  
                // Send Email for notify user
                strapi.log.debug("Data is Under Review  Status , We will send Email to Reviewer to check and approved"+JSON.stringify(data.review))    
         }
     },
     afterCreate:async ({result})=>{
     },

     afterUpdate: async ({result})=>{
    
      },

     afterDelete: async({result})=>{
      
     }
        
  };