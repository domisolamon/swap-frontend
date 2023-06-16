import React from 'react';
import TokenButton from './Utils/TokenButton';
import EditPanel from './Utils/EditPanel';
import NotificationButton from './Utils/NotificationButton';
import SelectTokenModal from './Utils/SelectTokenModal';
import { DotLoader } from 'react-spinners';

import { FaRegChartBar } from 'react-icons/fa';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FiRefreshCcw } from 'react-icons/fi';
import { BsFire } from 'react-icons/bs';
import { LuArrowDownUp } from 'react-icons/lu';
import { BsFillPencilFill, BsArrowLeftRight } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import LineChart from './Chart/LineChart';
import ReactApexCharts from 'apexcharts'
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faShuffle, faWaterLadder, faTractor } from '@fortawesome/free-solid-svg-icons';

const Swap = () => {
    const [historicalData, setHistoricalData] = useState(null);
    const [swapAvailable, setSwapAvailable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tokenIndex, setTokenIndex] = useState(1);
    const [tokenData, setTokenData] = useState([]);
    const [firstToken, setFirstToken] = useState({});
    const [secondToken, setSecondToken] = useState({});
    const [firstTokenAmount, setFirstTokenAmount] = useState("");
    const [secondTokenAmount, setSecondTokenAmount] = useState("");

    const fetchHistoricalData = async (fTokenId, sTokenId) => {
        let fPriceList = await axios.get(
            `https://pro-api.coingecko.com/api/v3/coins/${fTokenId}/market_chart?vs_currency=usd&days=${1}&interval=hourly&x_cg_pro_api_key=CG-cYLMAXA7qqWnK5RXS8WAw5Jk`
        );
        let sPriceList = await axios.get(
            `https://pro-api.coingecko.com/api/v3/coins/${sTokenId}/market_chart?vs_currency=usd&days=${1}&interval=hourly&x_cg_pro_api_key=CG-cYLMAXA7qqWnK5RXS8WAw5Jk`
        );
        for ( let i = 0; i < fPriceList.data.prices.length ; i ++ )
            fPriceList.data.prices[i][1] /= sPriceList.data.prices[i][1]; 
        console.log("history=> " ,fPriceList.data);
        setHistoricalData(fPriceList.data.prices);
    }

    useEffect(() => {
        const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en&x_cg_pro_api_key=CG-cYLMAXA7qqWnK5RXS8WAw5Jk";
        axios.get(apiUrl)
            .then(response => {
                console.log(response.data);
                setTokenData(response.data);
                setFirstToken(response.data[0]);
                setSecondToken(response.data[2]);
            })
            .catch(error => console.error(`Error: ${error}`));
    }, []);

    const setCurrentCurrency = (props) => {
        setShowModal(false);
        const currentToken = tokenData.find((token) => token.name === props);
        if (tokenIndex === 1) {
            setFirstToken(currentToken);
        } else if (tokenIndex === 2) {
            setSecondToken(currentToken);
        }
    }
    const fTokenAmountChanged = (event) => {
        const newValue = event.target.value.replace(/[^0-9.]/g, '');
        setFirstTokenAmount(newValue);
    }
    const sTokenAmountChanged = (event) => {
        const newValue = event.target.value.replace(/[^0-9.]/g, '');
        setSecondTokenAmount(newValue);
    }
    const switchToken = () => {
        const tmpToken = firstToken;
        setFirstToken(secondToken); setSecondToken(tmpToken);
        const tmpTokenAmount = firstTokenAmount;
        setFirstTokenAmount(secondTokenAmount); setSecondTokenAmount(tmpTokenAmount);
    }
    useEffect(() => {
        if( Object.keys(firstToken).length === 0 || Object.keys(secondToken).length === 0) return ;
        const newValue = Number(firstToken.current_price) * Number(firstTokenAmount === "" ? 0 : firstTokenAmount) / Number(secondToken.current_price);
        setSecondTokenAmount(previousValue => Math.abs(newValue - previousValue) < 1 >> 10 ? previousValue : newValue);
    }, [firstToken, firstTokenAmount]);
    useEffect(() => {
        if( Object.keys(firstToken).length === 0 || Object.keys(secondToken).length === 0) return ;
        const newValue = Number(secondToken.current_price) * Number(secondTokenAmount === "" ? 0 : secondTokenAmount) / Number(firstToken.current_price);
        setFirstTokenAmount(previousValue => Math.abs(newValue - previousValue) < 1 >> 10 ? previousValue : newValue);
    }, [secondToken, secondTokenAmount]);
    useEffect(() => {
        if( Object.keys(firstToken).length === 0 || Object.keys(secondToken).length === 0) return ;
        fetchHistoricalData(firstToken.id.toLowerCase(), secondToken.id.toLowerCase());
    }, [firstToken, secondToken]);

    
    return (
        tokenData.length ? (<div className="flex flex-row gap-5 py-10 justify-center bg-gradient-to-br from-slate-700 to-violet-900 w-full h-screen" 
        style={{background: "radial-gradient(circle at center, rgb(57, 21, 27), rgb(11, 26, 24)) ", paddingTop:'150px'}} >
            
            <SelectTokenModal onSelected={setCurrentCurrency} tokenData={tokenData} visible={showModal} onClose={() => setShowModal(false)} />
            <div className='w-[35%] rounded-3xl bg-opacity-30 bg-black p-6 text-slate-100 h-min box-shadow'>
                <div className='w-full flex flex-row justify-start gap-2'>

                    {Object.keys(firstToken).length && <div className='w-6 h-6'><img src={firstToken.image}></img></div>}
                    {Object.keys(secondToken).length && <div className='w-6 h-6'><img src={secondToken.image}></img></div>}
                    {Object.keys(firstToken).length && Object.keys(secondToken).length && <div className='text-white'><p>{firstToken.symbol.toUpperCase()} / {secondToken.symbol.toUpperCase()}</p></div>}
                    <p className='text-cyan-500 hover:cursor-pointer hover:text-cyan-600'
                        onClick={switchToken}><BsArrowLeftRight /></p>
                </div>
                <div>{historicalData &&
                    <LineChart historicalData = {historicalData} />}
                </div>
            </div>
            <div className='w-[400px] rounded-3xl bg-opacity-50 bg-black text-slate-100 h-min box-shadow'>
                <div className='head p-6 w-full flex flex-col gap-3 '>
                    <p className='f-Risque text-slate-100 text-2xl'><FontAwesomeIcon icon={faShuffle} /> &nbsp; Swap</p>
                    <p className='text-slate-400 text-sm'>Trade tokens in an instant</p>
                    <div className='text-right flex flex-row justify-end gap-3 text-slate-400'>
                        <p className='text-xl'><FaRegChartBar /></p>
                        <p className='text-xl'><BsFire /></p>
                        <p className='text-xl'><AiTwotoneSetting /></p>
                        <p className='text-xl'><FiRefreshCcw /></p>
                    </div>
                </div>
                <hr className='border-gray-700'></hr>
                <div className='p-6 w-full flex flex-col gap-4 justify-center'>
                    <div className='from w-full flex flex-col gap-1'>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div className='flex flex-row justify-start'>
                                <TokenButton token={firstToken} onClick={() => { setTokenIndex(1); setShowModal(true) }}></TokenButton>
                                {/* copy button
                                metamask */}
                            </div>
                            <div>
                                <p className='text-sm text-slate-400'>Balance: {0}</p>
                            </div>
                        </div>
                        <EditPanel value = {firstTokenAmount} onChange = {fTokenAmountChanged} token = {firstToken}/>
                        <NotificationButton />
                    </div>

                    <div className='switch-button flex self-center'>
                        <p className='p-2 text-cyan-400 rounded-full bg-violet-400 bg-opacity-20'
                            onClick = {switchToken}><LuArrowDownUp /></p>
                    </div>

                    <div className='from w-full flex flex-col gap-1'>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div className='flex flex-row justify-start'>
                                <TokenButton token={secondToken} onClick={() => { setTokenIndex(2); setShowModal(true) }}></TokenButton>
                                {/* copy button
                                metamask */}
                            </div>
                            <div>
                                <p className='text-sm text-slate-400'>Balance: {0}</p>
                            </div>
                        </div>
                        <EditPanel value = {secondTokenAmount} onChange = {sTokenAmountChanged} token = {secondToken}/>
                        <NotificationButton />
                    </div>

                    <div className='from w-full flex flex-col gap-1'>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div className='flex flex-row justify-start items-center gap-2'>
                                <p className='text-xs text-violet-500'> Slippage Tolerance </p>
                                <p className='text-xs text-cyan-400 hover:cursor-pointer'><BsFillPencilFill /></p>
                            </div>
                            <div className="">
                                <p className='text-base text-cyan-400'> {"0.1%"} </p>
                            </div>
                        </div>
                    </div>
                    <div className={`submit w-full py-3 flex justify-center rounded-2xl hover:cursor-pointer 
                        ${swapAvailable ? "bg-cyan-700 text-slate-100" : "bg-slate-800 text-slate-400"}`}>
                        <p className='text-base'>Enter an amount</p>
                    </div>
                </div>
            </div>
        </div>) : (
            <div className="flex flex-row gap-8 py-50 justify-center items-center bg-gradient-to-br from-slate-700 to-violet-900 w-full h-screen" style={{background: "radial-gradient(circle at center, rgb(57, 21, 27), rgb(11, 26, 24))"}} >
                <DotLoader color = "white"/>
                <div>Loading...</div>
                {/* <img className='back-gif' src="img/photo_2023-06-15_01-47-46.jpg" alt="ad"></img> */}
            </div>
        )
    );
}
export default Swap;