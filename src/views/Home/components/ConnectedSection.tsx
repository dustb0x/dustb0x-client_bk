import React from 'react'

import { Grid } from '@nextui-org/react'

import NftCard from '@/components/Nft/NftCard'

const ConnectedSection: React.FC<any> = ({ nfts, setNfts }) => {
  return (
    <>
      <Grid.Container css={{ mt: 30 }} gap={2} justify="center">
        {nfts.map((data: any) => {
          return (
            <NftCard
              key={data.id}
              title={data.title}
              name={data.name}
              symbol={data.symbol}
              tokenId={data.tokenId}
              tokenAddress={data.tokenAddress}
              image={data.image}
              setNfts={setNfts}
            />
          )
        })}
      </Grid.Container>
    </>
  )
}

export default ConnectedSection
