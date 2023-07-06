import React from "react";
import styles from "./NavBar.module.css";
import { SiteNavBarNode } from "./SiteNavBarNode/SiteNavBarNode.js";
import { useNavigate } from "react-router-dom";

export function SiteNavBar({ NavData })
{
    var nav = useNavigate();
    return(
        <nav className="adaptiveNav">
            <ul className={styles.navContainer}>
            {
                NavData.map((item) => {
                        return <li className={styles.navItem} key={item.id} onClick={() => {nav(item.address);}}><SiteNavBarNode address={item.address}/></li>
                    })
            }
            </ul>
        </nav>
    )
}