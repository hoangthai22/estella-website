import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getListProductByCategory } from "../../../apis/apiCaller";
import { productList } from "../../../constants/DataMock";
import ProductItem from "../../ProductsPage/ProductItem/ProductItem";
import ProductItemMobile from "../../ProductsPage/ProductItem/ProductItemMobile";

import "./HotProduct.scss";

const HotProduct = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
            console.log(window.innerWidth);
        }
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    useEffect(() => {
        getListProductByCategory("Vay", 1, 12).then((res) => {
            setProducts(res.data);
        });
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: width < 800 ? 2 : 4,
        slidesToScroll: 1,
        // autoplay: true,
        swipeToSlide: true,
        autoplaySpeed: 4000,
        className: "slider__container",
        lazyLoad: true,
        pauseOnFocus: true,
    };

    return width < 800 ? (
        <div className="hot__product__wrapper-mobile">
            <div className="hot__product__title">
                <span className="hot__product__title__text">Sản phẩm HOT!</span>
            </div>
            <Slider {...settings}>
                {productList.map((item) => {
                    return <ProductItemMobile data={item} key={item.id} />;
                })}
            </Slider>
        </div>
    ) : (
        <div className="hot__product__wrapper">
            <div className="hot__product__title">
                <span className="hot__product__title__text">Sản phẩm HOT!</span>
            </div>
            <Slider {...settings}>
                {productList.map((item) => {
                    return <ProductItem data={item} key={item.id} />;
                })}
            </Slider>
        </div>
    );
};

export default HotProduct;
