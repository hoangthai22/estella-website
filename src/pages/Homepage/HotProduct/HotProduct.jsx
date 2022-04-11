import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getListProductByCategory } from "../../../apis/apiCaller";
import { productList } from "../../../constants/DataMock";
import ProductItem from "../../ProductsPage/ProductItem/ProductItem";

import "./HotProduct.scss";

const HotProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getListProductByCategory("Vay", 1, 12).then((res) => {
          console.log(res.data);
          console.log(productList);
            setProducts(res.data);
        });
    },[]);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        swipeToSlide: true,
        autoplaySpeed: 4000,
        className: "slider__container",
        lazyLoad: true,
        pauseOnFocus: true,
    };

    return (
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
