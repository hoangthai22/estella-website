import React, { Suspense, useContext, useState, useEffect } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat/lib/MessengerCustomerChat";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import CategoryStep from "./components/CategoryStep/CategoryStep";
import { DrawerContent } from "./components/Drawer/Drawer";
import Footer from "./components/Footer/Footer";
import HeaderBot from "./components/Header/Bottom/HeaderBot";
import HeaderMobile from "./components/Header/Mobile/HeaderMobile";
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

    const { isLoading, isOpenDrawer, setIsOpenDrawer, modeMobile, setModeMobile } = useContext(AppContext);
    const changeCurrentPage = (childData) => {
        setCurrentPageApp(childData);
    };
    useEffect(() => {
        if (window.outerWidth < 800) {
            setModeMobile(true);
        } else {
            setModeMobile(false);
        }
        const handleWindowResize = () => {
            if (window.outerWidth < 800) {
                setModeMobile(true);
            } else {
                setModeMobile(false);
            }
        };

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    });
    const gotoShoppe = () => {};
    const toggleDrawer = () => {
        setIsOpenDrawer((prevState) => !prevState);
    };
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <BrowserRouter>
                {isLoading && <Loading />}
                <div className="header-mobile">
                    <HeaderMobile />
                </div>
                <div className="header">
                    <HeaderTop />
                    <HeaderBot />
                    {currentPageApp !== HOME_PAGE && <CategoryStep />}
                </div>
                <Drawer size={300} open={isOpenDrawer} onClose={toggleDrawer} direction="left" className="drawer__container">
                    <DrawerContent />
                </Drawer>
                <MessengerCustomerChat pageId="100348128450128" appId="538413747634267" />,
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
                    <div className="goto__shoppe" onClick={gotoShoppe}>
                        <a a href="https://shopee.vn/estella.order">
                            <img alt="shopee" src="https://firebasestorage.googleapis.com/v0/b/twe-mobile.appspot.com/o/shopee.png?alt=media&token=55fa0d5c-07d5-46c4-a25d-0359e7452af5" />
                        </a>
                    </div>
                </div>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
