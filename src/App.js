import React, { Suspense, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import CategoryStep from "./components/CategoryStep/CategoryStep";
import Footer from "./components/Footer/Footer";
import HeaderBot from "./components/Header/Bottom/HeaderBot";
import HeaderTop from "./components/Header/Top/HeaderTop";
import { Loading } from "./components/Loading/Loading";
import { HOME_PAGE } from "./constants/Pages";
import { AppContext } from "./contexts/AppProvider";
import CartPage from "./pages/CartPage/CartPage";
import ConfirmPage from "./pages/ConfirmOrderPage/ConfirmPage";
import GoTop from "./pages/Homepage/GoTop/GoTop";
import HomePage from "./pages/Homepage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CategoryDetailPage from "./pages/ProductsPage/CategoryDetailPage";

function App() {
    const [currentPageApp, setCurrentPageApp] = useState("");
    const { isLoading, setIsLoading } = useContext(AppContext);
    const changeCurrentPage = (childData) => {
        setCurrentPageApp(childData);
    };

    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <BrowserRouter>
                {isLoading && <Loading />}
                <div className="header">
                    <HeaderTop />
                    <HeaderBot />
                    {currentPageApp !== HOME_PAGE && <CategoryStep />}
                </div>
                <Routes>
                    <Route path="/" element={<HomePage callbackFunc={changeCurrentPage} />} />
                    <Route path={`/:slug`} element={<CategoryDetailPage callbackFunc={changeCurrentPage} />} />
                    <Route path={`/:slug/:slug`} element={<ProductDetailPage callbackFunc={changeCurrentPage} />} />
                    <Route path={`/cart`} element={<CartPage callbackFunc={changeCurrentPage} />} />
                    <Route path={`/checkout`} element={<ConfirmPage callbackFunc={changeCurrentPage} />} />
                </Routes>
                <div className="footer">
                    <Footer />
                    <GoTop />
                </div>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
