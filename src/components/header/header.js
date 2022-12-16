import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css"
import PlusIcon from "../plusIcon/plusIcon";

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect (() => {
        if(location.pathname === "/"){
            setActiveTab("Home");
        } else if (location.pathname === "/add"){
            setActiveTab("AddCave");
        }
        },[location]);
    return(
        <div className="header">
            <h1 className="logo">Speleo-Log</h1>
            <div className="header-right">
                <Link className="link" to="/" >
                    <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
                        Home
                    </p>
                </Link>
                <Link className="link" to="/add" >
                    <p className={`${activeTab === "AddCave" ? "active" : ""}`} onClick={() => setActiveTab("AddCave")}>
                        Add Cave &nbsp;  <PlusIcon></PlusIcon>
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Header;