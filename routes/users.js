var express = require('express');
var router = express.Router();
var {dbUrl,mongodb,MongoClient} = require('../dbConfig')
var {mentorModel,studentModel,mongoose} = require ('../dbSchema');
var client = new MongoClient(dbUrl);
mongoose.connect(dbUrl)

//
router.get('/mentor', async (req, res,)=> {
  try {
    let users = await mentorModel.find()
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});

//Updating Mentor 
router.put('/mentor/:id', async function(req, res, next) {
  try{
      let req = await mentorModel.updateOne({ _id: mongodb.ObjectId(req.params.id) },req.body);
      res.send({
        statusCode:200,
        data:req
      })
  }
  catch(error){
    res.send({
      statusCode:500,
      message:"Interal error"
    })
  }
});

//Adding Mentor 
router.post('/add-mentor',async (req,res)=>{
  try {
    let users = await mentorModel.create(req.body);
    res.send({
      statusCode:200,
      message:"Mentor created Successfully!",
      users
    })
  } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
  }
})

//Deleting Mentor 
router.delete('/mentor/:id', async function(req, res, next) {
  try{
      let req = await mentorModel.deleteOne({ _id: mongodb.ObjectId(req.params.id) });
      res.send({
        statusCode:200,
        data:req
      })
  }
  catch(error){
    res.send({
      statusCode:500,
      message:error
    })
  }
});

//Getting the list of unassigned students
router.get('/unassigned-Stu', async (req, res,)=> {

  try {
    let users = await studentModel.find({mentor_id:{$eq:null}}).exec()
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});

//Adding students
router.post('/add-student',async (req,res)=>{
  try {
    let users = await studentModel.create(req.body);
    res.send({
      statusCode:200,
      message:"Student created Successfully!",
      users
    })
  } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
  }
})


//All student details
router.get('/students', async (req, res,)=> {
  try {
    let users = await studentModel.find()
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});


//Updating Student details
router.put('/student/:id', async function(req, res, next) {
  try{
      let req = await studentModel.updateOne({ _id: mongodb.ObjectId(req.params.id) },req.body);
      res.send({
        statusCode:200,
        data:req
      })
  }
  catch(error){
    res.send({
      statusCode:500,
      message:error
    })
  }
});

//Deleting Student
router.delete('/student/:id', async function(req, res, next) {
  try{
      let req = await studentModel.deleteOne({ _id: mongodb.ObjectId(req.params.id) });
      res.send({
        statusCode:200,
        data:req
      })
  }
  catch(error){
    res.send({
      statusCode:500,
      message:error
    })
  }
});


router.post('/assign-MulMen/:id',async (req,res)=>{
  try {
    var data = [];
    var temp = [];
    temp = JSON.parse(req.body.temp);
    temp.forEach(val =>{
      data.push(mongodb.ObjectId(val))
    })
    console.log(data)
    let users = await studentModel.updateMany({"_id":{$in:data}},{$set:{"mentor_id":req.params.id}})
    let getUpdated = await studentModel.find().exec()
    res.send({
      statusCode:200,
      message:"Student Assigned Successfully!",
      getUpdated
    })
  } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
  }
})

module.exports = router;
