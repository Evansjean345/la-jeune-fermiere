const express = require('express');
const { createOrder, updateOrderStatus,getOrders} = require('../controllers/orderController');
const router = express.Router();

router.post('/createOrder', createOrder);
router.put('/updateOrder/status/:id', updateOrderStatus);
router.get('/getOrder', getOrders);

module.exports = router;
