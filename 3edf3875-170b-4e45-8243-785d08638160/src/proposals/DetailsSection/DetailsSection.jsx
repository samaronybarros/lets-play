import React from "react";
import classNames from "classnames";

import "./DetailsSection.css";

const DetailsSection = ({ className, name, children }) => (
    <section className={classNames("DetailsSection", className)}>
        <div className="DetailsSection__name">
            {name} {children}
        </div>
        <div className="DetailsSection__content"/>
    </section>
);

export default DetailsSection;
