import React from "react";
import styles from "./NavBar.module.css";
import { SiteNavBarNode } from "./SiteNavBarNode/SiteNavBarNode.js";

export function SiteNavBar({ NavData })
{
    return(
        <nav >
            <ul className={styles.navContainer}>
            {
                NavData.map((item) => {
                        return <li className={styles.navItem} key={item.id}><SiteNavBarNode address={item.address}/></li> 
                    })
            }
            </ul>
        </nav>
    )
}
