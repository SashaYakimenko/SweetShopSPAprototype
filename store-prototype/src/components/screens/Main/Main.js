import React from "react";
import "../../../assets/styles/global.css"
import {SiteNavBar} from "../../../services/Header/NavBar/SiteNavBar.js"
import { useParams } from "react-router-dom";

function Main() {
    const { product } = useParams();

    var Body = undefined;
    switch (product) {
        case "waffles" :
            Body= () => {return(<h1>Mmmm... waffles</h1>)};
            window.history.pushState(null, null, "/waffles");
        break;
        case "pancakes" :
            Body= () => {return(<h1>Mmmm... pancakes</h1>)};
        break;
        case "chocolate" :
            Body= () => {return(<h1>Mmmm... chocolate</h1>)};
        break;
        case "cakes" :
            Body= () => {return(<h1>Mmmm... cakes</h1>)};
        break;
        case "candies" :
            Body= () => {return(<h1>Mmmm... candies</h1>)};
        break;
        default: Body= () => {return(<h1>Mmmm... nothing</h1>)};
        break;
    }
    return(
        <>
            <header>
                <SiteNavBar NavData={[{address:"/waffles", id:0},{address:"/pancakes", id:1},{address:"/chocolate", id:2},{address:"/cakes", id:3},{address:"/candies", id:4}]}/>
            </header>
            <main>
                <Body />
            </main>
            <footer>

            </footer>
        </>
    )
}

export {Main};