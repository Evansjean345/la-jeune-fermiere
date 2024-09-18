const Order = require('../models/orderModel');
const Article = require('../models/articleModel');
const sendOrderConfirmation = require('../services/email');
// Create order
exports.createOrder = async (req, res) => {
  const { articles, customer, delivery, deliveryLocation } = req.body;
  console.log(articles);
  try {
    let totalPrice = 0;
    const deliveryFee = delivery ? 2000 : 0; // Example fee

    for (const item of articles) {
      const article = await Article.findById(item.article);
      if (!article) return res.status(404).json({ message: 'Article not found' });
      totalPrice += article.pricePerKilo * item.quantity;
    }

    totalPrice += deliveryFee;

    const newOrder = new Order({
      articles,
      totalPrice,
      delivery,
      deliveryFee,
      deliveryLocation,
      customer,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    order.status = status;
    await order.save();
    sendOrderConfirmation(order.customer.email,order);
    res.status(200).json({ message: 'Statut de la commande mis à jour', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('articles.article');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
