const {selectHomeWhoswho,selectHomeService,selectHomeSpotlight,selectHomeDiscover} = require("./selectField")
module.exports = {

  getHomepageQuery:((selectedFiled) =>{
    let data= {  
       where: {
      is_show_homepage: true,
      publishedAt: {
        $notNull: true,
      },
    },
     populate: ["homepage_img"],
     select: selectedFiled 
    }
    
      return data;
    
  }),

  serviceCount: {
    where: {
      publishedAt: {
        $notNull: true,
      },
    },
    
  },
};
