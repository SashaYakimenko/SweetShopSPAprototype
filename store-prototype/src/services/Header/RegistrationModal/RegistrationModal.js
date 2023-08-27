import React from "react";
import styles from "./RegistrationModal.module.css";
import { useForm } from "react-hook-form";
import { MobileInput } from "../LogInModal/MobileInput/MobileInput.js";
import { Link } from "react-router-dom";


export function RegistrationModal ({regState, setRegState, logState, setLogState, setFromReg}){

    const exp = /[^\d]/;
    const [loginMode, setLoginMode] = React.useState(true);
    const [regMobileInputBag, setRegMobileInputBag] = React.useState({count: 0, mode: 0});
    const [checkBoxState, setCheckBoxState] = React.useState({ first: false, second: false, third: false});
    const {formState:{dirtyFields, errors, isValid, isSubmitted}, register, handleSubmit, reset, setFocus, getValues} = useForm({
        mode:"onBlur",
        defaultValues:{
            login:'',
            fullName:'',
            password:'',
            confirmPass:''
        }
    });
    const nestsInputRefs = React.useRef();

    function ValidateSuccess(data){
        if(!data?.login.includes("@"))
        {
            if(data?.login[0] != "+") data.login = "+" + data.login;
            console.log(data?.login);
        }
        //need to process 
        console.log(data);
    }

    function PassValidateNumberNeedRule(value){
        for(let i = 0; i < value.length; i++)
        {
            if(!isNaN(Number(value[i]))) return true;
        }
        return "Password must containt at least one digit";
    }

    function PassValidateCharRule(value){
        for(let i = 0; i < value.length; i++)
        {
            if(isNaN(Number(value[i]))) return true;
        }
        return "Password must containt at least one latter";
    }

    function PassValidateUpperCharRule(value){
        for(let i = 0; i < value.length; i++)
        {
            if(isNaN(Number(value[i])) && value[i] === value[i].toUpperCase()) return true;
        }
        return "Password must containt at least one uppercase latter";
    }

    function NameValidateRule(value){
            for(let i = 0; i < value.length; i++) if (!(exp.test(value[i]) && (value[i] != "." && value[i] != ","))) return "Incorrect characters in name field";
            return true;
        }

    function PassEqualityRule(value){
        if(getValues()?.confirmPass == getValues()?.password) return true;
        return "Confirmation value is wrong";
    } 

    React.useEffect(() =>{
        reset();
    }, [isSubmitted, loginMode])
    

    return(
            <div className={(regState)? styles.RegWrapper + ` ${styles.active}`:styles.RegWrapper} onMouseDown={(e) => {setRegState(false);
                setFromReg(false);
                reset();
                setLoginMode(true);
                setCheckBoxState({first:false, second:false, third: false});
                setRegMobileInputBag({count: 0, mode: 0});
                }}>
                    <div className={(regState)? styles.RegContent + ` ${styles.active}`:styles.RegContent} onMouseDown={(e) => {e.stopPropagation();}}>
                        <div className={styles.RegTitle}><h2>Sign up</h2></div>
                        <div className={styles.RegLine} />
                        <div className={styles.RegBody}>
                            <form ref={nestsInputRefs} onSubmit={handleSubmit(ValidateSuccess, (Errors) => {console.log(Errors)})}>
                                <div className={styles.regFirstGroup}>
                                    {(loginMode)?  <input {...register("login", {required: "This field is required", pattern: {value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Incorrect email value"}
                                                                                })} className={(errors?.login)? styles.RegLoginInput + " " + styles.notValid : styles.RegLoginInput} type="text" id="r-m-logIn" required></input> :
                                    <MobileInput bag={regMobileInputBag} setBag={setRegMobileInputBag} register={register} errors={errors} id={"r-m-login"}/>}
                                    <div className={(loginMode) ? styles.nest + " " + styles.email : styles.nest}></div>
                                    <label htmlFor="r-m-logIn">{(loginMode)? "Email" : "Phone"}</label>
                                    <div className={(errors?.login) ? styles.regErrorMessage + " " + styles.active : styles.regErrorMessage }>{(errors?.login) && <p>{errors?.login?.message ?? "Login error"}</p>}</div>
                                </div>
                                <div className={styles.regSecondGroup}>
                                    <input {...register("fullName", {required:"This field is required",
                                                                    maxLength: {value: 40, message: "Maximal length of full name is 40 characters"},
                                                                    pattern: {value:/^[^\d\s]{2,}\s(?:[^\d\s]{2,}\s)?[^\d\s]{2,}\s?$/, message: "Incorrect name value"},
                                                                    validate: {NameValidateRule}
                                                                     })} className={(errors?.fullName) ? styles.RegNameInput + " " + styles.notValid : styles.RegNameInput} type="text" id="r-m-fullName" required></input>
                                    <div className={styles.nest}></div>
                                    <label htmlFor="r-m-fullName">Full name</label>
                                    <div className={(errors?.fullName) ? styles.regErrorMessage + " " + styles.active : styles.regErrorMessage }>{(errors?.fullName) && <p>{errors?.fullName?.message ?? "Name error"}</p>}</div>
                                </div>
                                <div className={styles.regThirdGroup}>
                                    <input {...register("password", {required:"This field is required",
                                                                    minLength: {value: 8, message: "Minimal length of password is 8 characters"},
                                                                    maxLength: {value: 12, message: "Maximal length of password is 12 characters"},
                                                                    validate: {PassValidateNumberNeedRule, PassValidateCharRule, PassValidateUpperCharRule}})} className={(errors?.password) ? styles.RegPassInput + " " + styles.notValid : styles.RegPassInput} type="password" id="r-m-password" required></input>
                                    <div style={(!dirtyFields.hasOwnProperty("password")) ? {filter:"none", cursor:"initial"} : {} } onClick={() => {if (nestsInputRefs.current.childNodes[2].childNodes[0].type === "password" && dirtyFields.hasOwnProperty("password")) nestsInputRefs.current.childNodes[2].childNodes[0].setAttribute(`type`, `text`);
                                    else if(dirtyFields.hasOwnProperty("password"))nestsInputRefs.current.childNodes[2].childNodes[0].setAttribute(`type`, `password`);}} className={styles.RegPassReveal}></div>
                                    <div className={styles.nest}></div>
                                    <label htmlFor="r-m-password">Password</label>
                                    <div className={(errors?.password) ? styles.regErrorMessage + " " + styles.active : styles.regErrorMessage }>{(errors?.password) && <p>{errors?.password?.message ?? "Password error"}</p>}</div>
                                </div>
                                <div className={styles.regFourthGroup}>
                                    <input {...register("confirmPass", {required:"This field is required",
                                                                    minLength: {value: 8, message: "Minimal length of password is 8 characters"},
                                                                    maxLength: {value: 12, message: "Maximal length of password is 12 characters"},
                                                                    validate: {PassValidateNumberNeedRule, PassValidateCharRule, PassValidateUpperCharRule, PassEqualityRule}})} className={(errors?.confirmPass) ? styles.RegPassConfirmInput + " " + styles.notValid : styles.RegPassConfirmInput} type="password" id="r-m-confirmPass" required></input>
                                    <div style={(!dirtyFields.hasOwnProperty("confirmPass")) ? {filter:"none", cursor:"initial"} : {} } onClick={() => {if (nestsInputRefs.current.childNodes[3].childNodes[0].type === "password" && dirtyFields.hasOwnProperty("confirmPass")) nestsInputRefs.current.childNodes[3].childNodes[0].setAttribute(`type`, `text`);
                                    else if(dirtyFields.hasOwnProperty("confirmPass"))nestsInputRefs.current.childNodes[3].childNodes[0].setAttribute(`type`, `password`);}} className={styles.RegPassReveal}></div>
                                    <div className={styles.nest}></div>
                                    <label htmlFor="r-m-confirmPass">Confirm password</label>
                                    <div className={(errors?.confirmPass) ? styles.regErrorMessage + " " + styles.active : styles.regErrorMessage }>{(errors?.confirmPass) && <p>{errors?.confirmPass?.message ?? "Password confirmation error"}</p>}</div>
                                </div>

                                <div className={(checkBoxState.first) ? styles.checkBoxContainer + ` ${styles.active}` : styles.checkBoxContainer}>
                                    <div onClick={() => {
                                        setCheckBoxState((prev) => {
                                            if(!prev.first) return {...checkBoxState, first: true};
                                            else return {...checkBoxState, first: false};})
                                        if(loginMode) setLoginMode(false);
                                        else setLoginMode(true);
                                        }}/>
                                    <p className={styles.toggle} onClick={() => {
                                        setCheckBoxState((prev) => {
                                            if(!prev.first) return {...checkBoxState, first: true};
                                            else return {...checkBoxState, first: false};})
                                        if(loginMode) setLoginMode(false);
                                        else setLoginMode(true);
                                        }}>{"Sign up using phone"}</p>
                                </div>

                                <div className={(checkBoxState.second) ? styles.privacyCheckBoxContainer + ` ${styles.active}` : styles.privacyCheckBoxContainer}>
                                    <div onClick={() => {
                                        setCheckBoxState((prev) => {
                                            if(!prev.second) return {...checkBoxState, second: true};
                                            else return {...checkBoxState, second: false};})
                                        }}/>
                                    <p className={styles.toggle} onClick={() => {
                                        setCheckBoxState((prev) => {
                                            if(!prev.second) return {...checkBoxState, second: true};
                                            else return {...checkBoxState, second: false};})
                                        }}
                                        >{"Agree with "}<Link onClick={(e) => {e.stopPropagation();}}>privacy policy</Link></p>
                                </div>

                                <div className={(checkBoxState.third) ? styles.newsCheckBoxContainer + ` ${styles.active}` : styles.newsCheckBoxContainer}>
                                    <div onClick={() => {
                                        setCheckBoxState((prev) => {
                                            if(!prev.third) return {...checkBoxState, third: true};
                                            else return {...checkBoxState, third: false};})
                                        }}/>
                                    <p className={styles.toggle} onClick={() => {
                                        setCheckBoxState((prev) => {
                                            if(!prev.third) return {...checkBoxState, third: true};
                                            else return {...checkBoxState, third: false};})
                                        }}>{"Subscribe to the newslatter"}</p>
                                </div>

                                <div className={styles.regButtonContainer}>
                                    <button onClick={(e) => {if(!isValid) {if(!Object.keys(errors)[0] == undefined) setFocus(Object.keys(errors)[0]);
                                                                        else setFocus("password");
                                                                        e.preventDefault();}}} className={styles.regSubmitButton}><p>Sign up</p></button>
                                </div>
                                <Link className={styles.LoginLink} onClick={() => {
                                    setLogState(true);
                                    setRegState(false);
                                }}>Back to Log in</Link>
                            </form>
                        </div>
                        <div className={styles.RegLine} />
                        <div className={styles.LogFooter}>
                            <p>Or log in with your Facebook or Google accounts.</p>
                        </div>
                    </div>
                </div>
    )

}