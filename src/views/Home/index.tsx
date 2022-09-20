import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useNft from '@/views/Home/hooks/useNft'

import { Grid } from '@nextui-org/react'

import PageMeta from '@/components/Layout/PageMeta'
import TopNavbar from '@/components/Navbar/TopNavbar'
import PageSection from '@/components/PageSection'
import PageHeader from '@/components/Layout/PageHeader'
import ConnectedSection from '@/views/Home/components/ConnectedSection'
import NotConnectSection from './components/NotConnectSection'

const HomeView: React.FC = () => {
  const { active, account, chainId } = useWeb3React()
  const [nfts, setNfts] = useState([])

  const { getWalletNfts, getNftMetadata } = useNft()

  useEffect(() => {
    (async () => {
      if (account && chainId) {
        const nfts = await getWalletNfts(account, chainId)
        const metadataList: any = await getNftMetadata(nfts)
        setNfts(metadataList)
      } else {
        setNfts([])
      }
    })()
    console.log(nfts)
  }, [account, chainId])

  return (
    <>
      <PageMeta />
      <TopNavbar />
      <PageHeader />
      <PageSection>
        <Grid.Container>
          {active ? <ConnectedSection nfts={nfts} setNfts={setNfts} /> : <NotConnectSection />}
        </Grid.Container>
      </PageSection>
    </>
  )
}

export default HomeView
