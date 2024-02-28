// npm run dev
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import nodemailer from 'nodemailer';
const port=3500;
const app=express()
app.use(cors());
app.use(express.json())
app.listen(port,()=>console.log(`Server is Running on the port : ${port}`));
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
const userModel1=mongoose.model("users",schemaModel1);
const userModel2=mongoose.model("buslists",schemaModel2);
const userModel3=mongoose.model("bookings",schemaModel3);
let useremail=null;
//signin
app.post("/SignIn", async (req, res) => {
    try {
      const { email, password } = req.body;
      if(email === "krhv2024@gmail.com" && password === "krhv@2024")
       return res.json({ success: true, message: "Welcome Admin 👨🏻‍💻" ,redirectToAdmin:true});
      else{
          const user = await userModel1.findOne({ email });
          if (!user) {
            return res.json({ success: false, message: "User not found. Please Register first." });
          }
          else{
            if (user.password === password) {
              useremail=email;
            return res.json({ success: true, message: "Login Successful 👍🏻 , Welcome "+user.username });
          } else {
            return res.json({ success: false, message: "Incorrect password , please try again" });
          }
      }
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  });
  
//signup
app.post("/SignUp", async (req, res) => {
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
  //storedata
app.post("/storeData", async (req, res) => {
  try {
    const requestData = req.body;

    // If only one seat is selected, requestData will be an object, so we convert it to an array
    const passengerDataArray = Array.isArray(requestData) ? requestData : [requestData];

    // Iterate over each selected seat's passenger data and store it
    const responses = await Promise.all(passengerDataArray.map(async (passenger) => {
      const data = new userModel3(passenger);
      return await data.save();
    }));
    const allSuccess = responses.every((response) => response);
    if (allSuccess) {
      res.json({ success: true, message: "Tickets were successfully booked" });
      await Promise.all(passengerDataArray.map(async (passenger) => {
        await sendBookingEmail(passenger);
      }));
    } else {
      res.status(500).json({ success: false, message: "Some tickets were not booked" });
    }
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ success: false, message: "An error occurred while storing data" });
  }
});
//search  bus
app.get("/searchBus",(req,res)=>{
  userModel2.find().then((user)=>res.json(user)).catch((err)=>res.json(err));
})
//passengerHistory
app.get("/passengerHistory",(req,res)=>{
  userModel3.find().then((user)=>res.json(user)).catch((err)=>res.json(err));
})
// create transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // Your Gmail email address
    pass: '' // Your Gmail password
  }
});
// send booking email
async function sendBookingEmail(passenger) {
  try {
    const mailOptions = {
      from: '',//your email
      to:useremail, // user email
      subject: 'Booking Confirmation',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
            body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #FFF6E9;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
          }
          h1 {
            background-color: aqua;
            text-align: center;
          }
          .booking-details {
            margin-top: 20px;
          }
          p {
            margin-bottom: 8px;
          }
          strong {
            font-weight: bold;
          }
          .booking-details p:last-child {
            margin-bottom: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            border: 2px solid black;
          }
          th, td,tr {
            padding: 8px;
            text-align: left;
            border: 1px solid black;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>BOOKING DETAILS</h1>
          <div class="booking-details">
            <table>
              <tr>
                <td><strong>Name</strong></td>
                <td>${passenger.name}</td>
              </tr>
              <tr>
                <td><strong>Age</strong></td>
                <td>${passenger.age}</td>
              </tr>
              <tr>
                <td><strong>Phone No</strong></td>
                <td>${passenger.phoneno}</td>
              </tr>
              <tr>
                <td><strong>Gender</strong></td>
                <td>${passenger.gender}</td>
              </tr>
              <tr>
                <td><strong>Category</strong></td>
                <td>${passenger.category}</td>
              </tr>
              <tr>
                <td><strong>Seat No</strong></td>
                <td>${passenger.seatNo}</td>
              </tr>
              <tr>
                <td><strong>Trip Code</strong></td>
                <td>${passenger.tripcode}</td>
              </tr>
              <tr>
                <td><strong>Class Service</strong></td>
                <td>${passenger.classService}</td>
              </tr>
              <tr>
                <td><strong>Via Route</strong></td>
                <td>${passenger.viaRoute}</td>
              </tr>
              <tr>
                <td><strong>Route No</strong></td>
                <td>${passenger.routeNo}</td>
              </tr>
              <tr>
                <td><strong>Departure Time</strong></td>
                <td>${passenger.deptTime}</td>
              </tr>
              <tr>
                <td><strong>Service Point</strong></td>
                <td>${passenger.servicePoint}</td>
              </tr>
              <tr>
                <td><strong>Destination</strong></td>
                <td>${passenger.destination}</td>
              </tr>
              <tr>
                <td><strong>Adult Fare</strong></td>
                <td>${passenger.adultFare}</td>
              </tr>
              <tr>
                <td><strong>Child Fare</strong></td>
                <td>${passenger.childFare}</td>
              </tr>
              <tr>
                <td><strong>Selected Date Time</strong></td>
                <td>${passenger.selectedDatetime}</td>
              </tr>
            </table>
          </div>
        </div>
      </body>
      </html>
           
      `
    };
    console.log(mailOptions);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
