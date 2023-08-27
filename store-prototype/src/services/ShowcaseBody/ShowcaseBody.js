import React from "react";
import styles from "./ShowcaseBody.module.css";
import { CommentNode } from "./CommentNode/CommentNode.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function ShowcaseBody({address, commentsData, productData})
{
    const {register, formState:{errors, isValid}, handleSubmit, reset, setFocus} = useForm({
        mode:"onBlur",
        defaultValues:{
            newCommentValue: "",
        }
    });

    const {register: register2, formState:{errors2, isSubmitted}, handleSubmit: handleSubmit2, setValue, reset: reset2} = useForm({
        mode:"onSubmit",
        defaultValues:{
            addToCartButton: "",
            selectButton: ""
        }
    });

    const nav = useNavigate();

    const [newCommentState, setNewCommentState] = React.useState(false);
    const [newLineState, setNewLineState] = React.useState(1);
    const [areaActive, setAreaActive] = React.useState(false);

    const [ productCount, setProductCount ] = React.useState(0);
    const [ clicked, setClicked ] = React.useState({plus:false, minus:false});

    function HandlePublishRoot(data){
        console.log(data);
        setNewCommentState(false);
    }

    function HandleAddToCart(data){
        if(data?.addToCartButton){
            console.log(productData.Title + " " + data.addToCartButton);
            
        }
        else if(data?.selectButton){
            console.log(productData.Title + " " +  data.selectButton);
            console.log("blop");
        }
        
    }
    
    React.useEffect(() => {
        reset2();
        console.log("vanished");
    }, [isSubmitted]);
    
    return(
        <div className={styles.showcaseWrapper}>
            <div className={styles.borderLeft}></div>
            <div className={styles.showcaseContent}>
                <div className={styles.line} />
                <div className={styles.productSection}>
                    <div className={styles.productImageWrapper}>
                        <img src={"/images/" + `${address}`} alt="Image not found" className={styles.productImage}></img>
                   </div>
                    <div className={styles.productInfo}>
                        <div className={styles.floatingInterceptorWrap}>
                            <div className={styles.productTitle}>
                                <h2 className={styles.productTitleText}>{(productData.Title ?? "Not found")}</h2>
                                <p className={styles.productSubTitleText}>{"Portion - " + productData.AdditionalTitleInfo.Portion ?? "Not found"}</p>
                            </div>
                        </div>
                        <div className={styles.floatingInterceptorWrap} style={{display:"inline-block"}}>
                            <div className={styles.productInteraction + " "  + `${styles.adaptiveColumn}`}>
                                <div className={styles.inlineBreakLineFix} style={{padding: "10px 0px 0px 10px"}}>
                                    <p className={styles.productPriceText}>{ (productData.Price ?? "Not found") + " / portion" }</p>
                                    <div className={styles.countBlock}>
                                        <div className={styles.countWrapper}>
                                            <div onClick={(e) => {setProductCount((prev) => { if (prev > 0 ) return prev - 1;
                                            return prev;
                                            })}} className={styles.minus + ` ${(clicked.minus)? styles.clicked : ""}`} onMouseDown={(e) => {setClicked({...clicked, minus:true})}} onMouseUp={(e) => {setClicked({...clicked, minus:false})}} />
                                            <p className={styles.count} style={{cursor:"default"}}>{productCount}</p>
                                            <div onClick={(e) => {setProductCount((prev) => {return prev + 1;})}} onMouseDown={(e) => {setClicked({...clicked, plus:true})}} onMouseUp={(e) => {setClicked({...clicked, plus:false})}} className={styles.plus + ` ${(clicked.plus)? styles.clicked : ""}`} />
                                        </div>
                                        <div className={styles.underline} />
                                    </div>
                                </div>
                                <div className={styles.inlineBreakLineFix} style={{marginBottom: "10px", padding: "10px 10px 0px 10px"}}>
                                    <form style={{position:"relative"}} onSubmit={handleSubmit2(HandleAddToCart, (data) => {console.log(productData.Title + "wasn`t added to cart due to error")})}>
                                        <button className={styles.addToCartButton} {...register2("addToCartButton")} onMouseDown={() => {setValue("addToCartButton", "added to cart")}}>
                                            <p>Purchase</p>
                                            <div className={styles.addToCartIcon} />
                                        </button>
                                    </form>
                                    <form style={{position:"relative"}} onSubmit={handleSubmit2(HandleAddToCart, (data) => {console.log(productData.Title + "wasn`t added to cart due to error")})}>
                                        <button className={styles.selectButton} {...register2("selectButton")} onMouseDown={() => {setValue("selectButton", "selected")}}>
                                                <div className={styles.selectIcon} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={styles.floatingInterceptorWrap}>
                            <div className={styles.productDescription}>
                                <p>{ productData.Description ?? "Not found"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.line} />
                <div className={styles.addCommentWrap} style={(newCommentState)? {display:"none" } : {display:"flex" }}>
                    <div className={styles.addCommentButton} onMouseDown={(e) => {setNewCommentState(true)}}>
                        <div className={styles.vertical}  />
                        <div className={styles.horizontal}/>
                    </div>
                </div>
                <div className={styles.commentField} style={(newCommentState)? {display:"block"} : {display:"none"}} >
                    <div className={styles.valueSpaceWrap}>
                        <p className={styles.profileMark}>Current profile is <span className={styles.profileLink} onMouseDown={() => {nav("/account")}}>UserName</span></p>
                        <form onSubmit={handleSubmit(HandlePublishRoot, (data) => {console.log(`error with: ${data}`)})}>
                            <div className={(areaActive)? styles.active + " " + styles.commentTextWrapper : styles.commentTextWrapper}>
                                <textarea required id="c-userComment" onFocus={() => {setAreaActive(true)}}
                                        onKeyDown={(e) => {if(e.key == "Enter") setNewLineState(prev => {return prev + 1;});
                                                            else if(e.key == "Backspace" && e.target.value[e.target.value.length - 1] == "\n") setNewLineState(prev => {return prev - 1;})}} style={{height: (newLineState * 21) + "px" }}
                                className={styles.newComment} {...register("newCommentValue", {required: "Field is empty",
                                                                                            onBlur: () => {setAreaActive(false)}})}>
                                </textarea>
                                <label htmlFor="c-userComment">Your comment</label>
                            </div>
                            <button onClick={(e) => {if(!isValid) {setFocus(Object.keys(errors)[0]);}}} className={styles.submitButton}><p>Add comment</p></button>
                        </form>
                    </div>
                </div>
                <div className={styles.commentSection}>
                    {commentsData.map((item, index) => {return <CommentNode data={item} stat={{likes: 0, dislikes: 0}} key={index} id={index}/>})}
                </div>
            </div>
            <div className={styles.borderRight}></div>
        </div>
    )
}