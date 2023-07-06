import styles from "./DetailsBar.module.css";
import React from "react";


export function DetailsBar({ price, name, isVisible, setIsVisible})
{
    const [ productCount, setProductCount ] = React.useState(0);
    const [ clicked, setClicked ] = React.useState({plus:false, minus:false}); 

    return(
        <>
            <p className={styles.productName} >{name}</p>
            <div className={styles.detailsContainer}>
                <p className={styles.price}>{price} grn / unit</p>
                <div className={styles.countBlock}>
                    <div className={styles.countWrapper}>
                        <div onClick={(e) => {setProductCount((prev) => { if (prev > 0 ) return prev - 1;
                        return prev;
                        })}} className={styles.minus + ` ${(clicked.minus)? styles.clicked : ""}`} onMouseDown={(e) => {setClicked({...clicked, minus:true})}} onMouseUp={(e) => {setClicked({...clicked, minus:false})}} />
                        <p className={styles.count}>{productCount}</p>
                        <div onClick={(e) => {setProductCount((prev) => {return prev + 1;})}} onMouseDown={(e) => {setClicked({...clicked, plus:true})}} onMouseUp={(e) => {setClicked({...clicked, plus:false})}} className={styles.plus + ` ${(clicked.plus)? styles.clicked : ""}`} />
                    </div>
                    <div className={styles.underline} />
                </div>
                <div className={styles.addToCartButton} onClick={(e) => {
                    if(!isVisible) setIsVisible(true);
                }}>
                    <div alt=" icon not found" className={styles.addToCartIcon}/>
                </div>
            </div>
        </>
    )
}