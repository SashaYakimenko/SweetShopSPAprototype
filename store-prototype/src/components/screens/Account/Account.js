import "../../../assets/styles/global.css";
import "../../../assets/styles/Ubuntu.css";
import "../../../assets/styles/Inter.css";
import { useParams } from "react-router-dom";
import { Header } from "../../../services/Header/Header.js";
import { AccountBody } from "../../../services/AccountBody/AccountBody";
import React from "react";

export function Account (){
    const [accPageModalActiveState, setAccPageModalActiveState] = React.useState(true);
    const [mobileEnteredState, setMobileEnteredState] = React.useState(false);

    return(
    <div className="accountWrapper">
        <header>
            <Header mobileEnteredState={mobileEnteredState} setAccModalActive={setAccPageModalActiveState} />
        </header>
        <main>
            <AccountBody mobileEnteredState={mobileEnteredState} setMobileEnteredState={setMobileEnteredState} setModalActiveState={setAccPageModalActiveState} modalActiveState={accPageModalActiveState} nickname={"Arnold"}/>
        </main>
        <footer>

        </footer>
    </div>
    )
}