import React from "react";
import styles from "../PersonalInfoDataBody.module.css";
import { AccountPhoneInput } from "./AccountPhoneInput.js";


export function PhoneInputNode({ errors, setFocus, register, inputActiveState, setInputActiveState, stopState, setStopState, adaptiveErrorMessageState, shrinkedState}){
    var blurArrive = React.useRef(false);
    const [phoneBag, setPhoneBag] = React.useState({count: 0, mode: 0});

    const blurCallBack = React.useCallback(() => {
        if(blurArrive.current)setInputActiveState(false)}, [blurArrive.current]);

    React.useLayoutEffect(() => {
        setInputActiveState(false);
    }, [])

    React.useEffect(() => {
        stopState || setFocus("phone");
    },)

    React.useEffect(() => {
        if(inputActiveState){
            blurArrive.current = true;
            setStopState(true);
        }
    }, [inputActiveState])

    return(
        <>
            <div className={styles.phoneFlexWrapper}>
                <label htmlFor={"a-p-phone"} style={(shrinkedState)? {display:"none"} : {display:"block"}} className={styles.phoneLabel}>Phone:</label>
                <div className={(errors?.phone)? styles.notValid + " " + styles.active + " " + styles.inputWrapper : (inputActiveState) ? styles.active + " " + styles.inputWrapper : styles.inputWrapper}>
                    <AccountPhoneInput setActiveState={setInputActiveState} bag={phoneBag} setBag={setPhoneBag} callBack={blurCallBack} register={register} errors={errors} id={"a-p-phone"}/>
                    <label style={(shrinkedState)? {display:"block"} : {display:"none"}} htmlFor={"a-p-phone"} className={(errors?.phone)? styles.notValid + " " + styles.phoneLabel : styles.phoneLabel}>Phone:</label>
                    <label style={(shrinkedState)? {display:"none"} : {display:"block"}} htmlFor={"a-p-phone"} className={(errors?.phone)? styles.notValid + " " + styles.floatingDesc : styles.floatingDesc}>Phone</label>
                </div>
                <div style={(adaptiveErrorMessageState)? {display:"none"} : {display:"block"}} className={styles.errorMessage}>{(errors?.phone) && <p>{errors?.phone?.message ?? "phone value error"}</p>}</div>
            </div>
            <div style={(adaptiveErrorMessageState)? {display:"block"} : {display:"none"}} className={styles.adaptiveErrorMessage }>{(errors?.phone) && <p>{errors?.phone?.message ?? "phone value error"}</p>}</div>
        </>
    )
};