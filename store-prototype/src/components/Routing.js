import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Main} from "./screens/Main/Main.js";
import React from "react";
export function Routing()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/:product?" element={<Main />} />
                <Route path="/account" element={<Main />}/>
                <Route path="/authentication" element={<Main />}/>
                <Route path="/registration" element={<Main />}/>
                <Route path="/showcase/:id" element={<Main />}/>
                <Route path="/ordering" element={<Main />}/> 
            </Routes>
        </BrowserRouter>
    )
}