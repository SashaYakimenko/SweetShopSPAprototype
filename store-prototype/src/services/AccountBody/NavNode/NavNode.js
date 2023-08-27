import React from "react";
import styles from "./NavNode.module.css";
import { useNavigate } from "react-router-dom";

export function NavNode({setAccountModalState, text, bodyState, setBodyState, icon, selfBodyValue})
{
    var nav = useNavigate();
    var textValue = text.replaceAll(" ", "");
    return(
        <div className={(bodyState == selfBodyValue) ? styles.navNode + " " + styles.active + " " + styles[textValue] 
        : styles.navNode+ " " + styles[textValue]} onMouseDown={e => {if(selfBodyValue == 0) setAccountModalState(true);
                                                                      if(selfBodyValue != 7)setBodyState(selfBodyValue);
                                                                      else {setBodyState(selfBodyValue);
                                                                            nav("/");}}}>
            <div style={{backgroundImage:`url(${icon})`}} className={styles.iconNode} />
            <p className={styles.optionName}>{text}</p>
        </div>
    )
}