'use strict';

const fn = require("./fn.js");

module.exports.main = (event, context, callback) => {
  console.log("----------Request-----------");
  console.log(event);
  console.log("-----------Logs-------------");      
  
  //performance check start
  fn.perfStart();

  //Set Callback function
  fn.init(callback)

  //Auto response - {"response_type": "in_channel"}
  const response = {
      //"response_type": "in_channel","ephemeral"
      "text": "It's 80 degrees right now.",
      "attachments": [
          {
              "text":"Partly cloudy today and tomorrow"
          }
      ]
  };

  //Call callback function
  fn.sexyback(response);
};
