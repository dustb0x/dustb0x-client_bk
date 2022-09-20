import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { getContract } from '@/utils/contract'
import IERC721 from '@/abi/IERC721.json'
import DustB0x from '@/abi/Dustb0x.json'
import useActiveWeb3React from './use-active-web3-react'

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useIERC721(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, IERC721, withSignerIfPossible);
}

export function useDustb0x(
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(process.env.dustb0xContractAddress, DustB0x, withSignerIfPossible);
}
