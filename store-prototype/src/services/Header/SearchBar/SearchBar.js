import React from "react";
import styles from "./SearchBar.module.css";
import { useForm } from "react-hook-form";

export function SearchBar()
{
    const {formState:{ isValid, isSubmitSuccessful}, register, handleSubmit, reset} = useForm(
        { mode:"onSubmit",
          defaultValues:{
          searchBar: "",
        }});
    
    function OnSuccessHandler(data, e)
    {
        e.preventDefault();
        console.log(data);
    }

    React.useEffect(() => {
        if (isSubmitSuccessful){
            reset({searchBar: ""})
        }
    }, [reset, isSubmitSuccessful]);
    
    return(
            <form className={styles.searchBarWrapper} onSubmit={handleSubmit(OnSuccessHandler)}>
                <input type="text" placeholder="item search" {...register("searchBar", {required: true})}></input>
                <button disabled={isValid? false : true} style={isValid ? {} : {backgroundColor: "#78aad8", cursor: "initial"}}><div className={styles.searchIcon}></div></button>
            </form>
    )
}