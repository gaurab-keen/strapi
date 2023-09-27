module.exports = {   
    
     dataHomepageQuery:{
        where: {
         is_show_homepage:true,
          publishedAt: {
            $notNull: true,
          },
        }
      },
};
