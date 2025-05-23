require('dotenv').config();
const express = require("express");
const app = express();
const dbconnect = require("./utils/Database");
const cors = require('cors');
const adminRoute = require("./route/AdminRoute");
const productroute = require("./route/ProductRoute");
const popularroute = require("./route/PopularRoute");
const messageroute = require("./route/MessageRoute");
const customerroute=require('./route/CustomerRoute');
const cartroute=require("./route/CartRoute");
const checkOutRoute=require("./route/CheckOutRoute");
const orderRoute=require("./route/OrderRoute");
const billRoute=require("./route/BillRoute");
app.use(express.json());
app.use(cors());
app.use('/public/uploads', express.static('public/uploads'));
app.use('/api/admin', adminRoute);
app.use('/api/product', productroute);
app.use('/api/popular', popularroute);
app.use('/api/message', messageroute);
app.use('/api/customer',customerroute);
app.use('/api/cart',cartroute);
app.use('/api/checkout',checkOutRoute);
app.use('/api/order',orderRoute);
app.use('/api/bill',billRoute);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running in ${port}`);
})