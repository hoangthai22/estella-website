import { faCaretLeft, faCaretRight, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { caculatorSale, caculatorVND } from "../../../constants/Caculator";
import { LOCALSTORAGE_NAME } from "../../../constants/Pages";
import { AppContext } from "../../../contexts/AppProvider";
import "./ProductInfo.scss";

const ProductInfo = (props) => {
    const { setCart } = useContext(AppContext);
    const { productName, price, size, totalSize, sale, _id, productImg, slug, category } = props.data;
    const [indexActive, setIndexActive] = useState("");
    const [colorActive, setColorActive] = useState("");
    const [countQuantity, setcountQuantity] = useState(1);
    const [sizeListCurrent, setSizeListCurrent] = useState([]);
    const [isValidForm, setisValidForm] = useState(true);
    console.log(props.data);
    const history = useNavigate();
    useEffect(() => {
        setSizeListCurrent(totalSize);
    }, [totalSize]);

    useEffect(() => {
        props.callbackFunc(size ? size[0]?.imgTitle : "");
    });

    const handleChangeIndexSize = (size) => {
        if (size === indexActive) {
            setIndexActive("0");
        } else {
            setIndexActive(size);
            compareSizeWithColor(size);
            setcountQuantity(1);
            setisValidForm(true);
        }
    };

    const handleChangeColor = (color) => {
        let imgUrl = "";
        let sizeList = [];
        if (color === colorActive) {
            setColorActive("");
            setSizeListCurrent(totalSize);
        } else {
            setTimeout(() => {
                size?.map((item) => {
                    if (item.color === color) {
                        sizeList = item.listSize;
                        imgUrl = item.imgTitle;
                        return true;
                    }
                });
                props.callbackFunc(imgUrl);
                setSizeListCurrent(sizeList);
                setColorActive(color);
                setcountQuantity(1);
                setisValidForm(true);
            }, 10);
        }
    };

    const compareSizeWithColor = () => {
        let result = [];
        size?.map((size) => {
            size?.listSize?.map((item) => {
                if (item?.sizeName === indexActive) {
                    if (item?.quantity === 0) {
                        result = [...result, true];
                    } else {
                        result = [...result, false];
                    }
                }
            });
        });
        return result;
    };

    const getCountQuantity = () => {
        let count = 0;
        sizeListCurrent?.map((item) => {
            if (item.sizeName === indexActive) {
                count = item.quantity;
            }
        });
        return count;
    };

    function handleChange(e) {
        const { value } = e.target;
        if (value > getCountQuantity()) {
            setcountQuantity(parseInt(getCountQuantity()));
        } else if (value < 1) {
            setcountQuantity(parseInt(1));
        } else setcountQuantity(parseInt(value));
    }

    const handleAddCart = (condition) => {
        let isValid = true;
        if (indexActive <= 0) {
            isValid = false;
            setisValidForm(isValid);
            return;
        }
        if (colorActive <= 0) {
            isValid = false;
            setisValidForm(isValid);
            return;
        }
        if (isValid) {
            setisValidForm(isValid);
            AddCart();
        }
        if (condition === "Cart") {
            history("/cart");
        }
    };

    const AddCart = () => {
        let isQuantity = false;
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME))) {
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
        }
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
        let newCarts = CartList?.map((item) => {
            if (item.id === _id && item.size === indexActive && item.color === colorActive) {
                item.quantity = item.quantity + countQuantity;
                if (item.quantity > getCountQuantity()) {
                    item.quantity = getCountQuantity();
                }
                isQuantity = true;
            }
            return item;
        });
        if (!isQuantity) {
            const carts = [
                ...CartList,
                {
                    id: _id,
                    quantity: countQuantity,
                    color: colorActive,
                    size: indexActive,
                    name: productName,
                    img: productImg,
                    price: price,
                    slug: slug,
                    category: category.slug,
                },
            ];
            setCart(carts);
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...carts]));
        } else {
            setCart([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([...newCarts]));
        }
    };

    const handleChangeQuantity = () => {
        if (colorActive !== "" && indexActive !== "0") {
            if (countQuantity >= getCountQuantity()) {
                setcountQuantity(parseInt(getCountQuantity()));
                return;
            }
            countQuantity > 0 && setcountQuantity(countQuantity + 1);
        }
    };

    return (
        <div className="product__info__wrapper">
            <div className="product__info__container">
                <h1 className="product__info__title">{productName}</h1>
                <div className="product__info__price__wrapper">
                    <span className="product__info__price__sale" style={{ display: sale > 0 ? "block" : "none" }}>
                        {caculatorVND(price)}
                    </span>
                    <span className="product__info__price">{caculatorVND(caculatorSale(sale, price))}</span>
                    <div className="product__info__price__sale__percent" style={{ display: sale > 0 ? "block" : "none" }}>
                        <span>{sale}% Giảm</span>
                    </div>
                </div>
                <div className={`product__info__size__wrapper ${!isValidForm && "error-background"}`}>
                    <span className="product__info__size__title">Kích cỡ</span>
                    <div className="product__info__size">
                        {sizeListCurrent?.map((item) => {
                            if (item === "Freesize" || item.sizeName === "Freesize") {
                                return (
                                    <button
                                        style={{ width: "80px" }}
                                        onClick={() => handleChangeIndexSize(item.sizeName ? item.sizeName : item)}
                                        className={`freesize product__info__size__btn${(item.sizeName ? item.sizeName : item) === indexActive ? " active" : ""}`}
                                        key={item.sizeName ? item.sizeName : item}
                                        disabled={item.quantity === 0}
                                    >
                                        {item.sizeName ? item.sizeName : item}
                                    </button>
                                );
                            } else
                                return (
                                    <button
                                        onClick={() => handleChangeIndexSize(item.sizeName ? item.sizeName : item)}
                                        className={`product__info__size__btn${(item.sizeName ? item.sizeName : item) === indexActive ? " active" : ""}`}
                                        key={item.sizeName ? item.sizeName : item}
                                        disabled={item.quantity === 0}
                                    >
                                        {item.sizeName ? item.sizeName : item}
                                    </button>
                                );
                        })}
                    </div>
                </div>
                <div className={`product__info__color__wrapper ${!isValidForm && "error-background"}`}>
                    <span className="product__info__size__title">
                        Màu sắc: <span>{colorActive}</span>
                    </span>
                    <div className="product__info__color">
                        {size?.map((item, ind) => {
                            return (
                                <img
                                    alt="imgTitle"
                                    src={item.imgTitle}
                                    onClick={() => !compareSizeWithColor()[ind] && handleChangeColor(item.color)}
                                    className={`product__info__color__btn ${!compareSizeWithColor()[ind] && (item.color === colorActive ? " active-btn-color" : "")} ${
                                        compareSizeWithColor()[ind] ? "sold-btn-color" : ""
                                    }`}
                                    key={item.color}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className={`product__info__error ${!isValidForm && "error-background"}`} style={{ display: isValidForm ? "none" : "block" }}>
                    <span>Vui lòng chọn phân loại hàng</span>
                </div>
                <div className="product__info__quantity">
                    <div>
                        <span className="product__info__size__title">Số lượng</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 10, opacity: colorActive !== "" && indexActive !== "0" ? 1 : 0.5 }}>
                        <div className="product__info__quantity__wrapper">
                            <FontAwesomeIcon
                                className="product__info__quantity__btn"
                                icon={faCaretLeft}
                                onClick={() => {
                                    colorActive !== "" && indexActive !== "0" && countQuantity > 1 && setcountQuantity(countQuantity - 1);
                                }}
                            />
                            <input
                                className="product__info__quantity__input"
                                name="quantity"
                                type="number"
                                disabled={colorActive !== "" && indexActive !== "0" ? false : true}
                                value={countQuantity}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon className="product__info__quantity__btn" icon={faCaretRight} onClick={handleChangeQuantity} />
                        </div>
                        <div className="product__info__quantity__text">
                            <span>{getCountQuantity()} sản phẩm có sẵn</span>
                        </div>
                    </div>
                </div>
                <div className="product__info__btn-cart__wrapper btn__shoppee">
                    <img
                        className="btn__shoppee__image"
                        src="https://firebasestorage.googleapis.com/v0/b/estella-da659.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng.jpg?alt=media&token=4191c7df-e4ce-4f61-b376-e4192409b6f8"
                        alt=""
                    />
                    <span className="btn__shoppee__text">
                        Mua ngay với <p>shopee</p>
                    </span>
                </div>
                <div className="product__info__btn-cart__wrapper">
                    <button onClick={() => handleAddCart("Add")}>
                        <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: 5 }} /> Thêm Vào Giỏ Hàng
                    </button>
                    <button onClick={() => handleAddCart("Cart")}>Mua ngay</button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
