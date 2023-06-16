import React from 'react';
import { useRef, useState } from 'react';

const EditPanel = (props) => {
    const divRef = useRef( null );
    const editRef = useRef ( null );

    const setFocus = () => {
        console.log("===");
        if(editRef && editRef.current)
            editRef.current.focus();
        // if(divRef && divRef.current)
        // {
        //     setSelected(true);
        // }
    }

    return (
        <div ref = {divRef} className = 'w-full flex flex-col gap-2 p-3 rounded-xl bg-violet-400 bg-opacity-20 border-none outline-none  overflow-hidden' onClick = {setFocus}>
            <input ref = {editRef} value = {props.value} onChange={props.onChange} type = "text" placeholder='0.0' className = 'bg-transparent border-none outline-none w-full p-2 text-right'></input>
            <p className = "text-sm text-slate-500 text-right hover:cursor-default">~{props.token.current_price * props.value} usdt</p>
        </div>
    );
}

export default EditPanel;