module.exports = {

  getHomepageQuery:((selectedField) =>{
    let data= {  
       where: {
      is_show_homepage: true,
      publishedAt: {
        $notNull: true,
      },
    },
     populate: ["homepage_img"],
     select: selectedField 
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
