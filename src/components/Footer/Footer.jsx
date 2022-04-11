import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer__wrapper">
      <div className="footer__container">
        <div className="footer__container__social">
          <a href="https://www.instagram.com/estella.order/" className="footer__container__social__wrapper">
            <FontAwesomeIcon className="footer__social__icon" icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com/estella.order" className="footer__container__social__wrapper">
            <FontAwesomeIcon className="footer__social__icon" icon={faFacebook} />
          </a>
          <a href="https://www.tiktok.com/@mynganha0303?" className="footer__container__social__wrapper">
            <FontAwesomeIcon className="footer__social__icon" icon={faTiktok} />
          </a>
        </div>
        <div className="footer__container__infomation">
          <div className="header__bot__item footer">
            <span className="header__bot__item__text special">HELP ME CHOOSE</span>
          </div>
          <div className="footer__infomation">
            <a href="\" className="footer__infomation__text">
              Sản phẩm
            </a>
          </div>
          <div className="footer__infomation">
            <a href="\" className="footer__infomation__text">
              Chính sách bảo mật
            </a>
          </div>
          <div className="footer__infomation">
            <a href="\" className="footer__infomation__text">
              Chính sách thanh toán
            </a>
          </div>
        </div>
        <div className="footer__container__address">
          <div className="footer__address">
            <span className="footer__address__text__bold">Phone: </span>
            <p className="footer__address__text">0584324728</p>
          </div>
          <div className="footer__address">
            <span className="footer__address__text__bold">Email: </span>
            <p className="footer__address__text">hamyngan@gmail.com</p>
          </div>
          <div className="footer__address">
            <span className="footer__address__text__bold">Địa chỉ: </span>
            <p className="footer__address__text">290A Nguyễn Thị Minh Khai, Trà Vinh</p>
          </div>
        </div>
        
      </div>
      <div className="footer__bottom">
          <span className="footer__bottom__text">
          © Estella, all rights reserved Terms of Use Privacy Policy Cookies Policy
          </span>
      </div>
    </div>
  );
};

export default Footer;
