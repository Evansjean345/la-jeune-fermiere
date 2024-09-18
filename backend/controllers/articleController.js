const Article = require('../models/articleModel');
const cloudinary = require('../services/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration de Multer pour stocker les images directement sur Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'articles', // Le nom du dossier dans Cloudinary
    format: async (req, file) => 'jpg', // Format des images (par défaut 'jpg')
    public_id: (req, file) => Date.now(), // Renomme les fichiers avec un timestamp
  },
});

// Middleware Multer pour gérer plusieurs images (2 maximum)
const upload = multer({ storage: storage }).array('images', 2); // 2 images max

// Créer un article avec upload des images sur Cloudinary
exports.createArticle = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors du téléchargement des images' });
    }

    const { name, type, pricePerKilo } = req.body;
    const imageUrls = req.files ? req.files.map(file => file.path) : []; // URLs Cloudinary des images

    try {
      const newArticle = new Article({
        name,
        type,
        pricePerKilo,
        imageUrls,  // URLs des images sur Cloudinary
      });
      await newArticle.save();
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

// Mise à jour d'un article avec upload des images sur Cloudinary
exports.updateArticle = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors du téléchargement des images' });
    }

    const { id } = req.params;
    const { name, type, pricePerKilo } = req.body;
    const imageUrls = req.files ? req.files.map(file => file.path) : []; // URLs des nouvelles images

    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        { name, type, pricePerKilo, $push: { imageUrls: { $each: imageUrls } } },  // Ajouter les nouvelles images
        { new: true }
      );
      if (!updatedArticle) return res.status(404).json({ message: 'Article non trouvé' });
      res.json(updatedArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

// Récupérer tous les articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    if (!articles.length) {
      return res.status(404).json({ message: 'Aucun article trouvé ' });
    }
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.status(200).json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
