import React from 'react';
import CryptoIcon from 'react-crypto-icons';
import { AiFillCaretDown } from 'react-icons/ai';

const TokenButton = (props) => {
    console.log(props.token);
    return (
        <div className = 'flex flex-row gap-2 p-1 items-center justify-center text-sm text-slate-100 hover:cursor-pointer hover:text-gray-500'
            onClick = {props.onClick}>
            <div className = 'w-6 h-6'><img src = {props.token.image}></img></div>
            <p>{props.token.name}</p>
            <AiFillCaretDown />
        </div>
    );
}

export default TokenButton;