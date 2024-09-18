// Cart.js
import React, { useState } from 'react';
import Footer from './Footer';
import { createOrderUrl } from '../../url';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Header from './Header';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { useCart } from '../../context/CartContext';  // Import du contexte
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    customerInfo,
    setCustomerInfo,
    delivery,
    setDelivery,
    calculateTotal,
    updateCartItemQuantity,
    removeFromCart
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const [error, setError] = useState(null);

  // Gestion du changement des informations du client
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  // Gestion de la soumission de la commande
  const handleSubmitOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const articles = cart.map((item) => ({
        article: item._id,
        quantity: item.quantity,
      }));
      const customer = {
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email
      };
      const deliveryLocation = customerInfo.deliveryLocation;

      const response = await axios.post(createOrderUrl, {
        articles,
        customer,
        delivery,
        deliveryLocation
      });

      if (response.status === 201) {
        setLoading(false);
        setAlert({ open: true, message: 'Commande créée avec succès!', severity: 'success' });
      }
    } catch (error) {
      setLoading(false);
      setAlert({ open: true, message: 'Erreur lors de la création de la commande.', severity: 'error' });
      setError('Impossible de créer la commande. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <section className="section-breadcrumb margin-b-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row bb-breadcrumb-inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="bb-breadcrumb-title">Cart</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  <ul className="bb-breadcrumb-list">
                    <li className="bb-breadcrumb-item">
                      <Link to={"/"}>Accueil</Link>
                    </li>
                    <li>
                      <i className="ri-arrow-right-double-fill" />
                    </li>
                    <li className="bb-breadcrumb-item active">Cart</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart */}
      <section className="section-cart padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">
            <div className="col-lg-8 mb-24">
              <div className="bb-cart-table" data-aos="fade-up" data-aos-duration={1000} data-aos-delay={400}>
                {cart.length === 0 ? (
                  <p>Votre panier est vide</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="Product-cart">
                              <img src={item.imagesUrls[0]} alt="product" />
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="price">{item.pricePerKilo} FCFA/kg</span>
                          </td>
                          <td>
                            <div className="qty-plus-minus">
                              <input
                                className="qty-input"
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => updateCartItemQuantity(index, e.target.value)}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="price">{item.pricePerKilo * item.quantity} FCFA</span>
                          </td>
                          <td>
                            <div className="pro-remove">
                              <button onClick={() => removeFromCart(index)}>
                                <MdDeleteForever />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Formulaire pour les informations du commanditaire */}
            <div className="col-lg-4 mb-24">
              <div className="bb-cart-sidebar-block">
                <div className="bb-sb-title">
                  <h3>Informations du Client</h3>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Nom :</label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone :</label>
                    <input
                      type="text"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      className="form-control"
                      required
                    />
                  </div>
                  {delivery ? (
                    <div className="form-group">
                      <label htmlFor="deliveryLocation">Lieu de livraison :</label>
                      <input
                        type="text"
                        name="deliveryLocation"
                        value={customerInfo.deliveryLocation}
                        onChange={handleCustomerInfoChange}
                        className="form-control"
                        required
                      />
                    </div>
                  ) : ("")
                  }

                </form>
              </div>

              <div className="bb-cart-sidebar-block">
                <div className="bb-sb-title">
                  <h3>Summary</h3>
                </div>
                <div className="bb-cart-summary">
                  <div className="inner-summary">
                    <ul>
                      <li>
                        <span className="text-left">Sous-total</span>
                        <span className="text-right">{calculateTotal()} FCFA</span>
                      </li>
                      <li className=' '>
                        <div className='flex justify-between'>
                          <label className='w-4/5 text-left' htmlFor="">Livraison (2000 FCFA)</label>
                          <input
                            className='w-[15%] '
                            type="checkbox"
                            checked={delivery}
                            onChange={(e) => setDelivery(e.target.checked)}
                          />
                        </div>
                        {/* <label>
                          <input
                            type="checkbox"
                            checked={delivery}
                            onChange={(e) => setDelivery(e.target.checked)}
                          />
                          Livraison (2000 FCFA)
                        </label> */}
                      </li>
                    </ul>
                  </div>
                  <div className="summary-total">
                    <ul>
                      <li>
                        <span className="text-left">Montant total</span>
                        <span className="text-right">{calculateTotal()} FCFA</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bouton pour valider la commande */}
              <button
                onClick={handleSubmitOrder}
                className="bb-btn-2 check-btn"
                disabled={cart.length === 0 || loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Commander'}
              </button>

              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <Snackbar  anchorOrigin={{ vertical:"top", horizontal:"center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
