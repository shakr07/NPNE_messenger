import React from "react";
import "./Sidebar.css";
import { Button } from "@/components/ui/button"
const makeRoom=()=>{
  
}
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Chat with League</h2>
      <div className="providers">
        <h2>Chat with your providers</h2>
        <div className="provider">
          <p><strong> Hello</strong> - xyz</p>
        </div>
        <div className="provider">
          <p><strong>feiaw</strong> - Bootcamp specialist</p>
        </div>
        <div className="provider">
          <p><strong>Kelvin</strong> wertyu</p>
        </div>
       
      </div>
   
    </div>
  );
};

export default Sidebar;
