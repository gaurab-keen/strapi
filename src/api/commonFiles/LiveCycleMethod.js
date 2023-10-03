
module.exports = {   
   
    async getUserDetails(){

    },
    async getDetailsById(path,id){
        const entries = await strapi.db.query(path).findOne({ 
            where: { id: id}});   
        return entries;    
    },
    async updateDetailsById(path,id){

        const entries = await strapi.db.query(path).update({
            where: { id: id},
                        data: {
                          review:'Draft',
                        }, 
          });   
        return entries;    
    }
};
