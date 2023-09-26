module.exports = {   
    
     dataServiceQuery:{
        where: {
         is_show_homepage:true,
          publishedAt: {
            $notNull: true,
          },
        }
      },
      dataWhosWhoQuery:{
        where: {
            is_show_homepage:true,
             publishedAt: {
               $notNull: true,
             },
           }
      },

};
