module.exports = {   
     async getData (api ,query){
      try{
        return  serviceData = await strapi.db.query(api).findMany(query);
      }catch(err)
      {
        return {
          message:'Something wrong',
          error:err
        } ;
      } 
    },
   
};
