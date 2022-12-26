const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer= require("nodemailer")
const cors =require("cors")



const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://jay-bhavsar-18:bs9A11uf7wD3Komk@cluster0.3szpz.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);




// const msg={
//   from:"jaybhavsr278@gmail.com",
//   to:"jaybhavsar278@gmail.com",
//   subject:"Testing Out first Sender"
// }

// nodemailer.createTransport({
// //   service:"gmail",
//   auth:{    
//       user:"jayjigneshbhavsar.cse24@jecrc.ac.in",
//       pass:"tnuvqnkyatrfwbzb"
//   },
//   port:465,
//   host:"smtp.gmail.com"
// })
// .sendMail(msg,(err)=>{
//   if(err){
//       return console.log("Error Occurs",err)
//   }else{
//       return console.log("Email has been send Successfully")
//   }
// })

// making Schema in the data base

const productSchema = new mongoose.Schema({
  name: String,
  hobbies: String,
  email: String,
  phone: Number,
});

const Product = new mongoose.model("Product", productSchema);

// make product

app.post("/api/v1/product/new", async (req, res) => {
  const product = await Product.create(req.body);

 

  res.status(201).json({
    success: true,
    product,
  });
});

// Read Product api

// app.get("/api/v1/products", async (req, res) => {
//   const products = await Product.find({});

//   res.status(200).json({
//     success: true,
//     products,
//   });
// });


app.get("/api", (req, res) => {

  Product.find({})
      .then((data) => {
          console.log('Data', data);
          res.json(data);
      })
      .catch((error) => {
          console.log('error:')
      });


})

app.post("/api/v1/update_products", async (req, res) => {
  const products = await Product.updateOne({
    _id:req.body._id
  },
  {$set:{
    name:req.body.name,
    des:req.body.des,
    price:req.body.price
  }});
  

  console.log(products)
  if(products.modifiedCount==1){
  res.status(200).json({
    success: true,
    msg:"done",
  });}
});

app.post("/api/v1/delete/:id", async (req, res) => {
  const products = await Product.deleteOne({
    _id:req.body._id
  });
  

  console.log(products)
  if(products){
  res.status(200).json({
    success: true,
    msg:"deleted",
  });}
});


app.listen(4000, () => {
  console.log("server is working");
});
