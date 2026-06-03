const RestaurantService=require('./services');
const db=require('./database');

// for the GET API/menu
const getMenu=(req,res)=>{
  res.json({success: true,data: db.menuItems});
};
// for the post api for orders
const createOrder=(req,res)=>{
  try{
    const{tableId,items}=req.body;
    if(!tableId || !items || !items.length){
      return res.status(400).json({success: false, message: "Missing tableId or items."});
    }
    const order= RestaurantService.placeOrder(tableId,items);
    res.status(201).json({success: true, message: "Order placed successfully", data: order});
  }catch (error){
    res.status(400).json({success:false, message: error.message});
  }
};
// POST api/ reservations
const createReservation=(req,res)=>{
  try{ 
    const{ tableId,partySize,timeSlot}=req.body;
    if(!tableId||!partySize|| !timeSlot){
      return RestaurantService.status(400).json({success: false, message: "Missing required resesrvation fields"});
    }
    const reservation=RestaurantService.createReservation(tableId,partySize,timeSlot);
    res.status(201).json({success: true, message: "Reservation successful",data: reservation});
  }
  catch(error){
    res.status(400).json({success: false, message: error.message});
  }
  
};
module.exports={getMenu,createOrder,createReservation};