import React, { useEffect } from "react";
import Slider from "react-slick";
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Sliders = (props) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "slider__container",
        lazyLoad: true,
        pauseOnFocus: true,
    };
    useEffect(() => {
        document.querySelector(".slick-next").style.display = "none";
        document.querySelector(".slick-prev").style.display = "none";
    });

    return (
        <div className="slider__wrapper">
            <Slider {...settings}>
                <div className="slider__item">
                    <img className="slider__img" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Screen_Shot_2021_12_08_at_7_42_37_PM.png" alt="" />
                </div>
                <div className="slider__item">
                    <img className="slider__img" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Screen_Shot_2021_12_09_at_4_45_28_PM.png" alt="" />
                </div>
            </Slider>
        </div>
    );
};

export default Sliders;
