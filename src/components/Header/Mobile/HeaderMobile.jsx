import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOCALSTORAGE_NAME } from "../../../constants/Pages";
import { AppContext } from "../../../contexts/AppProvider";
import { ReactComponent as IconCart } from "./../../../assests/img/iconCart.svg";
import { ReactComponent as IconSearch } from "./../../../assests/img/iconsearch.svg";
import "./../../../pages/main.scss";
import "./HeaderMobile.scss";
const HeaderMobile = (props) => {
    const { Cart, setIsOpenDrawer } = useContext(AppContext);
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
    const hanldeOpenDrawer = () => {
        setIsOpenDrawer(true);
    };
    return (
        <div className="header__Mobile__wrapper">
            <div className="header__Mobile__menu" onClick={hanldeOpenDrawer}>
                <FontAwesomeIcon className="header__Mobile__menu__icon" icon={faBars} />
            </div>
            <div className="header__Mobile__Logo">
                <img src="https://mcdn.nhanh.vn/store/22767/logo_1638966470_logo%20chu%CC%9B%CC%83%20tra%CC%86%CC%81ng-04.png" alt="" />
            </div>
            <div className="header__Mobile__cart" onClick={handeChageCartPage}>
                <IconCart className="header__top__content__cart__icon" />
                <span> ({countCart})</span>
            </div>
        </div>
    );
};

export default HeaderMobile;
