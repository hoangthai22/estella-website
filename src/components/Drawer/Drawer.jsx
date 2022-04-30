// @flow
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppProvider";
import "./Drawer.scss";
export const DrawerContent = () => {
    const history = useNavigate();
    const { categoryList, setIsOpenDrawer } = React.useContext(AppContext);
    const [isOpenCategory, setisOpenCategory] = React.useState(false);
    const hanldeOpenCategory = () => {
        setisOpenCategory(!isOpenCategory);
    };
    const handleSubmitCategory = (id, slug, categoryName) => {
        setIsOpenDrawer(false);
        history("/" + slug, { state: { id: id, categoryName: categoryName } });
    };
    return (
        <div className="drawer__wrapper">
            <div className="drawer__wrapper__item" onClick={hanldeOpenCategory}>
                <span>Danh mục sản phẩm</span>
                <div>{"❯"}</div>
            </div>
            <div
                className="drawer__category__wrapper"
                style={{
                    display: isOpenCategory ? "block" : "none",
                    // visibility: isOpenCategory ? "visible" : "hidden",
                    // transform: isOpenCategory ? "translateY(0em)" : "translateY(-50em)",
                }}
            >
                <ul className="drawer__category__list">
                    {categoryList.map((item) => {
                        return <li key={item._id} onClick={() => handleSubmitCategory(item._id, item.slug, item.categoryName)}>{item.categoryName}</li>;
                    })}
                </ul>
            </div>
            <div className={`drawer__wrapper__item ${isOpenCategory && "border__top"}`}>Help me chooses!</div>
            <div className="drawer__wrapper__item">Khuyến mãi</div>
            <div className="drawer__wrapper__item">Về chúng mình</div>
            <div className="drawer__wrapper__item">Câu hỏi thường gặp</div>
            <div className="drawer__wrapper__item">
                <span>Đăng nhập</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 14 }} icon={faSignIn} />
                </div>
            </div>
            <div className="drawer__wrapper__item">
                <span>Đăng xuất</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 14 }} icon={faSignOut} />
                </div>
            </div>
        </div>
    );
};
