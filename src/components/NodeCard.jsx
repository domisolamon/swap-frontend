import { Box, styled, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { isExistStakingName, StakeNFT, getTierInfo } from "../hooks/useTokenInfo";
import { numberWithCommas } from "../utils/calculation";
import { GuarantNFT } from "../utils/constant.js"
import { NFTCardButton } from "./NFTCard";
import { CustomInput } from "./Stake/CreateStake";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { NFTTypeList } from "./Fractional/NFTFractionCard";
import axios from "axios"
import _ from "lodash"

const NodeTypeList = ['TierA', 'TierB', 'TierC', 'TierD']

const NodeCard = ({
    tokenId,
    amount,
    tokenType,
    tokenUri,
    onUpdate,
    NFTAddress,
    NFTName,
    isNode = false,
    ...props
}) => {
    const [toggle, setToggle] = useState(false)
    const [name, setName] = useState("")
    const {account} = useAuth()
    const [_tokenType, setTokenType] = useState(tokenType ? tokenType : 0)
    const [_tokenUri, setTokenUri] = useState(tokenUri ? tokenUri : "")

    useEffect(()=>{
        if(isNode) return;
        (async()=>{
            const {tierInfo, tokenUri} = await getTierInfo(tokenId)
            console.log("aaaaaaaaaaaaaaaaaa",tokenId, tierInfo)
            setTokenType(tierInfo)
            let uri = {}
            try{
                uri = await axios.get(tokenUri)
            }catch(e){
                _.set(uri, "data.image", "")
            }
            setTokenUri(uri.data.image);
        })()
        setToggle(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tokenId])

    const stake = async() => {
        if(!account) {
            toast.warn("You should connect your wallet!", {
                toastId: "account",
            })
            return;
        }
        if(!name) {
            if(! toast.isActive("nameEmpty"))
                toast.warn("Please set your staking name!",{
                    toastId: "nameEmpty",
                })
            return;
        }
        if(await isExistStakingName(name, account)) {
            if(! toast.isActive("duplicatedName"))
                toast.warn("Duplicated staking name. Please set again.",{
                    toastId: "nameEmpty",
                })
            return;
        }
        let nftAddr = isNode ? GuarantNFT : NFTAddress;
        await toast.promise(StakeNFT(account, name, tokenId, nftAddr, isNode), {
            pending: `Create Node...`,
            success: `You created`,
            error: `Failed`
        })
        if(onUpdate) onUpdate()
    }

    return <Box flexDirection="column" justifyContent="center" width="300px" minWidth="300px" minHeight={'300px'} borderRadius="5px" overflow="hidden" position="relative" display="flex" {...props}>
    <Box component="img" width="300px" height="300px" src={_tokenUri}  zIndex={1} />
    <NFTCardButton py="10px" fontSize="18px" fontWeight="500" color="white" zIndex={2} onClick={()=>{setToggle(!toggle)}}>
        {!isNode ? 'Staking Node' : 'Staking NFT'}
    </NFTCardButton>
    <NFTMangeComponent style={{transform: toggle ? 'translateY(0)' : 'translateY(100%)'}}>
        <Box component="h2" mb="10px" color="#ff64dd">Node NFT</Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between" width="100%">
            <Box display="flex" justifyContent="space-between" width="100%" mb="10px">
                <Box fontWeight="bold">NFT name</Box>
                <Box>{NFTName}</Box>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%" mb="10px">
                <Box fontWeight="bold">TokenId</Box>
                <Box>{tokenId}</Box>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%" mb="10px">
                <Box fontWeight="bold">Type</Box>
                <Box>{!isNode ? NFTTypeList[_tokenType] : NodeTypeList[_tokenType]}</Box>
            </Box>
            {amount && <Box display="flex" justifyContent="space-between" width="100%" mb="10px">
                <Box fontWeight="bold">Amount</Box>
                    <Box>{numberWithCommas(amount, 2)}</Box>
            </Box>}
            {/* <Box display="flex" justifyContent="space-between" width="100%" mb="10px">
                <Box fontWeight="bold">Minter</Box>
                <Box color="blue"><a href={`https://snowtrace.io/address/${minter}`} target="_blank" rel="noreferrer">{shortAddr(minter, 6)}</a></Box>
            </Box> */}
            <Box display="flex" justifyContent="space-between" width="100%" mb="10px" color="#ff64dd">
                <CustomInput style={{width: '150px', height: "30px", marginRight: "10px"}} placeholder="Staking Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
                <Button variant="contained" color="secondary" sx={{textTransform: 'none'}} size="small" onClick={stake}>Stake</Button>
            </Box>
        </Box>
    </NFTMangeComponent>
</Box>
}

export default NodeCard;

const NFTMangeComponent = styled(Box)`
    position: absolute;
    left: 0;
    top: 40px;
    background-color: #fceff9f1;
    width: 100%;
    height: 260px;
    z-index: 1;
    transition: transform 0.2s;
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    color: black;
    justify-content: space-between;
`