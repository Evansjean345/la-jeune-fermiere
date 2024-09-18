import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import { useCart } from '../../context/CartContext';
const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categorieOpen, setCategorieOpen] = useState(false);
  const [isScroll, setisScroll] = useState(false);

  // Fonction qui vérifie le scroll de la fenêtre
  const verifyScroll = () => {
    if (window.scrollY > 10) {
      setisScroll(true);
    } else {
      setisScroll(false);
    }
  };

  // Utilisation de useEffect pour ajouter l'event listener lors du montage du composant
  useEffect(() => {
    // Ajouter l'event listener pour détecter le scroll
    window.addEventListener('scroll', verifyScroll);

    // Nettoyer l'event listener quand le composant se démonte
    return () => {
      window.removeEventListener('scroll', verifyScroll);
    };
  }, []);

  const handleSideCart = () => {
    setIsOpen(!isOpen);
  }

  const handlemobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  const handleCategorie = () => {
    setCategorieOpen(!categorieOpen);
  }

  // Récupérer le panier du localStorage ou d'un état global (si vous avez un contexte)
  const {
    cart,
    calculateTotal,
    updateCartItemQuantity,
    removeFromCart
  } = useCart();

  console.log(cart)

  return (
    <>
      {/* Header */}
      <header className="bb-header">
        <div className={isScroll? "bottom-header fixed top-0 w-full bg-white" : "bottom-header "}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="inner-bottom-header">
                  <div className="cols bb-logo-detail">
                    {/* Header Logo Start */}
                    <div className="header-logo">
                      <Link to={"/"}>
                        <img
                          src="/images/logoJF.png"
                          alt="logo"
                          className="light"
                        />
                        <img
                          src="/images/logoJF.png"
                          alt="logo"
                          className="dark"
                        />
                      </Link>
                    </div>
                    {/* Header Logo End */}
                    <div
                      onClick={handleCategorie}
                      className="bb-sidebar-toggle bb-category-toggle"
                    >
                      <svg
                        className="svg-icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z" />
                      </svg>
                    </div>
                  </div>

                  <div className="cols bb-icons">
                    <div className="bb-flex-justify">
                      <div className="bb-header-buttons">
                        <div
                          className="bb-header-btn bb-cart-toggle"
                          title="Cart"
                          onClick={handleSideCart}
                        >
                          <div className="header-icon">
                            <svg
                              className="svg-icon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M351.552 831.424c-35.328 0-63.968 28.64-63.968 63.968 0 35.328 28.64 63.968 63.968 63.968 35.328 0 63.968-28.64 63.968-63.968C415.52 860.064 386.88 831.424 351.552 831.424L351.552 831.424 351.552 831.424zM799.296 831.424c-35.328 0-63.968 28.64-63.968 63.968 0 35.328 28.64 63.968 63.968 63.968 35.328 0 63.968-28.64 63.968-63.968C863.264 860.064 834.624 831.424 799.296 831.424L799.296 831.424 799.296 831.424zM862.752 799.456 343.264 799.456c-46.08 0-86.592-36.448-92.224-83.008L196.8 334.592 165.92 156.128c-1.92-15.584-16.128-28.288-29.984-28.288L95.2 127.84c-17.664 0-32-14.336-32-31.968 0-17.664 14.336-32 32-32l40.736 0c46.656 0 87.616 36.448 93.28 83.008l30.784 177.792 54.464 383.488c1.792 14.848 15.232 27.36 28.768 27.36l519.488 0c17.696 0 32 14.304 32 31.968S880.416 799.456 862.752 799.456L862.752 799.456zM383.232 671.52c-16.608 0-30.624-12.8-31.872-29.632-1.312-17.632 11.936-32.928 29.504-34.208l433.856-31.968c15.936-0.096 29.344-12.608 31.104-26.816l50.368-288.224c1.28-10.752-1.696-22.528-8.128-29.792-4.128-4.672-9.312-7.04-15.36-7.04L319.04 223.84c-17.664 0-32-14.336-32-31.968 0-17.664 14.336-31.968 32-31.968l553.728 0c24.448 0 46.88 10.144 63.232 28.608 18.688 21.088 27.264 50.784 23.52 81.568l-50.4 288.256c-5.44 44.832-45.92 81.28-92 81.28L385.6 671.424C384.8 671.488 384 671.52 383.232 671.52L383.232 671.52zM383.232 671.52" />
                            </svg>
                            <span className="main-label-note-new" />
                          </div>
                          <div className="bb-btn-desc">
                            <span className="bb-btn-title">
                              <b className="bb-cart-count">{cart.length}</b> articles
                            </span>
                            <span className="bb-btn-stitle">Panier</span>
                          </div>
                        </div>
                        <div className="bb-toggle-menu" onClick={handlemobileMenu}>
                          <div className="header-icon">
                            <RiMenu3Line className='text-xl text-violet-400' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bb-main-menu-desk">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="bb-inner-menu-desk">
                  <div
                    onClick={handleCategorie}
                    className="bb-header-btn bb-sidebar-toggle bb-category-toggle"
                  >
                    <svg
                      className="svg-icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z" />
                    </svg>
                  </div>
                  <button
                    className="navbar-toggler shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i className="ri-menu-2-line" />
                  </button>
                  <div className="bb-main-menu" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link" to={'/'}>
                          Accueil
                        </Link>
                      </li>

                      <li className="nav-item bb-dropdown">
                        <Link
                          className="nav-link bb-dropdown-item"
                        >
                          Produits
                        </Link>
                        <ul className="bb-dropdown-menu">
                          <li>
                            <Link to={'/menu/avant-de-boeuf'}>
                              Avant de boeuf
                            </Link>
                          </li>
                          <li>
                            <Link to={'/menu/arriere-de-boeuf'} >
                              Arrière de boeuf
                            </Link>
                          </li>
                          <li>
                            <Link to={'/menu/volaille'} >
                              Volaille
                            </Link>
                          </li>
                          <li>
                            <Link to={'/menu/agneau'} >
                              Agneau
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={'/cart'} >
                          Mon panier
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bb-mobile-menu-overlay" />
        <div id="bb-mobile-menu" className={mobileMenuOpen ? "bb-mobile-menu bb-menu-open" : "bb-mobile-menu"}>
          <div className="bb-menu-title">
            <span className="menu_title">Menu</span>
            <button type="button" className="bb-close-menu" onClick={handlemobileMenu}>
              ×
            </button>
          </div>
          <div className="bb-menu-inner">
            <div className="bb-menu-content">
              <ul>
                <li>
                  <Link to={'/'}>Accueil</Link>
                </li>
                <li>
                  <Link to={'/menu/avant-de-boeuf'}>Avant de boeuf</Link>
                </li>
                <li>
                  <Link to={'/menu/arriere-de-boeuf'}>Arrière de boeuf</Link>
                </li>
                <li>
                  <Link to={'/menu/volaille'}>Volaille</Link>
                </li>
                <li>
                  <Link to={'/menu/agneau'}>Agneau</Link>
                </li>
                <li>
                  <Link to={'/cart'}>Mon Panier</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </header>

      {/* Cart sidebar */}
      <div className="bb-side-cart-overlay" />
      <div className={isOpen ? "bb-side-cart bb-open-cart bg-purple-100" : "bb-side-cart"}>
        <div className="row h-full">

          <div className=" col-12">
            <div className="bb-inner-cart">
              <div className="bb-top-contact">
                <div className="bb-cart-title">
                  <h4>Mon panier</h4>
                  <div
                    className="bb-cart-close"
                    title="Close Cart"
                    onClick={handleSideCart}
                  />
                </div>
              </div>
              {cart.length === 0 ? (
                <p>Votre panier est vide</p>
              ) : (
                cart.map((item, index) => (
                  <div className="bb-cart-box item" key={index}>

                    <ul className="bb-cart-items">
                      <li className="cart-sidebar-list">
                        <div onClick={() => removeFromCart(index)} className="cart-remove-item">
                          <RiCloseFill className='text-purple-300' />
                        </div>
                        <div className='flex flex-col'>
                          <div className="bb-cart-pro-img">
                            <img src={item.imagesUrls[0]} alt="product-img-1" />
                          </div>
                          <p>{item.name}</p>
                        </div>


                        <div className="bb-cart-contact">
                          <span className="cart-price">
                            <span className="new-price">{item.pricePerKilo} FCFA</span>/Kg
                          </span>
                          <div className="qty-plus-minus">
                            <input
                              className="qty-input"
                              type="text"
                              name="bb-qtybtn"
                              value={item.quantity}
                              defaultValue={1}
                              onChange={(e) => updateCartItemQuantity(index, e.target.value)}
                            />
                          </div>
                          <span className="cart-price mt-5">
                            <span className="new-price">Totale: {item.pricePerKilo * item.quantity} FCFA</span>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))
              )}


              <div className="bb-bottom-cart">
                <div className="cart-sub-total">
                  <table className="table cart-table">
                    <tbody>
                      <tr>
                        <td className="title">Totale : </td>
                        <td className="price">{calculateTotal()} FCFA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="cart-btn">
                  <Link to={"/cart"} className="bb-btn-1">
                    Voir le panier
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Popup */}
      <div className={categorieOpen ? "bb-category-sidebar bb-open-category" : "bb-category-sidebar"}>
        <div className="bb-category-overlay" />
        <div className="category-sidebar bg-purple-100">
          <button type="button" className="bb-category-close" title="Close" onClick={handleCategorie} />
          <div className="container-fluid">
            <div className="row mb-minus-24">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="sub-title">
                      <h4>Nos categories</h4>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-4 col-sm-6 col-12 mb-24">
                    <div className="bb-category-box category-items-1">
                      <div className="category-image">
                        <img src="/category/ahead-beef.png" alt="category" />
                      </div>
                      <div className="category-sub-contact">
                        <h5>
                          <Link to={"/menu/avant-de-boeuf"}>Avant de boeuf</Link>
                        </h5>

                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-4 col-sm-6 col-12 mb-24">
                    <div className="bb-category-box category-items-2">
                      <div className="category-image">
                        <img src="/category/back-beef.png" alt="category" />
                      </div>
                      <div className="category-sub-contact">
                        <h5>
                          <Link to={"/menu/arriere-de-boeuf"}>Arrière de boeuf</Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-4 col-sm-6 col-12 mb-24">
                    <div className="bb-category-box category-items-3">
                      <div className="category-image">
                        <img src="/category/agneau.png" alt="category" />
                      </div>
                      <div className="category-sub-contact">
                        <h5>
                          <Link to={"/menu/agneau"}>Agneau</Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-4 col-sm-6 col-12 mb-24">
                    <div className="bb-category-box category-items-4">
                      <div className="category-image">
                        <img src="/category/coq.png" alt="category" />
                      </div>
                      <div className="category-sub-contact">
                        <h5>
                          <Link to={"/menu/volaille"}>Volaille</Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="sub-title">
                      <h4>Nos produits</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;