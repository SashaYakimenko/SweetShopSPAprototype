import React from "react";
import "../../../assets/styles/global.css";
import { Header } from "../../../services/Header/Header.js";
import { useParams } from "react-router-dom";

function Main({child}) {

    const { product } = useParams();
    var Body = child;
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
        default: if(Body === undefined) Body= () => {return(<h1>Mmmm... nothing</h1>)};
        break;
    }
    return(
        <>
            <header>
                <Header />
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