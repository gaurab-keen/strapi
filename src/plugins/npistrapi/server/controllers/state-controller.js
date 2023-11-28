'use strict';

module.exports = ({strapi})=>({
  async getStateData(ctx) { 
   
    try {
      const data = await strapi.plugin("npistrapi").service("myState").getData()
      ctx.send(data);
    } catch (err) {
      console.log("error >>>>>>>>"+err);
      ctx.throw(500, err);
    }
},
})
