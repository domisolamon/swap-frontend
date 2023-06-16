import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import CryptoIcon from 'react-crypto-icons';


const SelectTokenModal = (props) => {
    const modalContent = props.visible ? (
        <div>
            <div className='box-shadow w-screen h-screen fixed z-10 top-0 left-0 bg-white bg-opacity-40 flex justify-center items-center'
                onClick={props.onClose}>
            </div>

            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                className='w-[450px] z-20 rounded-3xl bg-opacity-80 bg-black text-slate-100 absolute top-0 left-0'>
                <div className='head p-6 w-full flex flex-row justify-between items-center '>
                    <p className='text-slate-100 text-xl'>Select Token</p>
                    <p className='text-xl text-cyan-500' onClick={props.onClose}><IoCloseSharp /></p>
                </div>
                <hr className='border-gray-700'></hr>
                <div className='p-6 w-full flex flex-col gap-3 justify-center'>
                    <div className='w-full'>
                        <input type='text' placeholder='Search name or paste address'
                            className='w-full p-4 text-sm rounded-xl text-slate-100 border-none outline-none bg-violet-400 bg-opacity-20'></input>
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        <p className='text-slate-100 text-sm'>Common tokens</p>
                        <div className='w-full flex flex-row gap-3 justify-center'>
                            <div className='rounded-md border-black border-1 bg-transparent hover:bg-slate-950 flex flex-row gap-2 p-2 hover:cursor-pointer'>
                                <CryptoIcon name='bnb' size={24} />
                                <p>BNB</p>
                            </div>
                            <div className='rounded-md border-black border-1 bg-transparent hover:bg-slate-950 flex flex-row gap-2 p-2 hover:cursor-pointer'>
                                <CryptoIcon name='usdt' size={24} />
                                <p>USDT</p>
                            </div>
                            <div className='rounded-md border-black border-1 bg-transparent hover:bg-slate-950 flex flex-row gap-2 p-2 hover:cursor-pointer'>
                                <CryptoIcon name='cake' size={24} />
                                <p>CAKE</p>
                            </div>
                            <div className='rounded-md border-black border-1 bg-transparent hover:bg-slate-950 flex flex-row gap-2 p-2 hover:cursor-pointer'>
                                <CryptoIcon name='btcb' size={24} />
                                <p>BTCB</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-0 justify-items-center max-h-[400px] overflow-y-auto'>
                    {/* <div className='w-full flex flex-row py-1 px-7 justify-stretch items-center gap-2 hover:bg-slate-950'>
                        <CryptoIcon name="bnb" size={24} />
                        <div className='flex-grow flex flex-col gap-1'>
                            <div className='text-slate-100'>BNB</div>
                            <div className='text-gray-500 text-sm'>BNB native token</div>
                        </div>
                        <div>0</div>
                    </div> */}
                    {
                        props.tokenData && props.tokenData.map(token => {

                            return (
                                <div className='w-full flex flex-row py-1 px-7 justify-stretch items-center gap-2 hover:bg-slate-950' onClick = {() => {props.onSelected(token.name)}}>
                                    {/* <CryptoIcon name={token.symbol} size={24} /> */}
                                    <div className = 'w-6 h-6'><img src = {token.image}></img></div>
                                    <div className='flex-grow flex flex-col gap-1'>
                                        <div className='text-slate-100'>{token.symbol.toUpperCase()}</div>
                                        <div className='text-gray-500 text-sm'>{token.name}</div>
                                    </div>
                                    <div>0</div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className='w-full flex justify-center items-center py-10'>
                    <p className='text-xl text-cyan-500 hover:cursor-pointer hover:text-cyan-600'>Manage Tokens</p>
                </div>
            </div>
        </div>
    ) : "";
    return (
        <div>{modalContent}</div>
    );
}

export default SelectTokenModal;