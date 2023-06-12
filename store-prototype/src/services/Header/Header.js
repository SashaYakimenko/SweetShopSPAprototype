import React from "react";
import styles from "./Header.module.css";
import { SiteNavBar } from "./NavBar/SiteNavBar.js";
import { SearchBar } from "./SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

export function Header()
{
    var nav = useNavigate();
    return(
        <>
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <h1 onClick={(e) => {nav("/")}} className={styles.title}>Candice&Candies</h1>
                </div>
                <div className={styles.searchBar}>
                    <SearchBar  />
                </div>
                <div className={styles.interceptor} />
                <div onClick={(e) => {nav("/account")}} className={styles.personalAcc} />
                <div onClick={(e) => {nav("/ordering")}} className={styles.cart} />
            </div>
            <SiteNavBar NavData={[{address:"/waffles", id:0},{address:"/pancakes", id:1},{address:"/chocolate", id:2},{address:"/cakes", id:3},{address:"/candies", id:4}]}/>
        </>
    )
}