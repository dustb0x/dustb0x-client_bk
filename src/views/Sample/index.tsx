import { useState } from 'react'

import { Button, Grid } from '@nextui-org/react'

import CompletedModal from '@/components/Modal/CompletedModal'
import ThrowAwayModel from '@/components/Modal/ThrowAwayModel'
import NftCard from '@/components/Nft/NftCard/index'

const SampleView = () => {
  const [throwAwayModel, setThrowAwayModel] = useState<boolean>(false)
  const [completeModal, setCompleteModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nftData, setNftData] = useState()

  const nft1 = {
    id: 1,
    name: "DROPS",
    symbol: "DROPS",
    tokenAddress: "0x0000000000",
    tokenId: "2754",
    image: "./sample_nft_1.png"
  }

  const nft2 = {
    id: 2,
    name: "DROPS",
    symbol: "DROPS",
    tokenAddress: "0x0000000000",
    tokenId: "2564",
    image: "./sample_nft_2.png"
  }

  const nfts = [nft1, nft2]

  const handleThrowAway = async () => {
    setIsLoading(true)
    setCompleteModal(false)

    const sleep = (second: number) => new Promise(resolve => setTimeout(resolve, second * 1000))
    await sleep(3)

    setIsLoading(false)
    setCompleteModal(true)

    setThrowAwayModel(false)
  }

  const handleClick = (nftData: any) => {
    setNftData(nftData)
    setThrowAwayModel(true)
  }

  return (
    <>
      <Button onClick={() => setThrowAwayModel(true)}>
        Open ThrowAwayModel
      </Button>
      <ThrowAwayModel
        isOpen={throwAwayModel}
        setIsOpen={setThrowAwayModel}
        nftData={nftData}
        handleThrowAway={handleThrowAway}
        isLoading={isLoading}
      />
      <CompletedModal
        isOpen={completeModal}
        setIsOpen={setCompleteModal}
      />
      <Grid.Container css={{ mt: 30 }} gap={2} justify="center">
        {nfts.map((data: any) => {
          return (
            <NftCard
              key={data.id}
              nftData={data}
              handleClick={handleClick}
            />
          )
        })}
      </Grid.Container>
    </>
  )
}

export default SampleView
