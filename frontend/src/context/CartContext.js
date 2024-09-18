// CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Créez un contexte pour le panier
const CartContext = createContext();

// Hook personnalisé pour utiliser le contexte du panier facilement
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryLocation: ''
  });
  const [delivery, setDelivery] = useState(false);

  // Calculer le total des articles
  const calculateTotal = () => {
    let total = cart.reduce((total, item) => total + item.pricePerKilo * item.quantity, 0);
    if (delivery) {
      total += 2000; // Exemple : 2000 FCFA pour la livraison
    }
    return total;
  };

  // Ajouter un article au panier
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Mettre à jour la quantité d'un article
  const updateCartItemQuantity = (index, quantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = quantity;
      return updatedCart;
    });
  };

  // Supprimer un article du panier
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        customerInfo,
        setCustomerInfo,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        delivery,
        setDelivery,
        calculateTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
