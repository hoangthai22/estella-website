import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { caculatorSale, caculatorVND } from "../../../constants/Caculator";
import "./ProductItemMobile.scss";

const ProductItemMobile = (props) => {
    const { sale, productImg, productName, price, slug, category, id } = props.data;
    const history = useNavigate();
    const location = useLocation();

    const handleProductDeatail = () => {
        if (location.pathname === "/") {
           console.log(slug);
        } else {
            history(`${location.pathname}/${slug}_${id}`, { state: { product: props.data } });
        }
    };
    return (
        <div className={`hot__product__item-mobile`} onClick={handleProductDeatail}>
            <div className={`hot__product__item__wrapper-mobile`}>
                <div className="hot__product__item__sale__icon-mobile" style={{ display: sale > 0 ? "block" : "none" }}>
                    <span>{sale}%</span>
                </div>
                <img className={`hot__product__item__img-mobile`} src={productImg} alt="" />
                <span className="hot__product__item__text-mobile">{productName}</span>
                <div className="hot__product__item__text-price__wrapper-mobile">
                    <span className="hot__product__item__text-price__sale-mobile" style={{ display: sale > 0 ? "block" : "none" }}>
                        {caculatorVND(price)}
                    </span>
                    <span className="hot__product__item__text-price-mobile">{caculatorVND(caculatorSale(sale, price))}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductItemMobile;
