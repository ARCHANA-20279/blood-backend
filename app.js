const Express=require("express")
const Cors=require("cors")
const Mongoose=require("mongoose")
const Jsonwebtoken=require("jsonwebtoken")
const Bcrypt=require("bcrypt")
const userModel=require("./models/users")


let app=Express()
app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb://archana:archana@ac-58g5bmi-shard-00-00.5ys18b0.mongodb.net:27017,ac-58g5bmi-shard-00-01.5ys18b0.mongodb.net:27017,ac-58g5bmi-shard-00-02.5ys18b0.mongodb.net:27017/blogAppDb?ssl=true&replicaSet=atlas-cngkhq-shard-0&authSource=admin&appName=Cluster0://")


app.post("/signup",async(request,response)=>{
    let input=request.body
    let hashedPassword=Bcrypt.hashSync(request.body.password,10)
    console.log(hashedPassword)
    request.body.password=hashedPassword
  
    userModel.find({email:request.body.email}).then(

        (items)=>{
    
  

    if (items.length>0){
        response.json({"status":"user already exists"})
    } else {
           let result = new userModel(input)
           
           result.save()
           response.json({"status":"success"})


  }}).catch((error)=>{}
  )
})




app.listen(3030,()=>{

    console.log("server started")
})
