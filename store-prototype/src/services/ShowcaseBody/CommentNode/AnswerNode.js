import styles from "./CommentNode.module.css";
import React from "react";

export function AnswerNode({data, level, stat}){

    const [reactions, setReactions] = React.useState({like: false, dislike: false});

    return(
        <div className={styles.answer}>
            <div className={styles.author} ><h3 style={{marginLeft:`${level * 45}px`}} >{data.Author}</h3></div>
            <div className={styles.body} >
                <div className={styles.date}><p>{"Answer:" + ` ${data.DateOfUpload}`}</p></div>
                <div className={styles.message}><p>{data.Message}</p></div>
            </div>
            <div className={styles.reaction} >
                <div className={styles.likeButton} onMouseDown={() => {setReactions((prev) => {if(!prev.like){
                                                                                                    if (!prev.dislike) return {...reactions, like: true}
                                                                                                    else return {dislike:false, like: true}}
                                                                                               else{
                                                                                                    return {dislike:false, like: false}
                                                                                               }
                                                                                                })}} />
                <div className={styles.likeCounter}>{stat.likes + reactions.like}</div>
                <div className={styles.dislikeButton} onMouseDown={() => {setReactions((prev) => {if(!prev.dislike)
                                                                                                    if (!prev.like) return {...reactions, dislike: true}
                                                                                                    else{
                                                                                                        return {dislike:true, like: false}
                                                                                                    }
                                                                                                  else{
                                                                                                    return {dislike:false, like: false}
                                                                                                  }
                                                                                                    })}} />
                <div className={styles.dislikeCounter}>{stat.dislikes + reactions.dislike}</div>
            </div>
        </div>
    )
}