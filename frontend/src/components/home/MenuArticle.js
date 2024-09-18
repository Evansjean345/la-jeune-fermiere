import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getArticleUrl } from '../../url';

import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import Card from './Card';

const MenuArticle = () => {
  const location = useLocation();
  const [type, setType] = useState();
  const [articles, setArticles] = useState([]);
  

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(getArticleUrl);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    let filtered = [];

    switch (location.pathname) {
      case '/menu/agneau':
        setType("agneau");
        filtered = articles.filter(item => item.type === 'agneau');
        break;
      case '/menu/volaille':
        setType("volaille");
        filtered = articles.filter(item => item.type === 'volaille');
        break;
      case '/menu/arriere-de-boeuf':
        setType("arrière de bœuf");
        filtered = articles.filter(item => item.type === 'arrière de bœuf');
        break;
      case '/menu/avant-de-boeuf':
        setType("avant de bœuf");
        filtered = articles.filter(item => item.type === 'avant de bœuf');
        break;
      default:
        filtered = articles;
    }

    return filtered;
  }, [articles, location.pathname]);

  console.log("data filtré",filteredArticles)
  return (
    <>
      <Header />
      {/* Breadcrumb */}
      <section className="section-breadcrumb margin-b-50 ">
        <div className="container">
          <div className="row">
            <div className="col-12 bg-teal-700">
              <div className="row bb-breadcrumb-inner ">
                <div className="col-md-6 col-sm-12">
                  <h2 className="bb-breadcrumb-title">{type}</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  <ul className="bb-breadcrumb-list">
                    <li className="bb-breadcrumb-item">
                      <Link className="text-white" to={"/"}>Accueil /</Link>
                    </li>
                    <li>
                      <i className="ri-arrow-right-double-fill" />
                    </li>
                    <li className="bb-breadcrumb-item text-slate-400 active">{type}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Displaying the filtered articles */}
      <section className="section-offer padding-tb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title bb-center" data-aos="fade-up" data-aos-duration={1000}>
                <div className="section-detail">
                  <h2 className="bb-title "><span>{type}</span></h2>
                  <p>Nous avons une large gamme de choix pour vous.</p>
                </div>
              </div>
            </div>
            {filteredArticles.length === 0 ? (
              <p>Aucun article n'a été enregistré dans cette catégorie pour l'instant</p>
            ) : (
              filteredArticles.map((article) => (
                <>
                <Card
                  imagesUrls={article.imageUrls}
                  _id={article._id}
                  name={article.name}
                  type={article.type}
                  pricePerKilo={article.pricePerKilo}
                />
                </>
                
              ))
            ) }
          </div>
        </div>
      </section>

      <Footer />
    </>

  );
};

export default MenuArticle;
