import React, { useEffect, useState } from "react";
import { getListCategory } from "../apis/apiCaller";
import { Categorys, productList } from "../constants/DataMock";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [currentPage, setCurrentPage] = useState("");
    const [listProducts, setlistProducts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [Cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [productDetailStep, setProductDetailStep] = useState("");

    useEffect(() => {
        getListCategory().then((res) => {
            setCategoryList(res.data);
        });
        setlistProducts(productList);
    }, []);

    return (
        <AppContext.Provider
            value={{ productDetailStep, setProductDetailStep, isLoading, setIsLoading, currentPage, setCurrentPage, listProducts, setlistProducts, categoryList, setCategoryList, Cart, setCart }}
        >
            {children}
        </AppContext.Provider>
    );
}
