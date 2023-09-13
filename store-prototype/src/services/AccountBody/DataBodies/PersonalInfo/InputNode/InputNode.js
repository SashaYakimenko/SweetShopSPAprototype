import React from "react";
import styles from "../PersonalInfoDataBody.module.css";


export function InputNode ({ errors, setFocus, labelValue, registerValue, register, idValue, inputActiveState, setInputActiveState, stopState, setStopState, adaptiveErrorMessageState, shrinkedState}) {

    var inputRef = React.useRef(null)
    var blurArrive = React.useRef(false);

    const blurCallBack = React.useCallback(() => {
        if(blurArrive.current)setInputActiveState({...inputActiveState, first:false})}, [blurArrive.current]);

    const {ref, ...rest} = register(registerValue, {required: "This field is required", onBlur: blurCallBack});


    React.useLayoutEffect(() => {
        setInputActiveState({...inputActiveState, first:false});
    }, [])

    React.useEffect(() => {
        stopState || setFocus(registerValue);
    },)

    React.useEffect(() => {
        if(inputActiveState.first){
            blurArrive.current = true;
            setStopState(true);
        }
    }, [inputActiveState.first])

    return(
        <>
            <label htmlFor={idValue} style={(shrinkedState)? {display:"none"} : {display:"block"}} className={styles.nameLabel}>First name:</label>
            <div className={(errors?.firstName)? styles.notValid + " " + styles.active + " " + styles.inputWrapper : (inputActiveState.first) ? styles.active + " " + styles.inputWrapper : styles.inputWrapper}>
                <input type="text" required id={idValue} {...rest} name={registerValue} ref={(e) => {
                    ref(e);
                    inputRef.current = e;
                } } className={styles.firstNameInput} onFocus={() => {setInputActiveState({...inputActiveState, first:true})}}></input>
                <label htmlFor={idValue} style={(shrinkedState)? {display:"block"} : {display:"none"}} className={(errors?.firstName)?  styles.notValid + " " + styles.nameLabel : styles.nameLabel }>First name:</label>
                <label htmlFor={idValue} style={(shrinkedState)? {display:"none"} : {display:"block"}} className={(errors?.firstName)? styles.notValid + " " + styles.floatingDesc : styles.floatingDesc}>{labelValue}</label>
            </div>
            <div style={(adaptiveErrorMessageState)? {display:"none"} : {display:"block"}} className={styles.errorMessage}>{(errors?.firstName) && <p>{errors?.firstName?.message ?? "First name error"}</p>}</div>
        </>
    )
};