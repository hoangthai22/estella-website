import { faMoneyBillAlt } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getAddressCity, getAddressDistric, getAddressWard } from "../../apis/apiCaller";
import { caculatorVND } from "../../constants/Caculator";
import { CHECKOUT_PAGE, LOCALSTORAGE_NAME } from "../../constants/Pages";
import { AppContext } from "../../contexts/AppProvider";
import "./../main.scss";
import "./ConfirmPage.scss";

const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập tên của bạn").max(50, "Tối đa 50 ký tự"),
    address: yup.string().required("Vui lòng nhập địa chỉ của bạn").max(50, "Tối đa 50 ký tự"),
    city: yup.string().required("Vui lòng chọn tỉnh thành"),
    distric: yup.string().required("Vui lòng chọn quận huyện"),
    ward: yup.string().required("Vui lòng chọn xã phường"),
    phone: yup.string().required("Vui lòng nhập số điện thoại của bạn").max(15, "Tối đa 15 ký tự"),
    email: yup.string().required("Vui lòng nhập Email của bạn").max(50, "Tối đa 50 ký tự").email("Vui lòng nhập Email"),
});

const ConfirmPage = (props) => {
    const { currentPage, setCurrentPage } = useContext(AppContext);
    const [total, setTotal] = useState(0);
    const [paymentType, setpaymentType] = useState(-1);
    const history = useNavigate();
    const [listCart, setlistCart] = useState([]);
    const [listCity, setListCity] = useState([]);
    const [listDistric, setListDistric] = useState([]);
    const [listWard, setListWard] = useState([]);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        props.callbackFunc(CHECKOUT_PAGE);
        setCurrentPage(CHECKOUT_PAGE);
        const CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
        var totalPrice = 0;
        CartList?.map((item) => {
            return (totalPrice = item.price + totalPrice);
        });
        setTotal(totalPrice);
        setlistCart(CartList);

        getAddressCity().then((res) => {
            setListCity(res.data.results);
        });
    }, [props, setCurrentPage]);

    const handleChosseDistric = (id) => {
        console.log(id);
        if (id !== "") {
            getAddressDistric(id).then((res) => {
                setListDistric(res.data.results);
            });
        } else {
            setListDistric([]);
        }
    };

    const handleChosseWard = (id) => {
        if (id !== "") {
            getAddressWard(id).then((res) => {
                setListWard(res.data.results);
            });
        } else {
            setListWard([]);
        }
    };
    const onSubmit = (data) => {
        console.log({ data });
    };
    const hanldeBackCart = () => {
        history("/cart");
    };
    const handleChangePaymentType = (type) => {
        setpaymentType(type);
    };
    return (
        <div className="confirm__page__container" style={{ marginBottom: 50 }}>
            <div style={{ marginTop: 100, marginBottom: 50 }}></div>
            <div className="input__cart__wrapper">
                <form style={{ width: "50%", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ fontSize: 24, fontWeight: 700, paddingBottom: 20 }}>
                        <span>Thông tin nhận hàng</span>
                    </div>
                    {/* <div>
                        <span style={{ fontWeight: 500 }}>Họ và tên</span>
                    </div> */}
                    <div style={{ height: 60 }}>
                        <input type="text" placeholder="Họ và tên" className="input__cart" {...register("fullName")} />
                    </div>
                    {errors.fullName && <span className="error">{errors.fullName?.message}</span>}
                    <div style={{ height: 60 }}>
                        <input type="text" placeholder="Số điện thoại" className="input__cart" {...register("phone")} />
                    </div>
                    {errors.phone && <span className="error">{errors.phone?.message}</span>}
                    <div style={{ height: 60 }}>
                        <input type="text" placeholder="Email " className="input__cart" {...register("email")} />
                    </div>
                    {errors.email && <span className="error">{errors.email?.message}</span>}

                    <div style={{ height: 60 }}>
                        <input type="text" placeholder="Địa chỉ " className="input__cart" {...register("address")} />
                    </div>
                    {errors.address && <span className="error">{errors.address?.message}</span>}
                    <div style={{ height: 60 }} {...register("city")}>
                        <select name="city" placeholder="Tỉnh thành " onChange={(e) => handleChosseDistric(e.target.value)} className="input__cart" style={{ height: 44, width: "calc(100% + 14px)" }}>
                            <option value="">-- Tỉnh thành --</option>
                            {listCity.length > 0 &&
                                listCity?.map((city) => {
                                    return <option value={city.province_id}>{city.province_name}</option>;
                                })}
                        </select>
                    </div>
                    {errors.city && <span className="error">{errors.city?.message}</span>}
                    <div style={{ height: 60 }} {...register("distric")}>
                        <select name="distric" disabled={listDistric.length === 0 && "true"} placeholder="Quận huyện" onChange={(e) => handleChosseWard(e.target.value)} className="input__cart" style={{ height: 44, width: "calc(100% + 14px)" }}>
                            <option value="">-- Quận huyện --</option>
                            {listDistric.length > 0 &&
                                listDistric?.map((city) => {
                                    return <option value={city.district_id}>{city.district_name}</option>;
                                })}
                        </select>
                    </div>
                    {errors.distric && <span className="error">{errors.distric?.message}</span>}
                    <div style={{ height: 60 }} {...register("ward")}>
                        <select name="ward" disabled={listWard.length === 0 && "true"} placeholder="Phường xã" className="input__cart" style={{ height: 44, width: "calc(100% + 14px)" }}>
                            <option value="">-- Phường xã --</option>
                            {listWard.length > 0 &&
                                listWard?.map((city) => {
                                    return <option value={city.ward_id}>{city.ward_name}</option>;
                                })}
                        </select>
                    </div>
                    {errors.ward && <span className="error">{errors.ward?.message}</span>}
                    <div style={{ height: 60 }}>
                        <textarea placeholder="Ghi chú" shape="" coords="" className="input__cart" style={{ height: 70 }} href="" alt="" />
                    </div>
                    <div className="payment__total">
                        <div style={{ fontSize: 24, fontWeight: 700 }}>
                            <span>Tổng cộng</span>
                        </div>

                        <div className="payment__cart__checkout">
                            <span>Tổng tiền hàng</span>
                            <span style={{ marginLeft: 0 }}>{caculatorVND(total) + "₫"}</span>
                        </div>
                        <div className="payment__cart__checkout">
                            <span>Phí vận chuyển</span>
                            <span style={{ marginLeft: 0 }}>30.000 ₫</span>
                        </div>
                        <div className="payment__cart__checkout">
                            <span style={{ marginRight: 0 }}>Tổng cộng</span>
                            <span style={{ marginLeft: 0, fontSize: 22, fontWeight: 600 }}>{caculatorVND(total + 30000) + "₫"}</span>
                        </div>
                    </div>
                    <div className="product__info__btn-cart__wrapper btn_payment" style={{ marginTop: 30, cursor: "pointer" }}>
                        <span style={{ width: "50%", textAlign: "center", margin: "auto", color: "#db7093" }} onClick={hanldeBackCart}>
                            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: 16, color: "#db7093", marginRight: "5px" }} />
                            Quay lại giỏ hàng
                        </span>
                        <input
                            type="submit"
                            value={"Đặt hàng"}
                            style={{ width: "100%", fontSize: 20, fontWeight: 500, height: 50, opacity: paymentType === -1 ? 0.5 : 1 }}
                            disabled={paymentType === -1 ? true : false}
                        />
                    </div>
                </form>
                <div style={{ width: "50%", marginLeft: 50, display: "flex", flexDirection: "column" }}>
                    <div style={{ alignSelf: "start", width: "90%" }}>
                        <div style={{ fontSize: 24, fontWeight: 700 }}>
                            <span>Đơn hàng</span>
                            <div className="">
                                {listCart.map((item) => {
                                    return (
                                        <div className="checkout__cart__wrapper">
                                            <div className="checkout__cart__image__wrapper">
                                                <div className="checkout__cart__image">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <div className="checkout__cart__quantity">{item.quantity}</div>
                                            </div>

                                            <div className="checkout__cart__name">
                                                <span className="">{item.name}</span>
                                                <span className="">{item.color}/{item.size}</span>
                                            </div>
                                            <div className="checkout__cart__price">
                                                <span className="">{caculatorVND(item.price) + "₫"}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* <div style={{ alignSelf: "start" }}>
                        <div style={{ fontSize: 24, fontWeight: 700 }}>
                            <span>Tổng cộng</span>
                        </div>

                        <div className="payment__cart">
                            <span>Tổng tiền hàng</span>
                            <span style={{ marginLeft: 50 }}>{caculatorVND(total)}</span>
                        </div>
                        <div className="payment__cart">
                            <span>Phí vận chuyển</span>
                            <span style={{ marginLeft: 50 }}>30.000 VND</span>
                        </div>
                        <div className="payment__cart">
                            <span style={{ marginRight: 37 }}>Tổng cộng</span>
                            <span style={{ marginLeft: 50, fontSize: 22, fontWeight: 600 }}>{caculatorVND(total + 30000)}</span>
                        </div>
                    </div> */}
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 700, paddingTop: 30 }}>
                            <span>Hình thức thanh toán</span>
                        </div>
                        <div className="checkout__type__wrapper">
                            <div>
                                <div className="checkout__type__atm" onClick={() => handleChangePaymentType(0)}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div style={{ marginRight: 15 }}>
                                            <input type="radio" checked={paymentType === 0 ? true : false} name="payment" id="" className="checkout__type__input" />
                                        </div>
                                        <div className="checkout__type__text">Chuyển khoản qua ngân hàng</div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faMoneyBillAlt} style={{ fontSize: 18, color: "#1990c6" }} />
                                    </div>
                                </div>
                                <div className="checkout__type__content" style={{ display: paymentType === 0 ? "block" : "none" }}>
                                    <p>💳 VIETCOMBANK chi nhánh Sài Gòn</p>
                                    <p>Hà Mỹ Ngân</p>
                                    <p>0331000411069</p>
                                    <p style={{ marginTop: 30 }}>💳 VIETINBANK chi nhánh Sài Gòn</p>
                                    <p>Hà Mỹ Ngân</p>
                                    <p>0331000411069</p>
                                    <p style={{ marginTop: 30 }}>Nội dung gồm WEB - tên khách - số điện thoại</p>
                                    <p>Vd: WEB - xxx - 090xxxxxxx</p>
                                    <p style={{ marginTop: 30 }}>Nếu huỷ đơn báo lại ngay giúp shop</p>
                                    <p>Estella xin cảm ơn quý khách !!!</p>
                                </div>
                            </div>
                            <div className="border"></div>
                            <div>
                                <div className="checkout__type__COD" onClick={() => handleChangePaymentType(1)}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div style={{ marginRight: 15 }}>
                                            <input type="radio" checked={paymentType === 1 ? true : false} name="payment" id="" className="checkout__type__input" />
                                        </div>
                                        <div className="checkout__type__text">Thanh toán khi giao hàng (COD)</div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faMoneyBillAlt} style={{ fontSize: 18, color: "#1990c6" }} />
                                    </div>
                                </div>
                                <div className="checkout__type__content" style={{ display: paymentType === 1 ? "block" : "none" }}>
                                    <p>Kiểm tra lại số đt giúp shop, nếu gọi không được quá 3 ca, đơn hàng sẽ tự động huỷ đơn ạ ☹️</p>
                                    <p>Hỗ trợ đổi hàng :</p>
                                    <p>📞 098 100 3000</p>
                                    <p>Chú ý điện thoại shipper gọi ạ</p>
                                    <p>Estella xin cảm ơn quý khách !!!</p>
                                    <p>Nếu huỷ đơn báo lại ngay giúp shop</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPage;
