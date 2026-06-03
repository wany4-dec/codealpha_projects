const db=require('./database');
class RestaurantService{
  // process orders and update inventory automatically
  static placeOrder(tableId, orderItems){
    let totalAmount=0;
    const itemsToUpdate=[];
    //this validates items and checks stock availability
    for (const item of orderItems){
      const menuItem=db.menuItems.find(m=>m.id===item.menuItemId);
      if(!menuItem){
        throw new Error('Menu item with id ${item.menuItemId} not found.');
      }
      if(menuItem.stockQuantity<item.quantity){
        throw new Error('Insufficient stock for ${menuItem.name}. Only ${menuItem.stockQuantity} left.');
      }
      itemsToUpdate.push({menuItem,quantity:item.quantity});
      totalAmount+=menuItem.price*item.quantity;

    }
    // this automatically deducts inventory quantities safely
    itemsToUpdate.forEach(({menuItem,quantity})=>{menuItem.stockQuantity-=quantity});

    // here we create and save the order
    const newOrder={
      id: 'ORD-${Date.now()}',tableId, items: orderItems,totalAmount:parseFloat(totalAmount.toFixed(2)),status: 'PENDING', createdAt: new Date()

    };
    db.orders.push(newOrder);
    // this updates table status to occupied
    const table =db.tables.find(t=>t.id===tableId);
    if (table)table.status='OCCUPIED';
    return newOrder;
  }
  //this checks table availability
  static createReservation(tableId,partySize, timeSlot){
    const table=db.tables.find(t=>t.id===tableId);
    if(!table){
      throw new Error('Requested table does not exist.');
    }
    if(table.capacity<partySize){
      throw new Error('Table capacity (${table.capacity} is too small for ${partySize} people.');
    }
    // this checks if the table is already reserved for a specific timeslot
    const hasConflict=db.reservations.some(r=>r.tableId===tableId&&r.timeslot===timeSlot);
    if(hasConflict){
      throw new Error('This table is already reserved for the requested timeslot.');

    }
    const newReservation={
      id: 'RES-${Date.now()}',tableId,partySize,timeSlot,createdAt: new Date()
    };
    db.reservations.push(newReservation);
    return newReservation;
  }
}
module.exports=RestaurantService;