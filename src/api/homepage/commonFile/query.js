module.exports = {   
    
     dataServiceQuery:{
        where: {
         is_show_homepage:true,
          publishedAt: {
            $notNull: true,
          },
        },populate: true
      },
      dataWhosWhoQuery:{
        where: {
            is_show_homepage:true,
             publishedAt: {
               $notNull: true,
             },
           },populate: ['Background_Photo'],
            select: ['Title',"Name"], 
      },
      serviceCount:{
        where: {
             publishedAt: {
               $notNull: true,
             },
           }
      },

};
