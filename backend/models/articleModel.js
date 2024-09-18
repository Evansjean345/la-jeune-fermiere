const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  pricePerKilo: { type: Number, required: true },
  imageUrls: [{ type: String }]  
});

module.exports = mongoose.model('Article', articleSchema);
