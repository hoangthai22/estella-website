import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { caculatorVND } from "../../../constants/Caculator";
import { LOCALSTORAGE_NAME } from "../../../constants/Pages";
import { AppContext } from "../../../contexts/AppProvider";
import "./CartList.scss";

const CartList = () => {
    const { Cart, setCart, modeMobile } = useContext(AppContext);
    const [listCart, setlistCart] = useState([]);
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const history = useNavigate();

    useEffect(() => {
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
        var totalPrice = 0;
        console.log({ Cart });
        CartList?.map((item) => {
            return (totalPrice = item.price * item.quantity + totalPrice);
        });
        setTotal(totalPrice);
        setlistCart(CartList);
    }, [Cart]);

    const handleRemoveCard = (_id) => {
        console.log(_id);
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
        const newCart = CartList.filter((item) => item.id !== _id);
        setCart([...newCart]);
        setlistCart([...newCart]);
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCart]));
    };
    const hanldeCheckout = () => {
        history("/checkout");
    };
    const hanldeBack = () => {
        history("/");
    };

    const handleProductDetail = (id, slug, category) => {
        // history(`${location.pathname}/${slug}_${id}`, { state: { product: props.data } });
        console.log(`${category}/${slug}_${id}`);
    };
    return (
        <div className="cart__wrapper">
            <div className="cart__container">
                <div>
                    <h1 style={{ textAlign: "left" }}>Giỏ hàng</h1>
                </div>

                {/* <div className="cart__title" style={{ display: !modeMobile ? "flex" : "none" }}>
                    <div className="cart__img">
                        <span>Hình ảnh</span>
                    </div>
                    <div className="cart__name">
                        <span>Tên sản phẩm</span>
                    </div>
                    <div className="cart__price">
                        <span>Đơn giá</span>
                    </div>
                    <div className="cart__quantity">
                        <span>Số lượng</span>
                    </div>
                    <div className="cart__total">
                        <span>Tổng</span>
                    </div>
                    <div className="cart__delete">
                        <span>Xóa</span>
                    </div>
                </div> */}
                {listCart != null && listCart.length > 0 ? (
                    listCart?.map((item) => {
                        if (!modeMobile) {
                            return (
                                <div className="cart__item" key={item.id + item.size}>
                                    <div className="cart__img">
                                        <img src={item.img} alt="" />
                                    </div>
                                    <div className="cart__name">
                                        <span className="cart__item__text">{item.name}</span>
                                        <div className="checkout__cart__name">
                                            <span className="">
                                                {item.color}/{item.size}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cart__price">
                                        <span className="cart__item__text">{caculatorVND(item.price) + "₫"}</span>
                                    </div>
                                    <div className="cart__quantity">
                                        <span className="cart__item__text">{item.quantity}</span>
                                    </div>
                                    <div className="cart__total">
                                        <span className="cart__item__text">{caculatorVND(item.price) + "₫"}</span>
                                    </div>
                                    <div className="cart__delete">
                                        <FontAwesomeIcon onClick={() => handleRemoveCard(item.id)} icon={faTrashAlt} style={{ marginRight: 5 }} />
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="cart__item-mobile" key={item.id} onClick={() => handleProductDetail(item.id, item.slug, item.category)}>
                                    <div className="cart__img__wrapper-mobile">
                                        <div className="cart__img-mobile">
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className="cart__name-mobile">
                                            <span className="cart__item__text-mobile">{item.name}</span>
                                            <div className="checkout__cart__name-mobile">
                                                <span className="">
                                                    {item.color}/{item.size}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="cart__delete-mobile">
                                            <span onClick={() => handleRemoveCard(item.id)}>x</span>
                                            {/* <FontAwesomeIcon onClick={() => handleRemoveCard(item.id)} icon="fa-solid fa-xmark" style={{ marginRight: 5 }} /> */}
                                        </div>
                                    </div>
                                    <div className="cart__img__wrapper-mobile">
                                        <div className="cart__price-mobile">
                                            <span className="cart__item__text-mobile">{caculatorVND(item.price)}</span>
                                        </div>
                                        <div className="cart__quantity-mobile">
                                            <span className="cart__item__text-mobile">{item.quantity}</span>
                                        </div>
                                        <div className="cart__total-mobile">
                                            <span className="cart__item__text-mobile">{caculatorVND(item.price * item.quantity)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })
                ) : (
                    <div className="cart__empty" style={{ textAlign: "center", marginTop: 30, fontWeight: 500, fontSize: "1.2rem" }}>
                        Giỏ hàng hiện tại đang trống
                    </div>
                )}
                {listCart != null && listCart.length > 0 && (
                    <div style={{ padding: "25px 15px" }}>
                        <div className="payment__cart__total">
                            <div className="payment__cart">
                                <span style={{ marginRight: 37 }}>Tổng cộng:</span>
                                <span style={{ marginLeft: 50, fontSize: 22, fontWeight: 600 }}>{caculatorVND(total)}</span>
                            </div>
                        </div>
                        <div className="">
                            <div className="product__info__btn-cart__wrapper btn_payment payment__cart__total__button" style={{ marginTop: 20 }}>
                                <button style={{ width: "25%", fontSize: 18, fontWeight: 500, height: 48 }} onClick={hanldeBack}>
                                    Tiếp tục mua hàng
                                </button>
                                <button style={{ width: "25%", fontSize: 18, fontWeight: 500, height: 48 }} onClick={hanldeCheckout}>
                                    Tiến hành đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartList;
