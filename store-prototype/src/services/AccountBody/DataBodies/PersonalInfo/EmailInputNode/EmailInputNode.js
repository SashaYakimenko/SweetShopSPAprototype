import React from "react";
import styles from "../PersonalInfoDataBody.module.css";


export function EmailInputNode({ errors, setFocus, register, inputActiveState, setInputActiveState, stopState, setStopState, adaptiveErrorMessageState}){
    var blurArrive = React.useRef(false);

    const blurCallBack = React.useCallback(() => {
        if(blurArrive.current)setInputActiveState(false)}, [blurArrive.current]);

    React.useLayoutEffect(() => {
        setInputActiveState(false);
    }, [])

    React.useEffect(() => {
        stopState || setFocus("email");
    },)

    React.useEffect(() => {
        if(inputActiveState){
            blurArrive.current = true;
            setStopState(true);
        }
    }, [inputActiveState])

    return(
        <>
            <div className={styles.emailFlexWrapper}>
                <label htmlFor={"a-p-email"} className={styles.emailLabel}>Email address:</label>
                <div className={(errors?.email)? styles.notValid + " " + styles.active + " " + styles.inputWrapper : (inputActiveState) ? styles.active + " " + styles.inputWrapper : styles.inputWrapper}>
                    <input className={styles.emailInput} type="text" required onFocus={() => {setInputActiveState(true)}} id={"a-p-email"} {...register("email", {required: "this field is required", pattern: {value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Incorrect email value"} , onBlur: blurCallBack})}></input>
                    <label htmlFor={"a-p-email"} className={(errors?.email)? styles.notValid + " " + styles.floatingDesc : styles.floatingDesc}>Email</label>
                </div>
                <div style={(adaptiveErrorMessageState)? {display:"none"} : {display:"block"}} className={styles.errorMessage}>{(errors?.email) && <p>{errors?.email?.message ?? "email value error"}</p>}</div>
            </div>
            <div style={(adaptiveErrorMessageState)? {display:"block"} : {display:"none"}} className={styles.adaptiveErrorMessage }>{(errors?.email) && <p>{errors?.email?.message ?? "email value error"}</p>}</div>
        </>
    )
};

