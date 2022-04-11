import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Categorys } from "../../constants/DataMock";
import { HOME_PAGE, CATEGORY_PAGE, PRODUCT_DETAIL, CART_PAGE, CHECKOUT_PAGE } from "../../constants/Pages";
import { AppContext } from "../../contexts/AppProvider";
import "./CategoryStep.scss";

const CategoryStep = (props) => {
    const { currentPage, setCurrentPage, productDetailStep, setProductDetailStep } = useContext(AppContext);
    const history = useNavigate();
    const location = useLocation();

    const handleRediret = (page) => {
        if (page === HOME_PAGE) history("/");
        else if (page === CATEGORY_PAGE) history(`/${location?.pathname?.slice(1).split("/")[0]}`);
        else if (page === CART_PAGE) history(`/cart`);
    };

    useEffect(() => {
        setCurrentPage(HOME_PAGE);
        getProductNameFromSlug("");
    }, [location, setCurrentPage]);

    const getCategoryNameFromSlug = (slug) => {
        let slugString = Categorys.filter((item) => item.slug === slug)[0]?.categoryName;
        return slugString;
    };
    const getProductNameFromSlug = (slug) => {
        console.log({ props });
    };

    return (
        <div className="category__step__wrapper">
            <span onClick={() => handleRediret(HOME_PAGE)}>Trang chủ</span>
            <span onClick={() => handleRediret(CATEGORY_PAGE)} style={{ cursor: "pointer" }}>
                {(currentPage === PRODUCT_DETAIL && location?.pathname !== "/") || (currentPage === CATEGORY_PAGE && location?.pathname !== "/")
                    ? getCategoryNameFromSlug(location?.pathname?.slice(1).split("/")[0])
                    : ""}
            </span>
            {productDetailStep !== null && productDetailStep !== "" && currentPage !== CART_PAGE && currentPage !== CHECKOUT_PAGE && currentPage !== CATEGORY_PAGE && (
                <span className="step-left">{productDetailStep}</span>
            )}
            <span className={currentPage === CHECKOUT_PAGE && "step-right"} onClick={() => handleRediret(CART_PAGE)}>
                {(currentPage === CART_PAGE || currentPage === CHECKOUT_PAGE) && "Giỏ hàng"}
            </span>
            <span onClick={() => handleRediret(CHECKOUT_PAGE)}>{currentPage === CHECKOUT_PAGE && "Thanh toán"}</span>
        </div>
    );
};

export default CategoryStep;
