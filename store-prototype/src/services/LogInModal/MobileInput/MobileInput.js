import React from "react";
import styles from "../LogInModal.module.css";

export function MobileInput({ register, errors, bag, setBag}){
    const exp = /[\d]/;
    const exp2 = /^[\+]?\(?[\d]{0,3}\)?([\d]|[\s]){0,15}$/;
    var counter;
    var toggle = false;
    var firstBack = false;
    var mode;
    console.log("rerender");
    return(
        <input className={(errors?.login) ? styles.LogInInput + " " + styles.notValid : styles.LogInInput} { ...register("login", {required:"This field is required",
            pattern: {value:/^[\+]?\(?[\d]{0,3}\)?\s[\d]{0,2}\s[\d]{0,3}\s[\d]{0,2}\s[\d]{0,2}$/, message:"You have to enter valid phone number"},
            minLength: {value: 12, message: "Minimal length of password is 12 characters"},
            maxLength: {value: 21, message: "Maximal length of password is 21 character"},
            onBlur: () => {if(counter != undefined) setBag({count: counter, mode: mode});}})} 
            type="text" id="l-m-logIn" required

            onFocus={() => {if(bag.count != 0) {
                counter = bag.count;
                mode = bag.mode;
            }}}

            onKeyDown={(e)=>{
                if(e.keyCode == "18" || e.keyCode == "17" || e.keyCode == "39" || e.keyCode == "37") return;
                if(e.keyCode == "8" && (!(e.target.value[5] == ")" && e.target.value[6] == undefined) && (!(e.target.value[0] == "+" && e.target.value[1] == undefined)) )) {
                    if(counter > 1 && exp.test(e.target.value[e.target.value.length - 1])) counter--;
                    toggle = true;
                    return;
                }

                if(!e.ctrlKey && !exp.test(e.key) && !(e.keyCode == "187")) e.preventDefault();
                else if (e.ctrlKey && !(e.keyCode == "67" || e.keyCode == "86" || e.keyCode == "88")) e.preventDefault();

                if(counter == 1 && e.target.value[6] == undefined && exp.test(e.key) && mode == 0) e.target.value = e.target.value + " ";

                if(e.key == "0" && e.target.value[0] == undefined){
                    mode = 0;
                    counter = 0;
                    e.target.value = "+(38";
                    }
                else if(exp.test(e.key) && e.target.value[0] == undefined) {
                    mode = 1;
                    counter = 0;
                    e.target.value = "+";
                }else if(e.keyCode == "187" && e.target.value[0] == undefined) {
                    mode = 1;
                    counter = 0;
                }
                
                if(e.target.value[0] == "+" && counter == undefined)
                {
                    if(e.target.value[1] == "("){
                        mode = 0;
                        counter = 1;
                    }
                    else{
                        mode = 1;
                        counter = 1;
                    }
                }
                if(mode == 0){ if(counter == 3) e.target.value = e.target.value + " ";
                               else if(counter == 6) e.target.value = e.target.value + " ";
                               else if(counter == 8) e.target.value = e.target.value + " ";}
                if(mode == 1){ if(counter == 3) e.target.value = e.target.value + " ";
                               else if(counter == 5) e.target.value = e.target.value + " ";
                               else if(counter == 8) e.target.value = e.target.value + " ";
                               else if(counter == 10) e.target.value = e.target.value + " ";}

                if(e.target.value[1] == undefined && e.target.value[0] == "+"){
                    if(e.key == "0"){
                        e.target.value = "+(38";
                        mode = 0;
                    }
                    else mode = 1;
                    counter = 0;}

            }} onInput={(e)=>{if(mode == 0) {
                if(!toggle) counter++;
                toggle = false;
                if(counter == 1 && e.target.value[5] != ")" && e.target.value[1] == "(" && mode == 0)e.target.value = e.target.value + ") ";
            }
            else if(mode == 1) {
                if(!toggle) counter++;
                toggle = false;
            }}} onPaste={(e)=>{
                var value = e.clipboardData.getData('text/plain');
                var temp = "";

                if(!exp2.test(value)) {e.preventDefault();
                return 0;}

                var counter = 0;
                for(let i = 0; i < value.length; i++)
                {
                    if(!(value[i] == " ")) temp = temp + value[i]
                    if(exp.test(value[i])){
                        counter++;
                        if(counter == 3) {if(exp.test(value[i + 1])) temp = temp + " ";}
                        else if(counter == 5) temp = temp + " ";
                        else if(counter == 8) temp = temp + " ";
                        else if(counter == 10) temp = temp + " ";
                    }
                    if(counter == 3 && ((value[i] == ")" && exp.test(value[i + 1])) || (value[i] == " " && exp.test(value[i + 1])))) temp = temp + " ";
                }
                
                e.preventDefault();
                e.target.value = temp;
            }}
            ></input>
    )
}