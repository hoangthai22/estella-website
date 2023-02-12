import React,{useContext, useEffect} from "react";
import { CART_PAGE } from "../../constants/Pages";
import { AppContext } from "../../contexts/AppProvider";
import "./../main.scss";
import CartList from "./CartList/CartList";


function CartPage(props) {
    const { currentPage, setCurrentPage } = useContext(AppContext);

    useEffect(() => {
        props.callbackFunc(CART_PAGE);
        setCurrentPage(CART_PAGE);
    });

    return (
        <div className="cart__content">
            <div className="">
                <CartList />
            </div>
        </div>
    );
}

export default CartPage;
