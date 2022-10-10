const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let data = new Schema(
  {

    jobTitle: {
      type: String,
    },
    jobDesc: {
        type: String,
      },
      desiredSkills: {
      type: String,
    },

    // experience: {
    //   type: String,
    // },
    // education: {
    //   type: String,
    // },

    // jobDuties: {
    //   type: String,
    // },
    // jobSpecification: {
    //   type: String,
    // },
    // jobSalary: {
    //   type: String,
    // },

    // jobCategory : {
    //     type: String,
    // },
  
  },
  { timestamps: true },
  { collection: "job-post" }
);
const JobPost = mongoose.model("JobPost", data)
module.exports = JobPost;