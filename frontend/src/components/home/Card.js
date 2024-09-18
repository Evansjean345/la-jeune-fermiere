import React, { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Box, Button, DialogActions, DialogContent, Dialog } from '@mui/material';
import { FaEye } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { useCart } from '../../context/CartContext'; // Importation du contexte pour gérer le panier

const Card = ({ imagesUrls, _id, name, type, pricePerKilo }) => {
  AOS.init();
  const { addToCart } = useCart();  // Utilisation du contexte pour ajouter des articles au panier

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);  // Quantité par défaut
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Ajouter l'article au panier avec Context API
  const handleAddToCart = () => {
    const newItem = { imagesUrls, _id, name, type, pricePerKilo, quantity };
    
    // Ajouter le produit au panier via le contexte
    addToCart(newItem);

    handleClose();  // Fermer le modal après l'ajout
    setAlert({ open: true, message: 'Article ajouté au panier avec succès!', severity: 'success' });
  };

  return (
    <>
      <div className="col-xl-3 col-md-4 col-6 mb-24 bb-product-box" data-aos="fade-up">
        <div className="bb-pro-box">
          <div className="bb-pro-img" >
            <div>
              <div className="inner-img">
                <img className="main-img product-img " src={imagesUrls[0]} alt="product-1" />
                {imagesUrls.length > 1 && (
                  <img className="hover-img product-img" src={imagesUrls[1]} alt="product-1" />
                )}
              </div>
            </div>
            <ul className="bb-pro-actions">
              <li className="bb-btn-group">
                <div title="Visionner" onClick={handleOpen}><FaEye className='text-slate-400 hover:text-slate-100' /></div>
              </li>
              <li className="bb-btn-group">
                <div title="Ajouter au panier" onClick={handleAddToCart}><MdAddShoppingCart className='text-slate-400 hover:text-slate-100' /></div>
              </li>
            </ul>
          </div>
          <div className="bb-pro-contact">
            <h4 className="bb-pro-title">{name}</h4>
            <div className="bb-price">
              <span className="new-price">{pricePerKilo} FCFA/kg</span>
              <div title="Visionner" onClick={handleOpen}><FaEye className='text-slate-400 hover:text-teal-400 text-3xl' /></div>
              <div title="Ajouter au panier" onClick={handleAddToCart}><MdAddShoppingCart className='text-slate-400 hover:text-teal-400 text-3xl' /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour sélectionner la quantité */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box>
            <h5>{name}</h5>
            <p>Type : {type}</p>
            <p>Prix : {pricePerKilo} FCFA/kg</p>
            <div className="bb-quickview-qty mt-20">
              <div className="qty-plus-minus">
                <input
                  className="w-full"
                  type="number"
                  name="bb-qtybtn"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="bb-quickview-cart">
                <button onClick={handleAddToCart} className="bb-btn-1">
                  <i className="ri-shopping-bag-line" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Fermer</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar pour afficher les alertes */}
      <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Card;
