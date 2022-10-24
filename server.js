const express = require("express");
const fileupload = require("express-fileupload");
var nodemailer = require('nodemailer');
const ApplyJob =    require("./model/ApplyJob");



const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const app = express();

const JobPost = require("./route/JobPostRoute");

const user= {name:"admin@bepractical",
value:"$2b$10$419pH2dsOrEdJryyVfjZvONOeCG4Le.hf91oBx7r5lbQ7MitpIpfK"}
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true, parameterLimit:50000 }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit:'50mb',extended: true}))
app.use("/api/job-post", JobPost);
app.post("/apply-post", (req, res) => {
  // const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;
  console.log(file,"req");


})
app.get("/apply-post/getAll",(req,res,next)=>{
  ApplyJob.find()
  .then(response=>{res.json(response)})
  .catch(error=>{res.json({message:'error'})})

})
app.post("/apply-post/getByJob",(req,res,next)=>{
  ApplyJob.find().where('jobId').in(req.body._id).then(response=>{res.json(response)})
  .catch(error=>{res.json({message:'error'})})
})

app.post("/apply-post/insert",(req,res) =>{
  let jobPost = new ApplyJob({...JSON.parse(req.body.data),file:req.files.file.data })
 
  jobPost.save()
  .then(response => {res.json({
      message : "Post added",
  })})
  .catch(error=>{
      console.log(error);
      res.json({
      message : "Post not added",
  })})
})
app.post("/apply-post/delete",(req,res,next)=>{
  ApplyJob.deleteOne({_id : req.body._id})
  .then(() => {res.json({message : "deleted Successful"})})
  .catch(error=>{res.json({message : "deleted Unsuccessful"})})

})
app.post("/login", (request, res) => {
  bcrypt.compare(request.body.password, user.value).then((passwordCheck) => {

    // check if password matches
    if(request.body.email!=user.name){
      return res.status(400).send({
        message: "UserName does not found"
      });

    }
    else{
    if(!passwordCheck) {
      return res.status(400).send({
        message: "Passwords does not match"
      });
    }else{
     
        const token = jwt.sign(
          {
            userEmail: request.body.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );
        res.status(200).send({
          message: "Login Successful",
          email: request.body.email,
          token,
        });

      }
     
    }
  })

});


mongoose.Promise = global.Promise;
const url = `mongodb+srv://admin:admin@cluster0.zxs4hsx.mongodb.net/?retryWrites=true&w=majority`;


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true }

mongoose.connect(url, connectionParams).then(
  () => {
    console.log("Database Connected Successful");
  },
  (err) => {
    console.log("Database not Connected : ", err);
  }
);



const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log("Server is running on :", port);
});