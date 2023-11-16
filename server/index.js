// npm run dev
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const port=3500;
const app=express()
app.use(cors())
app.use(express.json())
app.listen(port,()=>console.log(`Server is Running on the port : ${port}`));
// mongoose.connect("mongodb+srv://kalirishik:Kali%402003@kali.mstnhxl.mongodb.net/project")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>console.log("Connected to database"))
.catch(()=>console.log("Connection failed"))
const schemaModel1=mongoose.Schema({
    username:String,
    email:String,    
    password:String
},{
    timestamps:true
})
const schemaModel2=mongoose.Schema({
    tripcode:String,
    class:String,    
    via:String,
    routeNo:String,
    deptTime:String,
    servicePoint:String,
    destination:String,
    adultFare:String,
    childFare:String
},{
    timestamps:true
})
const schemaModel3=mongoose.Schema({
  name:String,
  age:String,
  phoneno:String,
  gender:String,
  category:String,
  seatNo:String,
  tripcode:String,
  classService:String,
  viaRoute:String,
  routeNo:String,
  deptTime:String,
  servicePoint:String,
  destination:String,
  adultFare:String,
  childFare:String,
  selectedDatetime:String
},{
    timestamps:true
})
const schemaModel4=mongoose.Schema({
  name:String,
  age:String,
  phoneno:String,
  gender:String,
  category:String,
  seatNo:String,
  tripcode:String,
  classService:String,
  deptTime:String,
  servicePoint:String,
  destination:String,
  adultFare:String,
  childFare:String,
  selectedDatetime:String
},{
    timestamps:true
})
const userModel1=mongoose.model("users",schemaModel1);
const userModel2=mongoose.model("buslists",schemaModel2);
const userModel3=mongoose.model("bookings",schemaModel3);
// const userModel4=mongoose.model("bookings",schemaModel4);
app.post("/display", async (req, res) => {
    try {
      const { email, password } = req.body;
      if(email === "krhv2023@gmail.com" && password === "krhv@2023")
       return res.json({ success: true, message: "Welcome Admin 👨🏻‍💻" ,redirectToAdmin:true});
      else{
          const user = await userModel1.findOne({ email });
          if (!user) {
            return res.json({ success: false, message: "User not found. Please Register first." });
          }
          else{
            if (user.password === password) {
            return res.json({ success: true, message: "Login Successful 👍🏻" });
          } else {
            return res.json({ success: false, message: "Incorrect password" });
          }
      }
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  });
  
// app.post("/create",async(req,res)=>{
//     const data=new userModel(req.body);
//     await data.save();
//     console.log(req.body)
//     res.json({success:true,message:"Registered Successfully"});
// })
app.post("/create", async (req, res) => {
    try {
      const { email} = req.body;
      // Check if the email already exists in the database
      const existingUser = await userModel1.findOne({ email});
      if(existingUser){
        return res.json({ success: false, message: "This Email is already in use" });
      }
      // If the email is not already in use, save the new user
      const newUser = new userModel1(req.body);
      await newUser.save();
      res.json({ success: true, message: "Registered Successfully 👍🏻" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  });
  app.post("/storeData",async(req,res)=>{
    try{
      const data=new userModel3(req.body);
      await data.save();
      res.json({ success: true, message: "Ticket was successfully booked. 👍🏻" });
    }catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  })
app.put("/update",async(req,res)=>{
    const {_id,...rest}=req.body;
    // const {_id,username}=req.body;
    // await userModel.updateOne({_id:req.body._id},{username:"gokulraj_v"}); 
//    {
//     "_id":"654383706ca41486897b9993"
//   }
//    const data= await userModel.updateOne({_id:_id},{username:username});
   const data= await userModel1.updateOne({_id:_id},rest);
   //{
    //     "_id":"654383706ca41486897b9993",
    //     "username":"gokul_raj"
    //   }
    res.send({success:true,message:"Data has been updated",data:data})
    console.log(req.body);
})
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    const data=await userModel1.deleteOne({_id:id});
    console.log(req.params.id);
    res.send({data:data});
})
//search  bus
app.get("/searchBus",(req,res)=>{
  userModel2.find().then((user)=>res.json(user)).catch((err)=>res.json(err));
})
app.get("/passengerHistory",(req,res)=>{
  userModel3.find().then((user)=>res.json(user)).catch((err)=>res.json(err));
})