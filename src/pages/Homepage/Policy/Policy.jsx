import React from "react";
import { ReactComponent as IconShip } from "../../../assests/img/iconPl1.svg";
import { ReactComponent as IconArrow } from "../../../assests/img/iconPl2.svg";
import { ReactComponent as IconCard } from "../../../assests/img/iconPl3.svg";
import "./Policy.scss";

const Policy = () => {
  return (
    <div className="policy__wrapper">
      <div className="policy__container">
        <div className="policy__item">
          <IconShip className="policy__item__icon"/>
          <span className="policy__item__text-bold">Free shipping</span>
          <p className="policy__item__text">FREESHIP với hóa đơn trên 700.000đ</p>
        </div>
        <div className="policy__item">
          <IconArrow className="policy__item__icon"/>
          <span className="policy__item__text-bold">second life</span>
          <p className="policy__item__text">Chính sách Đổi Hàng dễ dàng!</p>
        </div>
        <div className="policy__item">
          <IconCard className="policy__item__icon"/>
          <span className="policy__item__text-bold">Ưu đãi hấp dẫn</span>
          <p className="policy__item__text">Khuyễn mãi lên tới 50% khi có thẻ thành viên</p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
