import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bb-footer margin-t-50">

        <div className="footer-container">
          <div className="footer-top padding-tb-50">
            <div className="container">
              <div
                className="row m-minus-991"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="col-sm-12 col-lg-3 bb-footer-cat">
                  <div className="bb-footer-widget bb-footer-company">
                    <img
                      src="/images/logoJF.png"
                      className="bb-footer-logo"
                      alt="footer logo"
                    />
                    <img
                      src="/images/logoJF.png"
                      className="bb-footer-dark-logo"
                      alt="footer logo"
                    />
                    
                  </div>
                </div>

                <div className="col-sm-12 col-lg-2 bb-footer-account">
                  <div className="bb-footer-widget">
                    <h4 className="bb-footer-heading">Liens utiles</h4>
                    <div className="bb-footer-links bb-footer-dropdown">
                      <ul className="align-items-center">
                        <li className="bb-footer-link">
                          <Link to={"/menu/avant-de-boeuf"}>Avant de boeuf</Link>
                        </li>
                        <li className="bb-footer-link">
                          <Link to={"/menu/arriere-de-boeuf"}>Arrière de boeuf</Link>
                        </li>
                        <li className="bb-footer-link">
                          <Link to={"/menu/volaille"}>Volaille</Link>
                        </li>
                        <li className="bb-footer-link">
                          <Link to={"/menu/agneau"}>Agneau</Link>
                        </li>
                        <li className="bb-footer-link">
                          <Link to={"/cart"}>Panier</Link>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-lg-3 bb-footer-cont-social">
                  <div className="bb-footer-contact">
                    <div className="bb-footer-widget">
                      <h4 className="bb-footer-heading">Contact</h4>
                      <div className="bb-footer-links bb-footer-dropdown">
                        <ul className="align-items-center">
                          <li className="bb-footer-link bb-foo-location">
                            <span className="mt-15px">
                              <i className="ri-map-pin-line" />
                            </span>
                            <p>
                              Côte d'Ivoire, Abidjan Marcory non loin du terrain Aby Raoul
                            </p>
                          </li>
                          <li className="bb-footer-link bb-foo-call">
                            <span>
                              <i className="ri-whatsapp-line" />
                            </span>
                            <Link to={"/"}>+225 01 42 42 65 15</Link>
                          </li>
                          <li className="bb-footer-link bb-foo-mail">
                            <span>
                              <i className="ri-mail-line" />
                            </span>
                            <Link to={"/"}>lajeunefermier.ci@gmail.com</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bb-footer-social">
                    <div className="bb-footer-widget">
                      <div className="bb-footer-links bb-footer-dropdown">
                        <ul className="align-items-center">
                          <li className="bb-footer-link">
                            <Link to={"/"}>
                              <FaFacebook className='text-white'/>
                            </Link>
                          </li>
                          <li className="bb-footer-link">
                            <Link to={"/"}>
                              <FaTwitter className='text-white'/>
                            </Link>
                          </li>
                          <li className="bb-footer-link">
                            <Link to={"/"}>
                              <FaLinkedin className='text-white'/>
                            </Link>
                          </li>
                          <li className="bb-footer-link">
                            <Link to={"/"}>
                              <FaInstagram className='text-white'/>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="bb-bottom-info">
                  <div className="footer-copy">
                    <div className="footer-bottom-copy ">
                      <div className="bb-copy">
                        Copyright © <span id="copyright_year" />
                        <Link className="site-name" to={"/"}>
                          CSN
                        </Link>{" "}
                        all rights reser<Link to={"/login"}>v</Link>ed.
                      </div>
                    </div>
                  </div>
                  <div className="footer-bottom-right">
                    <div className="footer-bottom-payment d-flex justify-content-center">
                      <div className="payment-link">
                        <img src="/payment/mobile_pay.png" className='w-[25rem]' alt="payment" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;