import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ethRpcProvider } from '@//utils/provider';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { ChainId } from '@/types';

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();

  return {
    library: library ?? ethRpcProvider,
    chainId: chainId ?? ChainId.ETH_TESTNET,
    ...web3React,
  };
};

export default useActiveWeb3React;
