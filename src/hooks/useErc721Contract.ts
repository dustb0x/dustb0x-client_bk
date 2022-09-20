import { useIERC721 } from '@/hooks/use-contract';

const useERC721Contract = (contractAddress: string) => {
  const contract = useIERC721(contractAddress)

  const transferFrom = async (from: string, to: string, tokenId: string) => {
    try {
      return await contract?.functions.transferFrom(from, to, tokenId)
    } catch (err: any) {
      console.log(err)
      return []
    }
  }

  return {
    transferFrom,
  }
}

export default useERC721Contract
