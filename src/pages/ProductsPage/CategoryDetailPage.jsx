import React, { useContext, useEffect } from "react";

import { CATEGORY_PAGE } from "../../constants/Pages";
import { AppContext } from "../../contexts/AppProvider";
import ListCategory from "../Homepage/ListCategory/ListCategory";
import CategoryNav from "./CategoryNav/CategoryNav";
import "./../main.scss";
import ProductList from "./ProductList/ProductList";

function CategoryDetailPage(props) {
    const { currentPage, setCurrentPage } = useContext(AppContext);

    useEffect(() => {
        props.callbackFunc(CATEGORY_PAGE);
        setCurrentPage(CATEGORY_PAGE);
    });

    return (
        <div className="category__detail__content">
            <div className="category__detail__container">
                <CategoryNav />
                <ProductList />
            </div>
            <ListCategory />
        </div>
    );
}

export default CategoryDetailPage;
