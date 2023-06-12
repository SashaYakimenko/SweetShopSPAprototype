import React from "react";
import styles from "./AddToCartModal.module.css";

export function AddToCartModal({isVisible, setIsVisible})
{
    return(<div className="modalWrapper" onClick={(e) => {setIsVisible(false)}} style={(isVisible)? {display:"flex"} : {display:"none"}}><div className={styles.content} onClick={(e) => {e.stopPropagation();}}>Modal</div></div>);
}