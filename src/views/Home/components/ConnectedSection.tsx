import React, { useState } from 'react'

import { Grid } from '@nextui-org/react'

import NftCard from '@/components/Nft/NftCard/index'
import CompletedModal from '@/components/Modal/CompletedModal'
import ThrowAwayModel from '@/components/Modal/ThrowAwayModel'

const ConnectedSection: React.FC<any> = ({
  nfts,
  account,
  getMyNfts,
}) => {
  const [throwAwayModel, setThrowAwayModel] = useState<boolean>(false)
  const [completeModal, setCompleteModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nftData, setNftData] = useState()

  const handleClick = (nftData: any) => {
    setNftData(nftData)
    setThrowAwayModel(true)
  }

  return (
    <>
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
      <ThrowAwayModel
        isOpen={throwAwayModel}
        setIsOpen={setThrowAwayModel}
        setIsLoading={setIsLoading}
        setCompleteModal={setCompleteModal}
        getMyNfts={getMyNfts}
        account={account}
        nftData={nftData}
        isLoading={isLoading}
      />
      <CompletedModal
        isOpen={completeModal}
        setIsOpen={setCompleteModal}
      />
    </>
  )
}

export default ConnectedSection
