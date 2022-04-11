import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProduct } from "../../apis/apiCaller";
import { PRODUCT_DETAIL } from "../../constants/Pages";
import { AppContext } from "../../contexts/AppProvider";
import HelpMeChoose from "../Homepage/HelpMeChoose/HelpMeChoose";
import ProductDetail from "./ProductDetail/ProductDetail";
import ProductInfo from "./ProductInfo/ProductInfo";

function ProductDetailPage(props) {
    const { currentPage, setCurrentPage, setIsLoading,setProductDetailStep } = useContext(AppContext);
    const [product, setProduct] = useState({});
    const location = useLocation();

    useEffect(() => {
        props.callbackFunc(PRODUCT_DETAIL);
        setCurrentPage(PRODUCT_DETAIL);
    });

    useEffect(() => {
        setIsLoading(true);
        let id = location?.pathname.split("_")[1];
        getProduct(id)
            .then((res) => {
                res.data.listImgDetail = [res.data.productImg, ...res.data.listImgDetail];
                setProduct(res.data);
                setProductDetailStep(res.data.productName);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, [location?.pathname]);

    const [imgCurrent, setImgCurrent] = useState("");

    const changeCurrentImg = (childData) => {
        setImgCurrent(childData);
    };

    return (
        <div className="product__detail__content">
            <div className="product__detail__container">
                <ProductDetail data={product} imgUrl={imgCurrent} />
                <ProductInfo data={product} callbackFunc={changeCurrentImg} />
            </div>
            <HelpMeChoose />
        </div>
    );
}

export default ProductDetailPage;
