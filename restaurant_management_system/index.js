const express=require('express');
const apiRoutes=require('./routes');

const app=express();
const PORT=3000;
// THE FOLLING ARE MIDDLEWARE TO PARSE json PAYLOADS
app.use(express.json());
//mount the backend domain API routes
app.use('/api',apiRoutes);
//this catches all route fallback
app.use((req,res)=>{
  res.status(404).json({success: false, message: "Endpoint configuration not found."});
});
app.listen(PORT,()=>{
  console.log('=======================');
  console.log(`Restaurant Management System running on Port ${PORT}`);
  console.log('=======================');
});