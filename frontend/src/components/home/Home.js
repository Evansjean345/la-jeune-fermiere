import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Card from './Card';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Header from './Header';
import Footer from './Footer';
import { getArticleUrl } from '../../url';

const Home = () => {
  AOS.init();

  const [type, setType] = useState('all');  // Définir "all" par défaut
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);  // État pour le chargement

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);  // Activer le loader
      try {
        const response = await axios.get(getArticleUrl);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);  // Désactiver le loader une fois que les données sont récupérées
      }
    };
    fetchArticles();
  }, []);

  const getRandomArticles = (articlesArray, count) => {
    const shuffled = [...articlesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filteredArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    let filtered = [];

    if (type === 'all') {
      filtered = getRandomArticles(articles, 8);
    } else {
      filtered = articles.filter(item => item.type === type).slice(0, 8);
    }

    setLoading(false);  // Désactiver le loader après filtrage
    return filtered;
  }, [articles, type]);

  const filteredArticlesdeal = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    let filtered = [];

    if (type === 'all') {
      filtered = getRandomArticles(articles, 8);
    } else {
      filtered = articles.filter(item => item.type === type).slice(0, 8);
    }

    setLoading(false);  // Désactiver le loader après filtrage
    return filtered;
  }, [articles, type]);

  // Met à jour le type et active le loader
  const handleTypeChange = (selectedType) => {
    setLoading(true);  // Activer le loader lors du changement de type
    setType(selectedType);  // Mise à jour du type
  };

  // const categorieOption = {
  //   items: 4,
  //   loop: true,
  //   autoplay: true,
  //   autoplayTimeout: 3500,
  //   animateOut: 'slideOutUp',
  //   nav: false,
  //   dots: false,
  //   margin: 10,
  //   responsive: {
  //     1100: {
  //       items: 4, // 4 items pour les grands écrans
  //     },
  //     600: {
  //       items: 2, // 2 items pour les écrans moyens
  //     },
  //     0: {
  //       items: 1, // 1 item pour les petits écrans
  //     }
  //   }
  // }

  const dealOption = {
    items: 4,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    animateOut: 'slideOutUp',
    nav: false,
    dots: false,
    margin: 10,
    responsive: {
      1100: {
        items: 4, // 4 items pour les grands écrans
      },
      600: {
        items: 2, // 2 items pour les écrans moyens
      },
      0: {
        items: 1, // 1 item pour les petits écrans
      }
    }
  }
  const heroOption = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    nav: false,
    dots: false,
    margin: 10,

  }
  return (
    <>
      <Header />
      {/* Hero */}


      <section className="section-hero margin-b-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-slider swiper-container">
                <div className=' swiper-wrapper'>
                  <div className="swiper-slide slide-1">
                    <div className="row mb-minus-24">
                      <div className="col-lg-6 col-12 order-lg-1 order-2 mb-24">
                        <div className="hero-contact">

                          <h1>
                            De la Viande Fraîche <span>de Boeuf</span>
                            <br /> et de Volaille
                          </h1>
                          <Link to={"/"}

                            className="bb-btn-1"
                          >
                            Commandez maintenant!
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12 order-lg-2 order-1 mb-24">
                        <div >
                          <img src="/images/hero.png" alt="hero" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="swiper-pagination swiper-pagination-white" />
                <div className="swiper-buttons">
                  <div className="swiper-button-next" />
                  <div className="swiper-button-prev" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bb-scroll-Page">
          <span className="scroll-bar">
            <Link to={"/"} >Scroller </Link>
          </span>
        </div>
      </section>
      {/* Category */}
      {/* <section className="section-category padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">
            <div className="col-lg-5 col-12 mb-24">
              <div className="bb-category-img">
                <img src="/category/category.jpg" alt="category" />
                <div className="bb-offers">
                  <span>50% Off</span>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-12 mb-24">
              <div className="bb-category-contact">
                <div
                  className="category-title"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={600}
                >
                  <h2 >Nos catégories</h2>
                </div>
                <OwlCarousel className='owl-theme bb-category-block ' {...categorieOption}>
                  <div className='item  p-2'>
                    <div
                      className="bb-category-box category-items-1"
                      data-aos="flip-left"
                      data-aos-duration={1000}
                      data-aos-delay={200}
                    >
                      <div className="category-image">
                        <img src="/category/agneau.png" alt="category" />
                      </div>
                      <div className="category-sub-contact">
                        <h5>
                          <Link to={"/"} >Agneau</Link>
                        </h5>
                        <p>articles</p>
                      </div>
                    </div>
                  </div>
                  <div className='item  p-2'>
                    <div
                      className="bb-category-box category-items-2"
                      data-aos="flip-left"
                      data-aos-duration={1000}
                      data-aos-delay={400}
                    >
                      <div className="category-image">
                        <img src="/category/ahead-beef.png" alt="category" />
                      </div>
                      <div className="category-sub-contact">
                        <h5>
                          <Link to={"/"} >Avant de boeuf</Link>
                        </h5>
                        <p>articles</p>
                      </div>
                    </div>
                  </div>
                  <div className='item  p-2'>
                    <div
                      className="bb-category-box category-items-3"
                      data-aos="flip-left"
                      data-aos-duration={1000}
                      data-aos-delay={600}
                    >
                      <div className="category-image">
                        <img src="/category/back-beef.png" alt="category" />
                      </div>
                      <div className="category-sub-contact">
                        <h5>
                          <Link to={"/"} >Arrière de boeuf</Link>
                        </h5>
                        <p>articles</p>
                      </div>
                    </div>
                  </div>
                  <div className='item  p-2'>
                    <div
                      className="bb-category-box category-items-4"
                      data-aos="flip-left"
                      data-aos-duration={1000}
                      data-aos-delay={800}
                    >
                      <div className="category-image">
                        <img src="/category/coq.png" alt="category" />
                      </div>
                      <div className="category-sub-contact">
                        <h5>
                          <Link to={"/"} >Volaille</Link>
                        </h5>
                        <p>articles</p>
                      </div>
                    </div>
                  </div>
                </OwlCarousel>

              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Day of the deal */}
      <section className="section-deal padding-tb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-title bb-deal"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail">
                  <h2 className="bb-title">
                    <span>La jeune fermière</span>, les meilleurs offres du marché
                  </h2>
                  <p>N'attendez plus! Passer vite votre commande</p>
                </div>
                <div id="dealend" className="dealend-timer" />
              </div>
            </div>
            {/* <div className="col-12">

              <div className="bb-deal-slider">

                <OwlCarousel className='owl-theme bb-deal-block' {...dealOption}>
                  {
                    filteredArticlesdeal.length === 0 ? (
                      <p>Aucun article n'a été enregistré dans cette catégorie pour l'instant</p>
                    ) : (
                      filteredArticlesdeal.map((article) => (
                        <>
                          <div key={article._id} className='item  p-2'>
                            <div
                              className="bb-deal-card"
                              data-aos="fade-up"
                              data-aos-duration={1000}
                              data-aos-delay={200}
                            >
                              <div className="bb-pro-box">
                                <div className="bb-pro-img">

                                  <Link to={"/"} >
                                    <div className="inner-img">
                                      <img
                                        className="main-img product-img"
                                        src={article.imageUrls[0]}
                                        alt="product-1"
                                      />
                                    </div>
                                  </Link>
                                  <ul className="bb-pro-actions">
                                    <li className="bb-btn-group">
                                      <Link to={"/"}
                                        data-link-action="quickview"
                                        title="Quick View"
                                        data-bs-toggle="modal"
                                        data-bs-target="#bry_quickview_modal"
                                      >
                                        <i className="ri-eye-line" />
                                      </Link>
                                    </li>

                                    <li className="bb-btn-group">
                                      <Link to={"/"} title="Add To Cart">
                                        <i className="ri-shopping-bag-4-line" />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="bb-pro-contact">
                                  <h4 className="bb-pro-title">{article.name}</h4>
                                  <div className="bb-price">
                                    <div className="inner-price">
                                      <span className="new-price">{article.pricePerKilo} FCFA/Kg</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                    )
                  }
                </OwlCarousel>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* Banner-one */}
      <section className="section-banner-one padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">
            <div
              className="col-lg-6 col-12 mb-24"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={400}
            >
              <div className="banner-box bg-box-color-one">
                <div className="inner-banner-box">
                  <div className="side-image">
                    <img src="/images/beef.png" alt="one" />
                  </div>
                  <div className="inner-contact">
                    <h5>De la viande de Bœuf</h5>
                    <p>Des parties entières ou découpées vous trouverez votre choix parmi notre menu complet</p>
                    <Link to={"/menu/arriere-de-boeuf"} className="bb-btn-1">
                      Voir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-12 mb-24"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={400}
            >
              <div className="banner-box bg-box-color-two">
                <div className="inner-banner-box">
                  <div className="side-image">
                    <img src="/images/two.png" alt="two" />
                  </div>
                  <div className="inner-contact">
                    <h5>De la viande de Volaille et autres</h5>
                    <p>Vos repas ne seront plus les même après avoir goutés à la fraicheur de notre viande</p>
                    <Link to={"/menu/volaille"} className="bb-btn-1">
                      Voir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Product tab Area */}
      <section className="section-product-tabs padding-tb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-title bb-deal"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail">
                  <h2 className="bb-title">
                    Nos <span>produits</span>
                  </h2>
                  <p>Decouvrez notre large gamme de viande fraiche de qualité et de choix!</p>
                </div>
                <div className="bb-pro-tab">
                  <ul className="bb-pro-tab-nav nav">
                    <li className="nav-item" onClick={() => handleTypeChange("all")}>
                      <button className="nav-link active" >
                        Tout
                      </button>
                    </li>
                    <li className="nav-item" onClick={() => handleTypeChange("agneau")}>
                      <button className="nav-link" >
                        Agneau
                      </button>
                    </li>
                    <li className="nav-item" onClick={() => handleTypeChange("volaille")}>
                      <button
                        className="nav-link " >
                        Volaille
                      </button>
                    </li>
                    <li className="nav-item" onClick={() => handleTypeChange("avant de bœuf")}>
                      <button className="nav-link" >
                        Avant de bœuf
                      </button>
                    </li>
                    <li className="nav-item" onClick={() => handleTypeChange("arrière de bœuf")}>
                      <button className="nav-link" >
                        Arrière de bœuf
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            {loading ? (
              <CircularProgress size={80} color="inherit" />
            ) : (
              filteredArticles.length === 0 ? (
                <p>Aucun article n'a été enregistré dans cette catégorie pour l'instant</p>
              ) : (
                filteredArticles.map((article) => (
                  <Card
                    key={article._id}  // Ajout d'une clé unique pour chaque élément
                    imagesUrls={article.imageUrls}
                    _id={article._id}
                    name={article.name}
                    type={article.type}
                    pricePerKilo={article.pricePerKilo}
                  />
                ))
              )
            )}
          </div>
        </div>
      </section>
      {/* Services */}
      <section className="section-services padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">
            <div
              className="col-lg-3 col-md-6 col-12 mb-24"
              data-aos="flip-up"
              data-aos-duration={1000}
              data-aos-delay={200}
            >
              <div className="bb-services-box">
                <div className="services-img">
                  <img src="/services/fast-delivery.png" alt="services-1" />
                </div>
                <div className="services-contact">
                  <h4>Livraison rapide</h4>
                  <p>Vous etes livrés très rapidement après validation de votre commande</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-12 mb-24"
              data-aos="flip-up"
              data-aos-duration={1000}
              data-aos-delay={400}
            >
              <div className="bb-services-box">
                <div className="services-img">
                  <img src="/services/2.png" alt="services-2" />
                </div>
                <div className="services-contact">
                  <h4>Support téléphonique</h4>
                  <p>Vous pouvez nous joindre à tout moment aux heures d'ouvertures</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-12 mb-24"
              data-aos="flip-up"
              data-aos-duration={1000}
              data-aos-delay={600}
            >
              <div className="bb-services-box">
                <div className="services-img">
                  <img src="/services/3.png" alt="services-3" />
                </div>
                <div className="services-contact">
                  <h4>Suivie de la commande</h4>
                  <p>Rester au courant de l'avancé de votre commande grace a des alertes reçu par mails</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-12 mb-24"
              data-aos="flip-up"
              data-aos-duration={1000}
              data-aos-delay={800}
            >
              <div className="bb-services-box">
                <div className="services-img">
                  <img src="/services/4.png" alt="services-4" />
                </div>
                <div className="services-contact">
                  <h4>Payement Securiser</h4>
                  <p>Nous vous fournissons un moyent de payement reunissant tout les mobiles money</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;