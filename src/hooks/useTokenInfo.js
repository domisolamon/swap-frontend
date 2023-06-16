import _ from "lodash";
import ERC20ABI from "../contracts/CheemsXABI.json";
import LockupAPI from "../contracts/Lockup.json"
import ERC721ABI from "../contracts/ERC721.json"
import FractionalABI from "../contracts/Fractional.json"
import PNFTABI from "../contracts/pNFT.json"
import GIR from "../contracts/GIR.json"
import Web3 from "web3"
// import { numberWithCommas } from "../utils/calculation";
import { CheemsX, GuarantNFT, Lockup, FractionalAddress, MulticallAddress, RPC_URL, AVAX, pNFTAddress } from "../utils/constant"
import { multicall } from '@defifofum/multicall';
import { LonoStake, Staking } from '../utils/constant';
import LonoTokenABI from "../contracts/LonoStake_tokenABI.json"
import StakingABI from "../contracts/LonoStakingABI.json"

export const setNetworkProvider = (api = LockupAPI, address = Lockup) => {
    return new window.web3.eth.Contract(api, address);
}

const converNumber2Str = (amount, decimals = 18) => {
    return '0x' + (Math.round(amount * Math.pow(10, decimals))).toString(16)
}

export const getTokenAmount = async(account) => {
    if (!account) return 0;
    const tokenContract = await setNetworkProvider(LonoTokenABI, LonoStake);
    const Decimal = await tokenContract.methods.decimals().call();
    const balance = await tokenContract.methods.balanceOf(account).call();
    return balance / Math.pow(10, Decimal);
}

export const stake = async(account, amount, duration) => {
    if (!account) return 0;
    const Contract = await setNetworkProvider(StakingABI, Staking);
    await Contract.methods.stake(converNumber2Str(amount), duration).send({from: account});
}

export const unstake = async(account, isunstake) => {
    if (!account) return 0;
    const Contract = await setNetworkProvider(StakingABI, Staking);
    await Contract.methods.unstake(isunstake).send({from: account});
}

export const approve = async (account, amount) => {
    if (!account) return;
    const Contract = new window.web3.eth.Contract(LonoTokenABI, LonoStake);
    return await Contract.methods.approve(Staking, converNumber2Str(amount)).send({ from: account });
}

export const getHolderInfo = async(account) => {
    if (!account) return 0;
    const Contract = await setNetworkProvider(StakingABI, Staking);
    const ret = await Contract.methods.holders(account).call();
    return ret;
}

export const calcReward = async(account) => {
    if (!account) return 0;
    const Contract = await setNetworkProvider(StakingABI, Staking);
    const ret = await Contract.methods.calculateReward(account).call();
    return ret;
}

export const calcEndtime = async(account) => {
    if (!account) return 0;
    const Contract = await setNetworkProvider(StakingABI, Staking);
    const ret = await Contract.methods.calculateEndTime(account).call();
    return ret;
}
