const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let data = new Schema(
  {

    name: {
      type: String,
    },
    email: {
        type: String,
      },
      mobile: {
      type: String,
    },
    jobId: {
        type: String,
      },
      jobTitle:{
        type: String,

      },

    file:{
        type: Buffer,
    },
    fileType:{
        type:String,
    }


    
  
  },
  { timestamps: true },
  { collection: "apply-job" }
);
const ApplyJob = mongoose.model("ApplyJob", data)
module.exports = ApplyJob;