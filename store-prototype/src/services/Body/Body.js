import React from "react"
import { AddToCartModal } from "./AddToCartModal/AddToCartModal.js";
import styles from "./Body.module.css";
import { ProductRow } from "./ProductRow/ProductRow.js";

export function Body()
{
    const [isVisible, setIsVisible] = React.useState(false);

    var nodeData = [{id: 1, link:"/showcase"}, {id: 2, link:"/showcase"}, {id: 3, link:"/showcase"},{id: 4, link:"/showcase"}, {id: 5, link:"/showcase"}, {id: 6, link:"/showcase"},{id: 7, link:"/showcase"}, {id: 8, link:"/showcase"}, {id: 9, link:"/showcase"}, {id: 10, link:"/showcase"}, {id: 11, link:"/showcase"}, {id: 12, link:"/showcase"}];
    var changedData = [];
    var temp = [];
    for(let i = 0; i < (nodeData.length - (nodeData.length % 4)) / 4 ; i++)
    {
        for(var j = (0 + (4 * i)); j < 4 * (i + 1); j++)
        {
            temp.push(nodeData[j]);
        }
        changedData[i] = Array.from(temp, node => {return Object.assign({}, node)});
        temp = [];
    }

    for(let i = nodeData.length - (nodeData.length % 4); i < nodeData.length; i++)
    {
        temp.push(nodeData[i]);
        if((i + 1) == nodeData.length) changedData[changedData.length] = Array.from(temp, node => {return Object.assign({}, node)});
    }

    return(
    <div className={styles.bodyWrapper}> 
        <AddToCartModal isVisible={isVisible} setIsVisible={setIsVisible}/>
        {changedData.map((item, index, arr) => { if (index + 1 == arr.length) return <ProductRow isVisible={isVisible} setIsVisible={setIsVisible} listOfDatas={item} key={index} lastRow={true}/>
            return <ProductRow isVisible={isVisible} setIsVisible={setIsVisible} listOfDatas={item} key={index}/>})}
    </div>
    )
}