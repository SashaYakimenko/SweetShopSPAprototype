import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Main} from "./screens/Main/Main.js";
import React from "react";
import { Showcase } from "./screens/Showcase/Showcase.js";
import { Account } from "./screens/Account/Account.js";


export function Routing()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/:product?" element={<Main />} />
                <Route path="/account" element={<Account />} />
                <Route path="/showcase/:id" element={<Showcase />}/>
                <Route path="/ordering" element={<Main child={() => {return<h1>Mmmm... Account 0_0 -_- 0_0 chhgm... ew Ordering</h1>}}/>}/> 
                <Route path="/cartplus/:id/:count" element/>
            </Routes>
        </BrowserRouter>
    )
}