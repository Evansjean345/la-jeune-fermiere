const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  articles: [
    {
      article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
      quantity: { type: Number, required: true },
      
    },
  ],
  totalPrice: { type: Number, required: true },
  delivery: {
    type: Boolean,
    required: true,  // True if delivery is selected
  },
  deliveryFee: { type: Number, default: 0 }, // Delivery fee if applicable
  deliveryLocation: { 
    type: String, 
    },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ['new','pending', 'processing', 'completed', 'canceled'],
    default: 'new',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
