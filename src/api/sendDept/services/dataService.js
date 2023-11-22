module.exports = {  

     async getData (api,query){
      try{
        let  serviceData = await strapi.db.query(api).findMany(query);
        return serviceData;
      }catch(err)
      {
        return {
          message:'Something wrong',
          error:err
        } ;
      } 
    },
   
};
