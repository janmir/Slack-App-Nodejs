const now = require("performance-now");
const DEPLOY = process.env.DEPLOY === "true" || false;
const DEBUG = process.env.DEBUG === "true" || false;

var callback = null;
var data = {
  performance:{
    start: 0,
    end: 0,
    execution: 0
  }
};

// export the module
module.exports = {
    init: (_callback)=>{
      callback = _callback;  
    },
    perfStart:() => {
      data.performance.start = now();
    },
    perfEnd:() => {
      data.performance.end = now();
      data.performance.execution = parseFloat((data.performance.end - data.performance.start).toFixed(2));
  
      return data.performance.execution;
    },
    log: (str)=>{
      if(DEBUG){
        console.log(str);
      }
    },
    sexyback: (response) => {
      if(callback !== null){
        console.log("---------Response-----------");            
        
        //add performance
        response.execution = module.exports.perfEnd();
  
        //Log only in deploy stage
        if(DEPLOY){
          console.log(response);      
        }
  
        response = JSON.stringify(response);
        callback(null, response);
      }else{
        console.log("Error: Callback is Null.")
      }
    },
};