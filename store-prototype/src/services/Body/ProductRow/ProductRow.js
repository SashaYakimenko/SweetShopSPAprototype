import React from "react";
import { ProductNode } from "./ProductNode/ProductNode.js";
import styles from "./ProductRow.module.css";

export function ProductRow({listOfDatas, isVisible, setIsVisible})
{
    var isTwoPart = false;
    if (listOfDatas.length > 2) isTwoPart = true;
    
    return(
        <div className={styles.rowWrapper}>
            <div className={styles.firstHalf}>
                {listOfDatas.map((item, index) => {if (index < 2 ) return <ProductNode key={item.id} nodeData={item} isVisible={isVisible} setIsVisible={setIsVisible} index={index}/>})}
            </div>
            <div className={styles.secondHalf} style={(isTwoPart)? {display:"flex"} : {display:"none"}}>
                {listOfDatas.map((item, index) => {if (index >= 2 ) return <ProductNode key={item.id} nodeData={item} isVisible={isVisible} setIsVisible={setIsVisible} index={index}/>})}
            </div>
        </div>
    )
}