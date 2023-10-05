module.exports = {   
   
    // async getUserDetails(){

    // },
    async getReviewDetailsById(path,id){
        const entries = await strapi.db.query(path).findOne({ 
            where: { id: id}});   
        return entries;    
    },
    async updateReviewById(path,id,status){

        const entries = await strapi.db.query(path).update({
            where: { id: id},
                        data: {
                          review:status,
                        }, 
          });
          return entries;
        }
    }