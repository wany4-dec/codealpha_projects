const express=require('express');
const router =express.Router();
const controllers=require('./controllers');

router.get('/menu',controllers.getMenu);
router.post('/orders',controllers.createOrder);
router.post('/reservations',controllers.createReservation);
module.exports=router;
