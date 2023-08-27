import React from "react";
import styles from "./CommentNode.module.css";
import { AnswerNode } from "./AnswerNode";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function CommentNode({data, stat, id})
{
    const {register, formState:{errors, isValid}, handleSubmit, reset, setFocus} = useForm({
        mode:"onBlur",
        defaultValues:{
            newCommentValue: ""
        }
    });
    const nav = useNavigate();
    const [reactionsState, setReactions] = React.useState({like:false, dislike:false});
    const [newCommentState, setNewCommentState] = React.useState(false);
    const [newLineState, setNewLineState] = React.useState(1);
    const [areaActive, setAreaActive] = React.useState(false);

    function HandlePublish(data){
        console.log(data);
    }

    return(
        <div className={styles.commentContent}>
            <div className={styles.question}>
                <div className={styles.author} ><h3>{data.Author}</h3></div>
                <div className={styles.body} >
                    <div className={styles.date}><p>{"Question:" + ` ${data.DateOfUpload}`}</p></div>
                    <div className={styles.message}><p>{data.Message}</p></div>
                    <div className={styles.answerWrapper}>
                        <div className={styles.activeAnswerWrapper}>
                            <div className={styles.answerLink} onMouseDown={(e)=>{e.stopPropagation();
                            setNewCommentState((prev) => {
                                if(!prev) return true;
                                else return false;
                            })}}>
                                <p>Comment</p>
                            </div>
                            <div className={(newCommentState)? styles.active + " " + styles.answerDownButton : styles.answerDownButton} onMouseDown={(e)=>{e.stopPropagation();
                            setNewCommentState((prev) => {
                                if(!prev) return true;
                                else return false;
                            })}}></div>
                        </div>
                        <div className={styles.answerCounter}>
                            {(data.Answers.length > 0) ? `${data.Answers.length} Comments` : "" }
                        </div>
                    </div>
                </div>
                <div className={styles.reaction} >
                    <div className={styles.likeButton} onMouseDown={() => {setReactions((prev) => {if(!prev.like){
                                                                                                        if (!prev.dislike) return {...reactionsState, like: true}
                                                                                                        else return {dislike:false, like: true}}
                                                                                                else{
                                                                                                        return {dislike:false, like: false}
                                                                                                }
                                                                                                    })}} />
                    <div className={styles.likeCounter}>{stat.likes + reactionsState.like}</div>
                    <div className={styles.dislikeButton} onMouseDown={() => {setReactions((prev) => {if(!prev.dislike)
                                                                                                        if (!prev.like) return {...reactionsState, dislike: true}
                                                                                                        else{
                                                                                                            return {dislike:true, like: false}
                                                                                                        }
                                                                                                    else{
                                                                                                        return {dislike:false, like: false}
                                                                                                    }
                                                                                                        })}} />
                    <div className={styles.dislikeCounter}>{stat.dislikes + reactionsState.dislike}</div>
                </div>
            </div>
            <div className={styles.commentWrap}>
                <div className={styles.commentInterceptor}></div>
                <div className={styles.commentField} style={(newCommentState)? {display:"block"} : {display:"none"}} >
                    <p className={styles.profileMark}>Current profile is <span className={styles.profileLink} onMouseDown={() => {nav("/account")}}>UserName</span></p>
                    <form onSubmit={handleSubmit(HandlePublish, (data) => {console.log(`error with: ${data}`)})}>
                        <div className={(areaActive)? styles.active + " " + styles.commentTextWrapper : styles.commentTextWrapper}>
                            <textarea required id={("c-userComment") + `${id}`} onFocus={() => {setAreaActive(true)}}
                                    onKeyDown={(e) => {if(e.key == "Enter") setNewLineState(prev => {return prev + 1;});
                                                        else if(e.key == "Backspace" && e.target.value[e.target.value.length - 1] == "\n") setNewLineState(prev => {return prev - 1;})}} style={{height: (newLineState * 21) + "px" }}
                            className={styles.newComment} {...register("newCommentValue", {required: "Field is empty",
                                                                                        onBlur: () => {setAreaActive(false)}})}>
                            </textarea>
                            <label htmlFor={("c-userComment") + `${id}`}>Your comment</label>
                        </div>
                        <button onClick={(e) => {if(!isValid) {setFocus(Object.keys(errors)[0]);}}} className={styles.submitButton}><p>Add comment</p></button>
                    </form>
                </div>
            </div>
            <div className={styles.commentAnswers}>
                {data.Answers.map((item, index) => {return <AnswerNode data={item} key={index} level={1} stat={{likes: 0, dislikes: 0}}/>})}
            </div>
        </div>
    )
}