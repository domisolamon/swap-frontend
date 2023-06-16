import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import { UserAuthProvider } from './hooks/useAuth'
import { TransactionHandleProvider } from './hooks/useTransaction'

const Providers = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <TransactionHandleProvider>
        <UserAuthProvider>
          {children}
        </UserAuthProvider>
      </TransactionHandleProvider>
    </Web3ReactProvider>
  )
}

export default Providers
