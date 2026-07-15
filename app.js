const Express=require("express")
const Cors=require("cors")
const Mongoose=require("mongoose")
const Jsonwebtoken=require("jsonwebtoken")
const Bcrypt=require("bcrypt")
const userModel=require("./models/users")
const postModel = require("./models/posts")


let app=Express()
app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb://archana:archana@ac-58g5bmi-shard-00-00.5ys18b0.mongodb.net:27017,ac-58g5bmi-shard-00-01.5ys18b0.mongodb.net:27017,ac-58g5bmi-shard-00-02.5ys18b0.mongodb.net:27017/blogAppDb?ssl=true&replicaSet=atlas-cngkhq-shard-0&authSource=admin&appName=Cluster0://")

app.post("/create",async(request,response)=>{
    let input=request.body

    let token=request.headers.token
    Jsonwebtoken.verify(token,"blogApp",async(error,decoded)=>{
if(decoded && decoded.email){  
let result=new postModel(input)
await result.save()
response.json({"status":"success"})


    }else{


        response.json({"status":"invalid token"})
    }})

})
app.post("/viewmypost",async(request,response)=>{
let input=request.body
let token=request.headers.token
Jsonwebtoken.verify(token,"blogApp",async(error,decoded)=>{
    if(decoded && decoded.email){  
       postModel.find().then(

        (items)=>{

            response.json({"status":"success","data":items})
        }
       ).catch((error)=>{
            response.json({"status":"error"})
        


})
    }else{

        response.json({"status":"invalid token"})
    }
})})







app.post("/viewall",async(request,response)=>{

let token=request.headers.token
Jsonwebtoken.verify(token,"blogApp",async(error,decoded)=>{
    if(decoded && decoded.email){  
       postModel.find().then(

        (items)=>{

            response.json({"status":"success","data":items})
        }
       ).catch((error)=>{
            response.json({"status":"error"})
        


})
    }else{

        response.json({"status":"invalid token"})
    }
})})











app.post("/signin",async(request,response)=>{

    let input=request.body
    let result=userModel.find({email:request.body.email}).then((items)=>{

if (items.length>0){
const PasswordValiator=Bcrypt.compareSync(request.body.password,items[0].password)

if (PasswordValiator){



    Jsonwebtoken.sign({email:request.body.email},"blogApp",{expiresIn:"1d"},(error,token)=>{
        if (error){
            response.json({"status":"error generating token"})
        } else {
            response.json({"status":"success","token":token,"userId":items[0]._id})
        }
    })
}else{
    response.json({"status":"invalid password"})
    
    
}
}
else{
    response.json({"status":"user not found"})
}
    }
).catch((error)=>{})
})

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
