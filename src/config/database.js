require("dotenv").config();

module.exports = {
  url: process.env.DATABASE_URL,
  config: {
    dialect: "mysql",
    define: {
      timestamp: true,
      underscored: true,
    },
  },

  // host: "localhost",
  // username:"root",
  // password:"bcd127",
  // database:"senai_overflow",
  // dialect:"mysql",
  // define:{
  //     timestamp:true,
  //     underscored:true
  // }
};
