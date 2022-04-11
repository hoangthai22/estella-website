// @flow
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import "./Loading.scss";

export const Loading = () => {
    function useImperativeDisableScroll({ element, disabled }) {
        useEffect(() => {
            if (!element) {
                return;
            }

            element.style.overflowY = disabled ? "hidden" : "scroll";

            return () => {
                element.style.overflowY = "scroll";
            };
        }, [disabled]);
    }
    useImperativeDisableScroll({ element: document.body, disabled: true });
    

    return (
        <div className="loading__container">
            <div className="loading__wrapper">
                <FontAwesomeIcon className="fa-spin loading" icon={faSpinner} />
            </div>
        </div>
    );
};
