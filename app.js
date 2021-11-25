
const express = require("express")
const { appendFile } = require("fs")
const  mongoose = require("mongoose")




const connect = ()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017")
}

const movieSchema = new mongoose.Schema({
    movie_name :{ type:String , required:true },
    movie_genre :{ type:String , required:true },
    production_year :{ type:String , required:true },
    budget :{ type:Number , required:true  },
    
},{
    versionKey:false,
    timestamps:true ,
})

const Movie= mongoose.model("movie" , movieSchema)

const app = express()

app.use(express.json())

app.post("/users", async(req,res)=>{
    try{
    const user = await Movie.create(req.body)
    res.status(201).send(user)
    }catch(e){
        return res.send(500).json({message:e.message, status: "failed"})
    }
})

app.get("/users",async(req,res)=>{
    try{
     const user = await Movie.find().lean().exec()
   return  res.send({user})
    }catch(e){
        return res.send(500).json({message:e.message,status: "failed"})
    }
})

app.get("/" ,async(req,res)=>{
    try{
      const user = await Movie.find({"email":"achal@123"}).lean().exec()
      return res.send({user})
    }catch(e){
        return res.send(500).json({message:e.message,status: "failed"})
    }
})

app.get("/users/:id", async(req,res)=>{
    try{
      const user = await Movie.findById(req.params.id ).lean().exec() 
      return res.send({user})
    }catch(e){
         return res.status(500).json({message:e.message, status:"failed"})
    }
})

app.patch("/users/:id",async(req,res)=>{
      try{
            const user = await Movie.findByIdAndUpdate(req.params.id , req.body ,{new :true })
            return res.status(201).send(user)
      }catch{
          return res.status(500).json({message:e.message , status: "failed"})
      }
})

app.delete("/users/:id",async(req,res)=>{
    try{
         const user = await Movie.findByIdAndDelete(req.params.id).lean().exec()
         return res.status(200).send(user)
    }catch(e){
        return res.status(500).json({message:e.message , status:"failed"})
    }
})

app.listen(2345, async(req,res)=>{
    await connect()
    console.log("listing on port 2345")
})
