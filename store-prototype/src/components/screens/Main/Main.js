import React from "react";
import "../../../assets/styles/global.css";
import "../../../assets/styles/Ubuntu.css";
import "../../../assets/styles/Inter.css";
import { Header } from "../../../services/Header/Header.js";
import { useParams } from "react-router-dom";
import { Body } from "../../../services/Body/Body.js";

function Main({child}) {

    var { product } = useParams();
    var BodyPlate = child;
    switch (product) {
        case "waffles" :
            BodyPlate= () => {return(<Body />)}
        break;
        case "pancakes" :
            BodyPlate= () => {return(<h1>Mmmm... pancakes</h1>)};
        break;
        case "chocolate" :
            BodyPlate= () => {return(<h1>Mmmm... chocolate</h1>)};
        break;
        case "cakes" :
            BodyPlate= () => {return(<h1>Mmmm... cakes</h1>)};
        break;
        case "candies" :
            BodyPlate= () => {return(<h1>Mmmm... candies</h1>)};
        break;
        default: if(BodyPlate === undefined) BodyPlate= () => {return(<h1>Mmmm... nothing</h1>)};
        break;
    }
    return(
        <div className="mainWrapper">
            <header>
                <Header />
            </header>
            <main>
                <BodyPlate />
            </main>
            <footer>

            </footer>
        </div>
    )
}

export {Main};