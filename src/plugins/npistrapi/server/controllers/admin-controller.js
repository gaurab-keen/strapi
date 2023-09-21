'use strict';

// const { Strapi } = require("@strapi/icons");

module.exports = ({strapi})=>({
  async getAdminUser(ctx) { 
    const id1= ctx.state.user.id
   
    try {
      const data = await strapi.plugin("npistrapi").service("myAdmin").getData(id1)
     // console.log("testttttttttttttttttt 000o0o0o011111111 "+data)
      ctx.send(data);
    } catch (err) {
      console.log("testttttttttttttttttt 000o0o0o0 "+err)
      ctx.throw(500, err);
    }

  

  // // const entries = await strapi.db.query('admin::user')
  // const entries = await strapi.db.query('admin::user')
  // .findOne({ where: { id }, populate: ['role'] });
  // if(entries!=null)
  //  return entries;
  // // else
  // // ctx.send("Some thing wrong");
  // return 'no data found';
},

})
