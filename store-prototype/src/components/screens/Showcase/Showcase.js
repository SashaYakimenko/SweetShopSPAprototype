import "../../../assets/styles/global.css";
import "../../../assets/styles/Ubuntu.css";
import "../../../assets/styles/Inter.css";
import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../services/Header/Header.js";
import { ShowcaseBody } from "../../../services/ShowcaseBody/ShowcaseBody.js";

export function Showcase()
{

    var commentsData = [{Author: "Bob Dilon", DateOfUpload: "22 December 2021", Message: "Are they would braking the law of my stomach?", Likes: 0, Dislikes: 0, Answers: [{Author: "Paul Alan", DateOfUpload: "23 December 2021", Message: "If they want glow you`ll got it !!! If they want glow you`ll got it !!! If they want glow you`ll got it !!! If they want glow you`ll got it !!! If they want glow you`ll got it !!!", Likes: 2, Dislikes: 0}, {Author: "Paul Alan", DateOfUpload: "23 December 2021", Message: "If they want glow you`ll got it !!! If they want glow you`ll got it !!! If they want glow you`ll got it !!! If they want glow you`ll got it !!! If they want glow you`ll got it !!!", Likes: 2, Dislikes: 0}] },
                        {Author: "Bob Dilon", DateOfUpload: "22 December 2021", Message: "Are they would braking the law of my stomach?", Likes: 0, Dislikes: 0, Answers: [{Author: "Paul Alan", DateOfUpload: "23 December 2021", Message: "If they want glow you`ll got it ?", Likes: 2, Dislikes: 0}] }];
    
    var productData = {Title: "Belgian waffles with chocolate", AdditionalTitleInfo: {Portion: "300 grams"}, Price: "999 grn", Description: "U popa bula sobaka pop ee lubil" };
    return(
        <div className="showcaseWrapper">
            <header>
                <Header />
            </header>
            <main>
                <ShowcaseBody productData={productData} commentsData={commentsData} address={"ShowcaseWaffleTemplate.png"}/>
            </main>
            <footer>
            </footer>
        </div>
    )
}