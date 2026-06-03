const menuItems=[
  {id: "1", name: "Gourmet Burger", price: 12.99, stockQuantity: 10},
  {id: "2", name: "Truffle Fries", price: 5.50, stockQuantity: 3},
  {id: "3", name: "Margherita Pizza", price: 14.00, stockQuantity: 15}

];

const tables = [
  {id: "101", tableNumber: 1, capacity: 2, status: "AVAILABLE"},
  {id: "102", tableNumber: 2, capacity: 4, status: "AVAILABLE"},
  {id: "102", tableNumber: 3, capacity: 6, status: "AVAILABLE"}

];
const orders =[];
const reservations=[];
module.exports={menuItems,tables,orders,reservations};