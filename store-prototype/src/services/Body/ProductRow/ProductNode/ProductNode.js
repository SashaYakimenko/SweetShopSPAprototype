import styles from "./ProductNode.module.css";
import React from "react";
import { DetailsBar } from "./DetailsBar/DetailsBar";
import { useNavigate } from "react-router-dom";
import image from "../../../../assets/pictures/Waffle.png";

export function ProductNode({ nodeData, isVisible, setIsVisible, index})
{
    const [price, setPrice] = React.useState(999);

    var nav = useNavigate();
    return(
        <>
            <div className={styles.productNode} style={{margin: "10px"}}>
                <div className={styles.imageContainer}>
                    <img src={image} alt="image not found" onClick={() => {nav(`${nodeData.link}/:${nodeData.id}`)}}></img>
                </div>
                <DetailsBar isVisible={isVisible} setIsVisible={setIsVisible} name="Barried waffle" price={price}/>
            </div>
        </>
    )
}