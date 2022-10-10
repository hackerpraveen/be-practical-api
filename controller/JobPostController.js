const { response } = require("express");
const JobPost =    require("../model/JobPostModel");

const getAll=(req,res,next)=>{
    JobPost.find()
    .then(response=>{res.json(response)})
    .catch(error=>{res.json({message:'error'})})

}

const getById = (req,res,next)=>{
    JobPost.findOne({_id : req.body._id})
    .then(response=>{res.json(response)})
    .catch(error=>{res.json({message:'error'})})
}


const store = (req,res) =>{
    let jobPost = new JobPost({...req.body })
   
    jobPost.save()
    .then(response => {res.json({
        message : "Post added",
    })})
    .catch(error=>{
        console.log(error);
        res.json({
        message : "Post not added",
    })})
}

const  update = (req,res,next)=>{
    let id = req.body._id;
    let updateData = {...req.body}
    JobPost.updateOne({_id:id}, {$set: updateData})
    .then(response => {
        if(response){
        res.json({message : "updated Successful"})}
        else{
            res.json({message : "updated Unsuccessful"})
        }
    })
    .catch(error=>{res.json({message : "updated Unsuccessful"})})
}

const remove = (req,res,next) => {
    JobPost.deleteOne({_id : req.body._id})
    .then(() => {res.json({message : "deleted Successful"})})
    .catch(error=>{res.json({message : "deleted Unsuccessful"})})

}

const checkById = (req,res,next)=>{
    JobPost.findOne({_id : req.body._id})
    .then(response=>{
        if(response){
            res.json({message : "post Id already exists"})
        }
        else next()
        })
    .catch(error=>{next()})
}

module.exports = {getAll,getById,store, update, remove, checkById};