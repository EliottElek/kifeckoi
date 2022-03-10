import React, { useState } from "react";
import "./Tabs.css";
const Tabs = ({ children, style }) => {
  const [currentTab, setCurrentTab] = useState(children[0]);
  return (
    <div className="tabs-container" style={style}>
      <div className="tabs-labels-container">
        {children.map((tab, i) => (
          <div
            className={
              tab.props.label === currentTab.props.label
                ? "tabs-label-item active-tab"
                : "tabs-label-item"
            }
            key={i}
            onClick={() => setCurrentTab(tab)}
          >
            {tab.props.label}
          </div>
        ))}
      </div>
      
      <div className="tab-content">{currentTab}</div>
    </div>
  );
};

export default Tabs;
