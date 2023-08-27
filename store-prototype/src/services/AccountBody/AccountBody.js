import styles from "./AccountBody.module.css";
import React from "react";
import { NavNode } from "./NavNode/NavNode.js";
import { PersonalDataBody } from "./DataBodies/PersonalInfo/PersonalInfoDataBody.js";
import { CartDataBody } from "./DataBodies/Cart/CartDataBody";
import { CommentsDataBody } from "./DataBodies/Comments/CommentsDataBody";
import { OrdersDataBody } from "./DataBodies/Orders/OrdersDataBody";
import { SelectedDataBody } from "./DataBodies/Selected/SelectedDataBody";
import { SupportDataBody } from "./DataBodies/Support/SupportDataBody";
import { ViewedDataBody } from "./DataBodies/Viewed/ViewedDataBody";


export function AccountBody({mobileEnteredState, setMobileEnteredState, setModalActiveState, modalActiveState ,nickname}) 
{
    const [dataBodyState, setDataBodyState] = React.useState(0);
    const navNodeData = [{text: "Personal Info", icon: "icons/personalAccIcon.svg"}, {text: "Cart", icon: "icons/cartIcon.png"}, {text: "Orders", icon: "icons/ordersIcon.png"}, {text: "Selected", icon: "icons/selectedIcon.png"}, {text: "Viewed", icon: "icons/viewedIcon.png"}, {text: "Comments", icon: "icons/commentedIcon.png"},  {text: "Support", icon: "icons/supportIcon.png"}, {text: "Exit", icon: "icons/exitIcon.png"}];
    

    const animationObsereRef = React.useRef();
    const fromDesktopRef = React.useRef();
    const mobileXMoveBlock = React.useRef(false);

    const ResizeHandler = () => {
        if(window.innerWidth > 770) {
            if(!fromDesktopRef.current) fromDesktopRef.current = true;
        }
        if(window.innerWidth <= 770){
            if(dataBodyState == 0) setMobileEnteredState(true);
            if(fromDesktopRef.current) {
                setModalActiveState(true);
                fromDesktopRef.current = false;
            }
        }
        if(window.innerWidth <= 480){
            if(!mobileXMoveBlock.current) {
                document.body.style.setProperty("overflow-x", "hidden");
                mobileXMoveBlock.current = true;
            }
        }
        else if (window.innerWidth > 480){
            if(mobileXMoveBlock.current) {
                document.body.style.setProperty("overflow-x", "visible");
                mobileXMoveBlock.current = false;
            }
        }
    }

    const animationStartHandler = () => {
        document.body.style.setProperty("overflow", "hidden");
    }

    const animationEndHandler = () => {
        document.body.style.setProperty("overflow", "visible");
    }

    React.useEffect(() => {
        if(window.innerWidth > 770) fromDesktopRef.current = true;
        else fromDesktopRef.current = false;

        if(window.innerWidth <= 480 && mobileXMoveBlock) {
            document.body.style.setProperty("overflow-x", "hidden");
            mobileXMoveBlock.current = true;
        }
        window.addEventListener("resize", ResizeHandler);

        const ref = animationObsereRef.current;

        ref.addEventListener("animationstart", animationStartHandler);
        ref.addEventListener("animationend", animationEndHandler);
        return () => {
            window.removeEventListener("resize", ResizeHandler);
            ref.removeEventListener("animationstart", animationStartHandler);
            ref.removeEventListener("animationend", animationEndHandler);
            console.log("collected");
        }
    },[])


    var dataBodyChoice = () => {};
    switch(dataBodyState){
        case 0:
            dataBodyChoice = () => {return (<PersonalDataBody nickname={nickname}/>)};
            break;
        case 1:
            dataBodyChoice = () => {return (<CartDataBody />)};
            break;
        case 2:
            dataBodyChoice = () => {return (<OrdersDataBody />)};
            break;
        case 3:
            dataBodyChoice = () => {return (<SelectedDataBody />)};
            break;
        case 4:
            dataBodyChoice = () => {return (<ViewedDataBody />)};
            break;
        case 5:
            dataBodyChoice = () => {return (<CommentsDataBody />)};
            break;
        case 6:
            dataBodyChoice = () => {return (<SupportDataBody />)};
            break;
    }

    return(
        <div className={styles.accountWrapper}>
            <div className={styles.border}></div>
            <div className={styles.valuePlaceWrap}>
                <div className={styles.titlePart}>
                    <h2>Hello, {nickname}</h2>
                </div>
                <div className={styles.contentPart}>
                    <div className={styles.navBar}>
                        {navNodeData.map((item, index) => {return <NavNode key={index} selfBodyValue={index} setAccountModalState={setModalActiveState} bodyState={dataBodyState} setBodyState={setDataBodyState} text={item.text} icon={item.icon} />})}
                    </div>
                    <div className={styles.interceptor}></div>
                    <div className={styles.dataBody}>
                        {dataBodyChoice()}
                    </div>
                </div>
            </div>
            <div className={(modalActiveState)? styles.modalWrapper : styles.disabled + " " + styles.modalWrapper} onMouseDown={(e) => {
                let bubbled = false;
                e?.target?.classList.forEach((item) => { 
                    if(!(item == styles.modalWrapper || item == styles.disabled)){bubbled = true} })

                if(!bubbled){
                    setModalActiveState(false);
                    fromDesktopRef.current = false;
                }}}>
                <div ref={animationObsereRef} className={(modalActiveState)? (mobileEnteredState)? styles.goBack + " " + styles.dataBodyMobileModal : styles.dataBodyMobileModal :  (mobileEnteredState)?  styles.disabled + " " + styles.goBack + " "  + styles.dataBodyMobileModal : styles.disabled + " " + styles.dataBodyMobileModal}>
                    {dataBodyChoice()}
                </div>
            </div>
            <div className={styles.border}></div>
        </div>
    )
}