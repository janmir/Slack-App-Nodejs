'use strict';

const now = require("performance-now");

const DEPLOY = process.env.DEPLOY === "true" || false;
const DEBUG = process.env.DEBUG === "true" || false;

//Master Function
const fn = {
  callback: null,
  data: {
    performance:{
      start: 0,
      end: 0,
      execution: 0
    }
  },
  init: (callback)=>{
    fn.callback = callback;  
  },
  sexyback: (response) => {
    if(fn.callback !== null){
      console.log("---------Response-----------");            
      
      //add performance
      response.execution = fn.perfEnd();

      //Log only in deploy stage
      if(DEPLOY){
        console.log(response);      
      }

      fn.callback(null, response);
    }else{
      console.log("Error: Callback is Null.")
    }
  },
  log: (str)=>{
    if(DEBUG){
      console.log(str);
    }
  },
  perfStart:() => {
    fn.data.performance.start = now();
  },
  perfEnd:() => {
    fn.data.performance.end = now();
    fn.data.performance.execution = parseFloat((fn.data.performance.end - fn.data.performance.start).toFixed(2));

    return fn.data.performance.execution;
  },
}

module.exports.main = (event, context, callback) => {
  console.log("----------Request-----------");
  console.log(event);
  console.log("-----------Logs-------------");      
  
  //performance check start
  fn.perfStart();

  //Set Callback function
  fn.init(callback)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  fn.sexyback(response);
};
