import React, { useState,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOCALSTORAGE_NAME } from "../../../constants/Pages";
import { AppContext } from "../../../contexts/AppProvider";
import { ReactComponent as IconCart } from "./../../../assests/img/iconCart.svg";
import { ReactComponent as IconSearch } from "./../../../assests/img/iconsearch.svg";
import "./../../../pages/main.scss";
import "./HeaderTop.scss";
const HeaderTop = (props) => {
  const { Cart } = useContext(AppContext);
  const [countCart, setcountCart] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    setcountCart(Cart.length);
  }, [Cart]);

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
    setcountCart(carts?.length ? carts?.length : 0);
  }, []);
  const handeChageCartPage = () => {
    history("/cart");
  };
  return (
    <div className="header__top__wrapper">
      <div className="header__top__Logo"></div>
      <div className="header__top__content">
        <div className="header__top__content__search">
          <input className="header__top__content__search__input"></input>
          <IconSearch className="header__top__content__search__icon" />
        </div>
        <div className="header__top__content__cart" onClick={handeChageCartPage}>
          <IconCart className="header__top__content__cart__icon" />
          <span>Giỏ hàng ({countCart})</span>
        </div>
      </div>
      <div className="header__top__content__Logo">{/* <Logo className="logo"/> */}</div>
    </div>
  );
};

export default HeaderTop;
