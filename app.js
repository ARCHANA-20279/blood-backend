const Express=require("express")
const Cors=require("cors")
const Mongoose=require("mongoose")
const Jsonwebtoken=require("jsonwebtoken")
const Bcrypt=require("bcrypt")


let app=Express()
app.get("/",(request,response)=>{
    response.send("hello")
}
)

app.listen(3030,()=>{

    console.log("server started")
})
