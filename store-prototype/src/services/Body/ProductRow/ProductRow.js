import React from "react";
import { ProductNode } from "./ProductNode/ProductNode.js";
import styles from "./ProductRow.module.css";

export function ProductRow({listOfDatas, isVisible, setIsVisible, lastRow})
{
    const [isBreaking, setIsBreaking] = React.useState(false);
    var isTwoPart = false;

    const wrapRef = React.useRef();

    if (listOfDatas.length > 2) isTwoPart = true;

    var nodesMarginedOffset;

    const resizeHandler = () => {
        const { clientWidth } = wrapRef.current || {};
        const { childNodes } = wrapRef.current || {};
        //console.log(wrapRef);
        var productNodesArr = [];
        nodesMarginedOffset = 0;
        childNodes.forEach((item) => {item.childNodes.forEach(item => {productNodesArr.push(item)}) });
        productNodesArr.forEach((item) => {nodesMarginedOffset += item.offsetWidth + parseInt(item.style.marginLeft) + parseInt(item.style.marginRight)})
        if(nodesMarginedOffset >= clientWidth) {
            setIsBreaking(true);}
        else {
            setIsBreaking(false);}
        console.log(clientWidth);
        console.log(nodesMarginedOffset);
      };
    
    React.useEffect(() => {
        window.onresize = resizeHandler;

        return () => {window.onresize = false};
    }, []);

    console.log("rerender");
    console.log(isBreaking);
    return(
        <div ref={wrapRef} className={styles.rowWrapper} style={(isBreaking)? {flexDirection:"column"} : {flexDirection:"row"}}>
            <div className={styles.firstHalf}>
                {listOfDatas.map((item, index) => {if (index < 2 ) return <ProductNode key={item.id} nodeData={item} isVisible={isVisible} setIsVisible={setIsVisible}/>})}
            </div>
            <div className={styles.secondHalf} style={(isTwoPart)? {display:"flex"} : {display:"none"}}>
                {listOfDatas.map((item, index) => {if (index >= 2 ) return <ProductNode key={item.id} nodeData={item} isVisible={isVisible} setIsVisible={setIsVisible}/>})}
            </div>
        </div>
    )
}