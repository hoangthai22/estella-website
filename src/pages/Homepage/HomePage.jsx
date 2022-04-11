import React, { useContext,useEffect } from "react";

import { HOME_PAGE } from "../../constants/Pages";
import { AppContext } from "../../contexts/AppProvider";
import HelpMeChoose from "./HelpMeChoose/HelpMeChoose";
import HotProduct from "./HotProduct/HotProduct";
import ListCategory from "./ListCategory/ListCategory";
import "./../main.scss";
import Policy from "./Policy/Policy";
import Sliders from "./Slider/Slider";

function HomePage(props) {
  const { currentPage, setCurrentPage } = useContext(AppContext);
  useEffect(() => {
    props.callbackFunc(HOME_PAGE);
    setCurrentPage(HOME_PAGE);
  });

  return (
    <div>
      <div className="content">
        <Sliders />
        <ListCategory />
        <HelpMeChoose />
        <Policy />
        <HotProduct />
      </div>
    </div>
  );
}

export default HomePage;
