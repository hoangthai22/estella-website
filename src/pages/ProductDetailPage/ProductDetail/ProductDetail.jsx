import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import { AppContext } from "../../../contexts/AppProvider";
import "./ProductDetail.scss";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            ref={(element) => {
                if (element) {
                    element.style.setProperty("width", "20px", "important");
                    element.style.setProperty("height", "105px", "important");
                }
            }}
            onClick={onClick}
            style={{ ...style, display: "block", top: "unset", bottom: -68, left: "calc(50% - 12px)", borderRadius: 10, transform: "rotate(90deg)" }}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            ref={(element) => {
                if (element) {
                    element.style.setProperty("width", "20px", "important");
                    element.style.setProperty("height", "105px", "important");
                    element.style.setProperty("left", "calc(50% - 12px)", "important");
                }
            }}
            onClick={onClick}
            style={{ ...style, display: "block", top: -70, borderRadius: 10, transform: "rotate(90deg)" }}
        />
    );
}

const ProductDetail = (props) => {
    // const { modeMobile } = useContext(AppContext);
    const location = useLocation();
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    const { listImgDetail } = props.data;
    const imgUrl = props.imgUrl;

    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const sliderRef = useRef();
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    });

    const settingsNav2 = {
        className: "product__detail__slider",
        vertical: width > 800 ? true : false,
        verticalSwiping: width > 800 ? true : false,
        asNavFor: nav1,
        ref: slider2,
        slidesToShow: width > 800 ? 4 : 1,
        infinite: false,
        swipeToSlide: true,
        focusOnSelect: true,
        speed: 300,
        // lazyLoad: true,
        arrows: width > 800 ? true : false,
        dots: width < 800 ? true : false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    const settingsNav1 = {
        asNavFor: nav2,
        ref: slider1,
        infinite: false,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false,
        speed: 300,
        // lazyLoad: true,
    };
    useEffect(() => {
        handleGotoTop();
    }, []);
    const handleGotoTop = () => {
        window.scrollTo({ top: 0, left: 0 });
    };

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
        let index = 0;

        listImgDetail?.map((img, ind) => {
            if (img === imgUrl) {
                index = ind;
            }
        });
        if (index > 0) sliderRef.current.slickGoTo(index);
    }, [imgUrl, listImgDetail, location?.pathname]);

    return (
        <div className="product__detail__wrapper">
            <div className="product__detail__img__wrapper">
                <div className="product__detail__slider__main">
                    <Slider {...settingsNav1}>
                        {listImgDetail?.map((item) => {
                            return (
                                <div className="product__detail__img__border" key={item}>
                                    <img className="product__detail__img" src={item} alt="" />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <div className="product__detail__img__slider">
                    <Slider {...settingsNav2} ref={sliderRef}>
                        {listImgDetail?.map((item) => {
                            console.log(item);
                            return (
                                <div className="product__detail__img__border slide__border" key={item}>
                                    <img className="product__detail__img" src={item} alt="" />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>

            <div className="product__detail__info"></div>
        </div>
    );
};

export default ProductDetail;
