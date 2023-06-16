import styled from '@emotion/styled'
import { Button, Box } from '@mui/material'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import './topnav.scss'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LogoutIcon from '@mui/icons-material/Logout';
import { shortAddr } from "../../utils/calculation";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faShuffle, faWaterLadder, faTractor } from '@fortawesome/free-solid-svg-icons';

const TopNav = () => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }
    const { login, account, logout } = useAuth();
    const [open, setOpen] = useState(false)

    const copyAddress = () => {
        navigator.clipboard.writeText(account || "")
    }

    return (
        <div className='flex flex-row bg-gray-900 justify-between items-center py-3' style={{position:'fixed', width:'100%',background: "linear-gradient(to right, rgb(12, 2, 12), rgb(36, 34, 34))"}}>
            <img className='navbar-avatar' src="img/Top_Logo_Web.png" alt="ad"></img>
            <div className='w-2/3 flex flex-row justify-center items-center gap-3'>
                <Link to = '/swap' className = 'top-link  px-3 py-2 hover:bg-gray-800 hover:cursor-pointer '><FontAwesomeIcon icon={faShuffle} /> &nbsp; Swap</Link>
                <Link to = '/liquidity' className = 'top-link  px-3 py-2 hover:bg-gray-800 hover:cursor-pointer '><FontAwesomeIcon icon={faWaterLadder} /> &nbsp;Liquidity</Link>
                <Link to = '/farms' className = 'top-link  px-3 py-2 hover:bg-gray-800 hover:cursor-pointer '><FontAwesomeIcon icon={faTractor} /> &nbsp;Farms</Link>
            </div>
            <div className = 'w-1/4 flex flex-row items-right justify-center'>
                <Box display='flex' style={{position:'absolute', right:'20px', bottom:'20%', width:'200px'}}>
                    {
                        !account ?
                            <ConnectWalletBtn className='btn-connect' variant='contained' size="large" onClick={login}><FontAwesomeIcon icon={faWallet} /> &nbsp;  <span> Connect Wallet</span></ConnectWalletBtn>
                            :
                            <Box display="flex" fontSize="15px" alignItems="center" style={{ cursor: 'pointer' }} position="relative" onClick={() => { setOpen(!open) }}>
                                <Box bgcolor="#4272d7" color="white" p="10px" px="35px" style={{width:'200px'}} borderRadius="5px"><FontAwesomeIcon icon={faWallet} /> &nbsp; {shortAddr(account || "")}</Box>
                                <ToggleList display={open ? "flex" : "none"} style={{width:'200px'}}>
                                    <Box component={Button} color="inherit" style={{ textTransform: 'none' }} onClick={copyAddress} startIcon={<ContentCopyIcon />}>Copy Address</Box>
                                    <Button
                                        color="inherit"
                                        style={{ textTransform: 'none' }}
                                        startIcon={<OpenInNewIcon />}
                                        href={`https://snowtrace.io/address/${account}`}
                                        target="_blank"
                                    >
                                        View on Explorer
                                    </Button>
                                    <Box component={Button} color="inherit" style={{ textTransform: 'none' }} startIcon={<LogoutIcon />} onClick={logout} >Disconnect</Box>
                                </ToggleList>
                            </Box>
                    }
                </Box>
            </div>
        </div>
    )
}

export default TopNav

const ConnectWalletBtn = styled(Button)`
    &.MuiButton-containedPrimary {
        // background: linear-gradient(to right, rgb(244, 183, 72),rgb(241, 99, 54), rgb(241, 99, 54)) !important;
        // padding-left: 20px;
        // padding-right: 20px;
        // width:200px;
        // color:black;
        
        
    }
`

const ToggleList = styled(Box)`
    position: absolute;
    color: white;
    background-color: #4272d7;
    align-items: flex-start;
    flex-direction: column;
    border-radius: 6px;
    padding: 20px;
    box-shadow: 5px 4px 13px 7px #243d74cc;
    z-index: 10;
    top: calc(100% + 5px);
    width: max-content;
    right: 0;
    @media (max-width: 600px) {
        left: 0;
    }

    @media (max-width: 1368px) {
        left: 0;
    }
`