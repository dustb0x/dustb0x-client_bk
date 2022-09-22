import useERC721Contract from '@/hooks/useErc721Contract'

import { Image, Text } from '@nextui-org/react'

import BaseModal from '@/components/Parts/BaseModal'


interface Nft {
  name: string
  symbol: string
  tokenAddress: string
  tokenId: string
  image: string
}

interface ThrowAwayModelProp {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setCompleteModal: React.Dispatch<React.SetStateAction<boolean>>
  getMyNfts: any
  account: string
  nftData?: Nft
  isLoading: boolean
}

const ThrowAwayModel: React.FC<ThrowAwayModelProp>  = ({
  isOpen,
  setIsOpen,
  setIsLoading,
  setCompleteModal,
  getMyNfts,
  account,
  nftData,
  isLoading
}) => {
  const { transferFrom } = useERC721Contract(nftData?.tokenAddress ?? '')

  const modalOptions = {
    preventClose: true
  }

  const handleThrowAway = async () => {
    try {
      if (!account) return

      setIsLoading(true)
      setCompleteModal(false)
      
      const tx = await transferFrom(
        account,
        process.env.dustb0xOwnerAddress,
        nftData?.tokenId ?? ''
      )

      if (tx.lenght === 0) {
        throw new Error('MetaMask Tx Signature: User denied transaction signature. ')
      }

      await tx.wait()

      await getMyNfts()

      setIsLoading(false)
      setCompleteModal(true)

      setIsOpen(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      setIsOpne={setIsOpen}
      title="Please confirm"
      enterBtnName="Throw Away"
      enterBtnFunc={() => handleThrowAway()}
      isLoading={isLoading}
      options={modalOptions}
    >
      <Text>
        Throw away NFTs?<br />
        NFT once discarded cannot be recovered.
      </Text>
      <Text>
        NFT Contract Address: {nftData?.tokenAddress}<br />
        name: {nftData?.name}<br />
        symbol: {nftData?.symbol}<br />
        tokenId: {nftData?.tokenId}<br />
      </Text>
      {nftData && (
        <Image
          src={nftData.image}
          showSkeleton
          alt="Default Image"
        />
      )}
    </BaseModal>
  )
}

export default ThrowAwayModel
