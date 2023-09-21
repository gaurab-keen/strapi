const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;


module.exports = {
     beforeCreate: async ({ params }) => {
        const adminUserId = params.data.createdBy;    
     },

     beforeUpdate: async ({params})=>{
      strapi.log.debug("Data status  Status "+JSON.stringify(params))
      const entries = await strapi.db.query('api::whos-who.whos-who').findOne({ 
        where: { id: params.where.id }});   
        if(entries==null)
          return;

        if (params.data.hasOwnProperty("publishedAt")) {// check Publish button event
          strapi.log.debug("Data status  Status "+JSON.stringify(params))
           if(params.data.publishedAt!=null || params.data.publishedAt!=undefined){
                 if(entries.review!='Approved'){
                   throw new ApplicationError('Collection data is not approved', { foo: 'bar' });
                
                 } 
                 strapi.log.debug("Data is Published  Status  "+JSON.stringify(entries.review))
            }  else{
              strapi.log.debug("Data is Unpulished "+JSON.stringify(entries.review))
              try{
                const entries = await strapi.db.query('api::whos-who.whos-who').update({
                  where: { id: params.where.id },
                              data: {
                                review:'Under Review',
                              }, 
                });
                
              }
             catch(exp){
            }
              strapi.log.debug("Data is unpublished  Status We will send Email to Reviewer")
            }   
        }
        else{
          strapi.log.debug("Data is save button  "+JSON.stringify(entries.review))
            if(entries.review=="Under Review"){// check for send email 
                
                strapi.log.debug("Data is Under Review  Status , We will send Email to Reviewer to check and approved"+JSON.stringify(entries.review))
              }
         }
      
     },
     afterCreate:async ({result})=>{
      // try{
      //       const entries = await strapi.db.query('api::whos-who.whos-who').update({
      //         where: { id: result.id },
      //                     data: {
      //                       updatedBy_email:result.updatedBy.email,
      //                       updatedBy_name:`${result.updatedBy.firstname} ${result.updatedBy.lastname}`
      //                     }, 
      //       });
      //       if(result.review="Under Review")
      //       {

      //       }
      //     }
      // catch(exp){
      // }
     },

     afterUpdate: async ({result})=>{
     // strapi.log.debug("after Updated Data data and  "+JSON.stringify(result));
      },

     afterDelete: async({result})=>{
      strapi.log.debug("after Deleted data and  "+JSON.stringify(result));
     }
        
  };