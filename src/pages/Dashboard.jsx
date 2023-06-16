import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getUserBalance, setUserBalance } from "../actions/ToggleMode";
import {
  stake,
  approve,
  getHolderInfo,
  calcReward,
  calcEndtime,
  unstake,
  getTokenAmount,
} from "../hooks/useTokenInfo";

const Dashboard = () => {
  const { account } = useAuth();
  const [stakingAmt, setstakingAmt] = useState('0');
  const [apr, setapr] = useState('105');
  // const [timeElapse, settimeElapse] = useState('0');
  const [rewards, setrewards] = useState('0');
  // const [balance, setbalance] = useState('0');
  const [stakedAmt, setstakedAmt] = useState('0');
  const [selPeriod, setselPeriod] = useState('1');

  const [btnUnstake, setbtnUnstake] = useState('bg-gray-400');
  const [btnClaim, setbtnClaim] = useState('bg-gray-400');

  const dispatch = useAppDispatch();

  const user_balance = useAppSelector(getUserBalance);

  const changestakingAmt = (amt) => {
    setstakingAmt(amt);
  }
  const clickSetMaxAmt = async() => {
    setstakingAmt(user_balance);
    const hInfo = await getHolderInfo(account);
    console.log(hInfo.balance / Math.pow(10, 18));
    const calcreward = await calcReward(account);
    const endtime = await calcEndtime(account);
    console.log(calcreward, endtime)
  }
  const clickstake = async() => {
    if (parseInt(stakingAmt) <= 0 ) return;
    approve(account, parseInt(stakingAmt)).then(() => {
      stake(account, parseInt(stakingAmt), parseInt(selPeriod)).then(async() => {
        const hInfo = await getHolderInfo(account);
        console.log(hInfo, 'hinfo')
        setstakedAmt(hInfo.balance / Math.pow(10, 18));
        const calcreward = await calcReward(account);
        console.log(calcreward, 'calcreward')
        setrewards((calcreward / Math.pow(10, 18)).toFixed(0));
        const bal = await getTokenAmount(account);
        console.log(bal, 'balance')
        dispatch(setUserBalance(bal));
      });
    })
  }
  const clickunstake = async(isunstake) => {
    unstake(account, isunstake).then(async() => {
      console.log("unstaking success", isunstake);
      const bal = await getTokenAmount(account);
      dispatch(setUserBalance(bal));
      if (isunstake)
        setstakedAmt("0");
  });
  }
  useEffect(() => {
    const intervalId = setInterval(async() => {
      const hInfo = await getHolderInfo(account);
      setstakedAmt(hInfo.balance / Math.pow(10, 18));
      const calcreward = await calcReward(account);
      setrewards((calcreward / Math.pow(10, 18)).toFixed(0));
  }, 5000);

    return () => clearInterval(intervalId);
  });
  const changePeriod = (period) => {
    setselPeriod(period);
    console.log(selPeriod);
    switch (parseInt(period)) {
      case 1:
        setapr('105');
        break;
      case 7:
        setapr('135');
        break;
      case 14:
        setapr('170');
        break;
      case 30:
        setapr('220');
        break;
      case 90:
        setapr('250');
        break;
      case 180:
        setapr('270');
        break;
      case 365:
        setapr('300');
        break;
      default:
        setapr('105');
        break;
    }
  }

  return (
    <div>
      <div className="w-full flex justify-center mt-[170px]">
        <div className="border shadow-gray-400 shadow-md sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-md p-10">
          <div className="px-5">
            <div className="flex justify-between items-center">
              <div className="text-gray-800">APR</div>
              <div>{apr}%</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-800">Balance</div>
              <div>{parseInt(user_balance).toFixed(0)} LONO</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-800">Staked</div>
              <div>{stakedAmt} LONO</div>
            </div>
            {/* <div className="flex justify-between items-center">
              <div className="text-gray-800">Release</div>
              <div>{timeElapse}</div>
            </div> */}
            <div className="flex justify-between items-center">
              <div className="text-gray-800">Rewards</div>
              <div>{rewards} LONO</div>
            </div>
          </div>
          <div className="border border-gray-400 h-['1px'] my-5"></div>
          <div className="flex justify-between items-center">
            <div className="mb-1 mr-2">Amount</div>
            <div className="flex border border-1px-3 py-1 px-2 rounded-sm border-gray-500">
              <input className="border-none outline-none bg-transparent w-full" type="text" placeholder="0" value={stakingAmt} onChange={(e) => changestakingAmt(e.target.value)} />
              <div onClick={clickSetMaxAmt} className="cursor-pointer">Max</div>
            </div>
          </div>
          <div className="mt-5 flex justify-between items-center">
            <div className="mb-1">Locked</div>
            <div>
              <select onChange={(e) => changePeriod(e.target.value)} className="bg-transparent border border-gray-300 px-3 py-1 rounded-md">
                <option className="bg-transparent" value={'1'}>1 day</option>
                <option className="bg-transparent" value={'7'}>7 days</option>
                <option className="bg-transparent" value={'14'}>14 days</option>
                <option className="bg-transparent" value={'30'}>1 Month</option>
                <option className="bg-transparent" value={'90'}>3 Months</option>
                <option className="bg-transparent" value={'180'}>6 Months</option>
                <option className="bg-transparent" value={'365'}>1 year</option>
              </select>
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-1 mt-10">
            <div onClick={() => clickstake()} className="bg-blue-600 hover:bg-blue-500 rounded-md text-slate-100 text-center py-2 flex-1 cursor-pointer hover:shadow-gray-400 hover:shadow-md">Stake</div>
            <div onClick={() => clickunstake(true)} className={`bg-blue-600 hover:bg-blue-500 rounded-md text-slate-100 text-center py-2 flex-1 cursor-pointer hover:shadow-gray-400 hover:shadow-md ${btnUnstake}`}>Unstake</div>
            <div onClick={() => clickunstake(false)} className={`bg-blue-600 hover:bg-blue-500 rounded-md text-slate-100 text-center py-2 flex-1 cursor-pointer hover:shadow-gray-400 hover:shadow-md ${btnClaim}`}>Claim</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
