import "./ListCategory.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

const ListCategory = () => {
  const history = useNavigate();
  const handleRedirectCategory = () =>{
    history('/category/1')
  }
  return (
    <div className="listCategory__wrapper">
      <div className="listCategory__container">
        <div className="listCategory__item double double__mobile" style={{width:"50%"}}>
          <div className="listCategory__item__wrapper" onClick={handleRedirectCategory}>
            <img className="listCategory__item__img" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Component_24.png" alt="" />
          </div>
        </div>
        <div className="listCategory__item">
          <div className="listCategory__item__wrapper">
            <img className="listCategory__item__img" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Screen_Shot_2021_12_20_at_4_19_58_PM.png" alt="" />
          </div>
        </div>
        <div className="listCategory__item">
          <div className="listCategory__item__wrapper">
            <img className="listCategory__item__img" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Component_23.png" alt="" />
          </div>
        </div>
        <div className="listCategory__item">
          <div className="listCategory__item__wrapper">
            <img className="listCategory__item__img" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Component_22.png" alt="" />
          </div>
        </div>
        <div className="listCategory__item">
          <div className="listCategory__item__wrapper">
            <img className="listCategory__item__img" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Component_26.png" alt="" />
          </div>
        </div>
        <div className="listCategory__item">
          <div className="listCategory__item__wrapper">
            <img className="listCategory__item__img" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Component_27.png" alt="" />
          </div>
        </div>
        <div className="listCategory__item half">
          <div className="listCategory__item__wrapper">
            <img alt="" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Component_21.png" className="listCategory__item__half__img"></img>
          </div>
          <div className="listCategory__item__wrapper">
            <img alt="" src="https://storage.googleapis.com/cdn.nhanh.vn/store/22767/bn/Component_28.png" className="listCategory__item__half__img"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
