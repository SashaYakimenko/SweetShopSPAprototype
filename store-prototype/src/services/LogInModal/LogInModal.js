import React from "react";
import styles from "./LogInModal.module.css";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import { MobileInput } from "./MobileInput/MobileInput.js";

export function LogInModal ({logState, setLogState})
{
    const [inputAbove, setInputAbove] = React.useState({first:false, second:false});
    const [loginMode, setLoginMode] = React.useState(true);
    const [mobileInputBag, setMobileInputBag] = React.useState({count: 0, mode: 0});
    const nestsInputRefs = React.useRef();
    const {formState:{dirtyFields, errors, isValid, isSubmitted}, register, handleSubmit, reset, setFocus} = useForm({
        mode:"onBlur",
        defaultValues:{
            login:'',
            password:''
        }
    });

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

    React.useEffect(() =>{
        reset();
    }, [isSubmitted, loginMode])

    return(
        <div className={(logState)? styles.LogWrapper + ` ${styles.active}`:styles.LogWrapper} onMouseDown={(e) => {setLogState(false);}}>
            <div className={(logState)? styles.LogContent + ` ${styles.active}`:styles.LogContent} onMouseDown={(e) => {e.stopPropagation();}}>
                <div className={styles.LogTitle}><h2>Log in</h2></div>
                <div className={styles.Line} />
                <div className={styles.LogBody}>
                    <form ref={nestsInputRefs} onSubmit={handleSubmit(ValidateSuccess, (Errors) => {console.log(Errors)})}>
                        <div className={styles.firstGroup}>
                            {(loginMode)?  <input {...register("login", {required: "This field is required", pattern: {value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Incorrect email value"}
                                                                        })} className={(errors?.login)? styles.LogInInput + " " + styles.notValid : styles.LogInInput} type="text" id="l-m-logIn" required></input> :
                             <MobileInput bag={mobileInputBag} setBag={setMobileInputBag} register={register} errors={errors}/>}
                            <div className={(loginMode) ? styles.nest + " " + styles.email : styles.nest}></div>
                            <label htmlFor="l-m-logIn">{(loginMode)? "Email" : "Phone"}</label>
                            <div className={(errors?.login) ? styles.errorMessage + " " + styles.active : styles.errorMessage }>{(errors?.login) && <p>{errors?.login?.message || "Login error"}</p>}</div>
                        </div>
                        <div className={styles.secondGroup}>
                            <input {...register("password", {required:"This field is required",
                                                             minLength: {value: 8, message: "Minimal length of password is 8 characters"},
                                                             maxLength: {value: 12, message: "Maximal length of password is 12 characters"},
                                                             validate: {PassValidateNumberNeedRule, PassValidateCharRule, PassValidateUpperCharRule}})} className={(errors?.password) ? styles.PassInput + " " + styles.notValid : styles.PassInput} type="password" id="l-m-password" required></input>
                            <div style={(!dirtyFields.hasOwnProperty("password")) ? {filter:"none", cursor:"initial"} : {} } onClick={() => {if (nestsInputRefs.current.childNodes[1].childNodes[0].type === "password" && dirtyFields.hasOwnProperty("password")) nestsInputRefs.current.childNodes[1].childNodes[0].setAttribute(`type`, `text`);
                            else if(dirtyFields.hasOwnProperty("password"))nestsInputRefs.current.childNodes[1].childNodes[0].setAttribute(`type`, `password`);}} className={styles.PassReveal}></div>
                            <div className={styles.nest}></div>
                            <label htmlFor="l-m-password">Password</label>
                            <div className={(errors?.password) ? styles.errorMessage + " " + styles.active : styles.errorMessage }>{(errors?.password) && <p>{errors?.password?.message || "Password error"}</p>}</div>
                        </div>
                        <div className={styles.ButtonContainer}>
                            <button onClick={(e) => {if(!isValid) {if(!Object.keys(errors)[0] == undefined) setFocus(Object.keys(errors)[0]);
                                                                   else setFocus("password");
                                                                  e.preventDefault();}}} className={styles.SubmitButton}><p>Log in</p></button>
                        </div>
                        <Link className={styles.LoginToggle} onClick={() => {(loginMode)? setLoginMode(false) : setLoginMode(true) }}>{(loginMode)? "Log in using phone" : "Log in using email"}</Link>
                    </form>
                </div>
                <div className={styles.Line} />
                <div className={styles.LogFooter}>
                    <p>Or log in with your Facebook or Google accounts.</p>
                </div>
            </div>
        </div>
    )
}