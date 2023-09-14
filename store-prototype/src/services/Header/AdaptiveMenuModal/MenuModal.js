import React from "react";
import styles from "./MenuModal.module.css";
import { useNavigate } from "react-router-dom";
import { SiteNavBarNode } from "../NavBar/SiteNavBarNode/SiteNavBarNode.js";

export function MenuModal({NavData, menuState, setMenuState, setAccModalState, accModalState})
{
    const nav = useNavigate();
    const [dropActive, setDropActive] = React.useState(false);
    const containerRef = React.useRef();
    const navigationRef = React.useRef();

    const resizeHandler = () => {if (window.innerWidth >= 1025) {
        setMenuState(false);}};

    React.useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    }, []);

    if (menuState) document.body.style.setProperty("overflow", "hidden");
    else document.body.style.setProperty("overflow", "visible");

    React.useEffect(() =>{
        if(menuState && accModalState) setMenuState(false);
    }, [setAccModalState, accModalState, menuState]);

    function renderEnterHighlight(index)
    {
        let temp = undefined;
        containerRef.current.childNodes.forEach((item, innerIndex) => {
            
            if(innerIndex === index && index !== 0)
            {
                temp.childNodes.forEach((item) => {if(item.nodeName === "DIV"){
                    item.style.setProperty("background-color", "#fda98f");
                }})
                item.childNodes.forEach((item) => {if(item.nodeName === "DIV"){
                    item.style.setProperty("background-color", "#fda98f");
                }})
            }
            else if (innerIndex === index)
            {
                navigationRef.current.childNodes[1].style.setProperty("background-color", "#fda98f");
                item.childNodes.forEach((item) => {if(item.nodeName === "DIV")item.style.setProperty("background-color", "#fda98f");})
            }
            temp = item;
        })
    }

    function renderLeaveHighlight(index)
    {
        let temp = undefined;
        containerRef.current.childNodes.forEach((item, innerIndex) => {

            if(innerIndex === index && index !== 0)
            {
                temp.childNodes.forEach((item) => {if(item.nodeName === "DIV"){
                    item.style.setProperty("background-color", "#fdaaa9cc")
                }})
                item.childNodes.forEach((item) => {if(item.nodeName === "DIV"){
                    item.style.setProperty("background-color", "#fdaaa9cc");
                }})
            }
            else if (innerIndex === index)
            {
                navigationRef.current.childNodes[1].style.setProperty("background-color", "#fdaaa9cc");
                item.childNodes.forEach((item) => {if(item.nodeName === "DIV")item.style.setProperty("background-color", "#fdaaa9cc");})
            }
            temp = item;
        })
    }

    return(
        <div onMouseDown={() => {setMenuState(false)} } className={(menuState) ? styles.modalMenuWrapper + " modalMenuAdaptiveHeaderFix " + styles.active : styles.modalMenuWrapper + " modalMenuAdaptiveHeaderFix"}>
            <div className={(menuState) ? styles.modalContent + " " + styles.active + " menuModalMobileStyle" : styles.modalContent + " menuModalMobileStyle"} onMouseDown={(e) => {e.stopPropagation();}}>
                    <div className={styles.personalCabinetButtonWrapper} onClick={()=>{setAccModalState(true);}}>
                        <div className={styles.personalCabinetButton}>
                            <div className={styles.cabinetIcon} />
                            <p>Personal account</p>
                        </div>
                        <div className={styles.line} />
                    </div>
                    <div ref={navigationRef} className={styles.navigationButtonWrapper} onClick={() => {if(dropActive) setDropActive(false);
                    else setDropActive(true);}}>
                        <div className={styles.navigationButton}  >
                            <div className={styles.navigationIcon} />
                            <p>Navigation</p>
                        </div>
                        <div className={styles.line} />
                    </div>
                <nav className={styles.navigationListWrapper}>
                    <ul className={(dropActive) ? styles.navContainer + ` ${styles.dropActive}` : styles.navContainer} ref={containerRef}>
                        {NavData.map((item, index) => {return (<span key={item.id} ><li className={styles.navItem} onMouseEnter={(e) => {renderEnterHighlight(index)}}  onMouseLeave={(e) => {renderLeaveHighlight(index)}}onClick={() => {nav(item.address);}}><SiteNavBarNode address={item.address}/></li>
                            <div className={styles.line} /></span>)})}
                    </ul>
                </nav>
            </div>
        </div>
    )
}