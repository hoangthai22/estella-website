import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProduct } from "../../apis/apiCaller";
import { PRODUCT_DETAIL } from "../../constants/Pages";
import { AppContext } from "../../contexts/AppProvider";
import HelpMeChoose from "../Homepage/HelpMeChoose/HelpMeChoose";
import HotProduct from "../Homepage/HotProduct/HotProduct";
import ProductDetail from "./ProductDetail/ProductDetail";
import ProductInfo from "./ProductInfo/ProductInfo";

function ProductDetailPage(props) {
    const { currentPage, setCurrentPage, isLoading, setIsLoading, setProductDetailStep } = useContext(AppContext);
    const [product, setProduct] = useState({});
    const location = useLocation();
    useEffect(() => {
        handleGotoTop();
    }, []);

    const handleGotoTop = () => {
        window.scrollTo({ top: 0, left: 0 });
    };
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
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [location?.pathname]);

    const [imgCurrent, setImgCurrent] = useState("");

    const changeCurrentImg = (childData) => {
        setImgCurrent(childData);
    };

    return (
        <div className="product__detail__content">
            {!isLoading &&
                (product?._id != null ? (
                    <div>
                        <div className="product__detail__container">
                            <ProductDetail data={product} imgUrl={imgCurrent} />
                            <ProductInfo data={product} callbackFunc={changeCurrentImg} />
                        </div>
                        {/* <HelpMeChoose /> */}
                        <HotProduct />
                    </div>
                ) : (
                    <div className="product__detail__container">
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <span className="product__detail__notfound__title"  style={{ textAlign: "center", width: "100%", padding: "50px 0px 15px 0px", color: "#db7093", fontWeight: 600 }}>LỖI KHÔNG TÌM THẤY TRANG</span>
                            <span className="product__detail__notfound__text" style={{ textAlign: "center", width: "100%", padding: "0px 0px 20px 0px", color: "#777", fontWeight: 400 }}>
                                Xin lỗi, chúng tôi không tìm thấy kết quả nào phù hợp. Xin vui lòng quay lại trang chủ
                            </span>
                            <div className="product__info__btn-cart__wrapper btn_payment " style={{ padding: "0px 0px 280px 0px", justifyContent: "center" }}>
                                <button style={{ width: "180px", fontSize: 18, fontWeight: 500, height: 48 }}>Về trang chủ</button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default ProductDetailPage;
