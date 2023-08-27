import React from "react";
import styles from "./Header.module.css";
import { SiteNavBar } from "./NavBar/SiteNavBar.js";
import { SearchBar } from "./SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { MenuModal } from "./AdaptiveMenuModal/MenuModal.js";
import { LogInModal } from "./LogInModal/LogInModal.js";
import { RegistrationModal } from "./RegistrationModal/RegistrationModal.js"

export function Header({setAccModalActive, mobileEnteredState})
{
    var nav = useNavigate();
    const [menuState, setMenuState] = React.useState(false);
    const [logModalState, setLogModalState] = React.useState(false);
    const [registerModalState, setRegisterModalState] = React.useState(false);
    const [fromReg, setFromReg] = React.useState(false);

    return(
        <div className={styles.headerContentContainer}>
            <div className={styles.desktopContentContainer}> 
                <div className={styles.headerContainer + " adaptiveWrapper"}>
                    {(menuState) ? <div className={styles.mobileMenuButtonActive} onClick={() => {if (menuState === true) setMenuState(false)
                        else setMenuState(true)}}/> : <div className={styles.mobileMenuButton} onClick={() => {if(setAccModalActive && mobileEnteredState) setAccModalActive(false)
                            if (menuState === true) setMenuState(false)
                            else setMenuState(true)}}/> }
                    <div className={styles.header}>
                        <p className={styles.title} onClick={(e) => {nav("/")}}>Candice Candies</p>
                    </div>
                    <div className={styles.titleInterceptor} />
                    <div className={styles.searchBar}>
                        <SearchBar  />
                    </div>
                    <div className={styles.interceptor} />
                    <div onClick={(e) => {nav("/ordering")}} className={styles.cart} />
                    <div onClick={(e) => {setLogModalState(true);}} className={styles.personalAcc} />
                    <div className={styles.mobileSearchButton}></div>
                </div>
                <SiteNavBar NavData={[{address:"/waffles", id:0},{address:"/pancakes", id:1},{address:"/chocolate", id:2},{address:"/cakes", id:3},{address:"/candies", id:4}]}/>
            </div>
            <MenuModal accModalState={logModalState} setAccModalState={setLogModalState} menuState={menuState} setMenuState={setMenuState} NavData={[{address:"/waffles", id:0},{address:"/pancakes", id:1},{address:"/chocolate", id:2},{address:"/cakes", id:3},{address:"/candies", id:4}]}/>
            <LogInModal regState={registerModalState} setRegState={setRegisterModalState} logState={logModalState} setLogState={setLogModalState} fromReg={fromReg} setFromReg={setFromReg}/>
            <RegistrationModal regState={registerModalState} setRegState={setRegisterModalState} logState={logModalState} setLogState={setLogModalState} setFromReg={setFromReg}/>
        </div>
    )
}