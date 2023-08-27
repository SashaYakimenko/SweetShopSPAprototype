import React from "react";
import styles from "./PersonalInfoDataBody.module.css";
import { useForm } from "react-hook-form";
import { InputNode } from "./InputNode/InputNode.js";
import { EmailInputNode } from "./EmailInputNode/EmailInputNode.js"
import { PhoneInputNode } from "./PhoneInputNode/PhoneInputNode.js";


export function PersonalDataBody({nickname}){

    const [allDataMode, setAllDataMode] = React.useState(false);
    const [nameChangingState, setNameChangingState] = React.useState(false);
    const [emailChangingState, setEmailChangingState] = React.useState(false);
    const [phoneChangingState, setPhoneChangingState] = React.useState(false);
    const [adaptiveErrorMessageState, setAdaptiveErrorMessageState] = React.useState(false);
    const [adaptiveLabelState, setAdaptiveLabelState] = React.useState(false);

    const [inputActiveState, setInputActiveState] = React.useState({first: false, middle: false, last: false});
    const [emailInputActiveState, setEmailInputActiveState] = React.useState(false);
    const [phoneInputActiveState, setPhoneInputActiveState] = React.useState(false);

    const [stopState, setStopState] = React.useState(false);

    const {register: registerName, formState:{errors: errorsName, isValid: isValidName, dirtyFieldsName: dirtyFieldsName}, handleSubmit: handleSubmitName, reset: resetName, setFocus: setFocusName, setValue: setValueName} = useForm({
        mode:"onBlur",
        defaultValues:{
            firstName: ``,
            middleName: ``,
            lastName: ``,
        }
    });

    const {register: registerEmail, formState:{errors: errorsEmail, isValid: isValidEmail, dirtyFieldsName: dirtyFieldsEmail}, handleSubmit: handleSubmitEmail, reset: resetEmail, setFocus: setFocusEmail, setValue: setValueEmail } = useForm({
        mode: "onBlur",
        defaultValues:{
            email: ``
        }
    });

    const {register: registerPhone, formState:{errors: errorsPhone, isValid: isValidPhone, dirtyFieldsName: dirtyFieldsPhone}, handleSubmit: handleSubmitPhone, reset: resetPhone, setFocus: setFocusPhone, setValue: setValuePhone } = useForm({
        mode: "onBlur",
        defaultValues:{
            phone: ``
        }
    })


    function HandleNameChange(data) {
        console.log(data);
        resetName();
        setNameChangingState(false);
        setStopState(false);
    }

    function HandleEmailChange(data) {
        console.log(data);
        resetEmail();
        setEmailChangingState(false);
        setStopState(false);
    }

    function HandlePhoneChange(data) {
        console.log(data);
        resetPhone();
        setPhoneChangingState(false);
        setStopState(false);
    }

    const ResizeHandler = () => {
        if(window.innerWidth <= 655){
            setAdaptiveErrorMessageState(true);
        }
        else if(window.innerWidth > 655){
            setAdaptiveErrorMessageState(false);
        }
    }

    React.useEffect(() => {
        window.addEventListener("resize", ResizeHandler);

        return () => {
            window.removeEventListener("resize", ResizeHandler);
        }
    },[])

    return(
        <div className={styles.personalDataWrapper}>
            <h3 onMouseDown={() => {setNameChangingState(false)}}>Contact inforamation</h3>
            <div className={styles.inactiveNameWrapper} style={(nameChangingState)? {display:"none"} : {display:"flex"}}>
                <p className={styles.nameLabel}>Full name:</p>
                <p className={styles.fullName}>{nickname}</p>
                <p className={styles.toggle} onMouseDown={() => {
                    if(!emailChangingState && !phoneChangingState){
                        setValueName("firstName", nickname);
                        setNameChangingState(true)
                    }
                    }}>change</p>
            </div>
            <div className={styles.activeNameWrapper} style={(nameChangingState)? {display:"block"} : {display:"none"}}>
                <form onSubmit={handleSubmitName(HandleNameChange, (data) => {console.log("form submit error", data)})}>
                    <div className={styles.firstBlock}>
                        <InputNode adaptiveErrorMessageState={adaptiveErrorMessageState} errors={errorsName} stopState={stopState} setStopState={setStopState} inputActiveState={inputActiveState} setInputActiveState={setInputActiveState} register={registerName} labelValue={"First name"} registerValue={"firstName"} setFocus={setFocusName} idValue={"a-p-first"}/>
                    </div>
                    <div style={(adaptiveErrorMessageState)? {display:"block"} : {display:"none"}} className={styles.adaptiveErrorMessage }>{(errorsName?.firstName) && <p>{errorsName?.firstName?.message ?? "First name error"}</p>}</div>
                    <div className={styles.middleBlock}>
                        <label htmlFor={"a-p-middle"} className={styles.nameLabel}>Middle name:</label>
                        <div className={(errorsName?.middleName)? styles.notValid + " " + styles.active + " " + styles.inputWrapper : (inputActiveState.middle) ? styles.active + " " + styles.inputWrapper : styles.inputWrapper}>
                            <input type="text" required id="a-p-middle" {...registerName("middleName", {onBlur: () => {setInputActiveState({...inputActiveState, middle:false})}, required: "This field is required"} )} className={styles.middleNameInput} onFocus={() => {setInputActiveState({...inputActiveState, middle:true})}}></input>
                            <label htmlFor={"a-p-middle"} className={(errorsName?.middleName)? styles.notValid + " " + styles.floatingDesc : styles.floatingDesc}>Middle name</label>
                        </div>
                        <div style={(adaptiveErrorMessageState)? {display:"none"} : {display:"block"}} className={styles.errorMessage }>{(errorsName?.middleName) && <p>{errorsName?.middleName?.message ?? "middle name error"}</p>}</div>
                    </div>
                    <div style={(adaptiveErrorMessageState)? {display:"block"} : {display:"none"}} className={styles.adaptiveErrorMessage }>{(errorsName?.middleName) && <p>{errorsName?.middleName?.message ?? "middle name error"}</p>}</div>
                    <div className={styles.lastBlock}>
                        <label htmlFor={"a-p-last"} className={styles.nameLabel}>Last name:</label>
                        <div className={(errorsName?.lastName)? styles.notValid + " " + styles.active + " " + styles.inputWrapper : (inputActiveState.last) ? styles.active + " " + styles.inputWrapper : styles.inputWrapper}>
                            <input type="text" required id="a-p-last" {...registerName("lastName", {onBlur: () => {setInputActiveState({...inputActiveState, last:false})}, required: "This field is required"} )} className={styles.lastNameInput} onFocus={() => {setInputActiveState({...inputActiveState, last:true})}}></input>
                            <label htmlFor={"a-p-last"} className={(errorsName?.lastName)? styles.notValid + " " + styles.floatingDesc : styles.floatingDesc}>Last name</label>
                        </div>
                        <div style={(adaptiveErrorMessageState)? {display:"none"} : {display:"block"}} className={styles.errorMessage }>{(errorsName?.lastName) && <p>{errorsName?.lastName?.message ?? "last name error"}</p>}</div>
                    </div>
                    <div style={(adaptiveErrorMessageState)? {display:"block"} : {display:"none"}} className={styles.adaptiveErrorMessage }>{(errorsName?.lastName) && <p>{errorsName?.lastName?.message ?? "last name error"}</p>}</div>
                    <div className={styles.buttonBlock}>
                        <button className={styles.saveButton} onClick={(e) => {
                            if(!isValidName){
                                if(Object.keys(errorsName)[0]){
                                    setFocusName(Object.keys(errorsName)[0]);
                                }
                                else{
                                    setFocusName("firstName");
                                }
                                e.preventDefault();
                            }
                            }}>Save</button>
                        <button className={styles.cancelButton} onMouseDown={(e) => {
                            resetName();
                            setNameChangingState(false);
                            setStopState(false);
                            }}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className={styles.inactiveEmailWrapper} style={(emailChangingState)?{ display:"none" } : { display:"flex" }}>
                <p className={styles.emailLabel}>Email address: </p>
                <p className={styles.email}>sasaakimenko78@gmail.com</p>
                <p className={styles.toggle} onMouseDown={() => {
                    if(!nameChangingState && !phoneChangingState){
                    setValueEmail("email", "sasaakimenko78@gmail.com");
                    setEmailChangingState(true)}}}>change</p>
            </div>
            <div className={styles.activeEmailWrapper} style={(emailChangingState)?{ display:"flex" } : { display:"none" }}>
                <form className={styles.emailBlock} onSubmit={handleSubmitEmail(HandleEmailChange, (error) => {console.log(error)})}>
                    <EmailInputNode adaptiveErrorMessageState={adaptiveErrorMessageState} register={registerEmail} setValue={setValueEmail} setFocus={setFocusEmail} errors={errorsEmail} inputActiveState={emailInputActiveState} setInputActiveState={setEmailInputActiveState} stopState={stopState} setStopState={setStopState}/>
                    <div className={styles.buttonBlock}>
                        <button className={styles.saveButton} onClick={(e) => {
                            if(!isValidEmail){
                                if(Object.keys(errorsEmail)[0]){
                                    setFocusEmail(Object.keys(errorsEmail)[0]);
                                }
                                else{
                                    setFocusEmail("email");
                                }
                                e.preventDefault();
                            }
                            }}>Save</button>
                        <button className={styles.cancelButton} onMouseDown={(e) => {
                            resetEmail();
                            setEmailChangingState(false);
                            setStopState(false);
                            }}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className={styles.inactivePhoneWrapper} style={(phoneChangingState)?{ display:"none" } : { display:"flex" }}>
                <p className={styles.phoneLabel}>Phone: </p>
                <p className={styles.phone}>+380 98 036 6315</p>
                <p className={styles.toggle} onMouseDown={() => {
                    if(!nameChangingState && !emailChangingState){
                    setPhoneChangingState(true)}}}>change</p>
            </div>
            <div className={styles.activePhoneWrapper} style={(phoneChangingState)?{ display:"flex" } : { display:"none" }}>
                <form className={styles.phoneBlock} onSubmit={handleSubmitPhone(HandlePhoneChange, (error) => {console.log(error)})}>
                    <PhoneInputNode adaptiveErrorMessageState={adaptiveErrorMessageState} register={registerPhone} setFocus={setFocusPhone} errors={errorsPhone} inputActiveState={phoneInputActiveState} setInputActiveState={setPhoneInputActiveState} stopState={stopState} setStopState={setStopState}/>
                    <div className={styles.buttonBlock}>
                        <button className={styles.saveButton} onClick={(e) => {
                            if(!isValidPhone){
                                if(Object.keys(errorsPhone)[0]){
                                    setFocusPhone(Object.keys(errorsPhone)[0]);
                                }
                                else{
                                    setFocusPhone("phone");
                                }
                                e.preventDefault();
                            }
                            }}>Save</button>
                        <button className={styles.cancelButton} onMouseDown={(e) => {
                            resetPhone();
                            setPhoneChangingState(false);
                            setStopState(false);
                            }}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className={styles.line}></div>
            <div className={styles.infoWrapper}>            
                <h3 className={styles.infoTitle} onMouseDown={(e) => {setAllDataMode((prev) => {if(!prev) return true;
                                                                                               else return false;})}}>Additional information</h3>
                <div className={(allDataMode)? styles.active + " " + styles.infoDownButton : styles.infoDownButton} onMouseDown={(e) => {setAllDataMode((prev) => {if(!prev) return true;
                                                                                               else return false;})}}></div>
            </div>
            <div style={(allDataMode ? {display:"block"} : {display:"none"})}>
                <div className={styles.placeHolder}></div>
            </div>

        </div>
    )
}