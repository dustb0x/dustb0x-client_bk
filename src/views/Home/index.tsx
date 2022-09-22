import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useNft from '@/views/Home/hooks/useNft'

import { Grid, Loading } from '@nextui-org/react'

import PageMeta from '@/components/Layout/PageMeta'
import TopNavbar from '@/components/Navbar/TopNavbar'
import PageSection from '@/components/PageSection'
import PageHeader from '@/components/Layout/PageHeader'
import ConnectedSection from '@/views/Home/components/ConnectedSection'
import NotConnectSection from './components/NotConnectSection'

const HomeView: React.FC = () => {
  const { active, account, chainId } = useWeb3React()
  const [isConnectiong, setIsConnection] = useState<boolean>(false)
  const [nfts, setNfts] = useState([])

  const { getWalletNfts } = useNft()

  const getMyNfts = async () => {
    async function fetchNfts() {
      if (account && chainId) {
        getWalletNfts(account, chainId)
          .then((list: any) => setNfts(list))
          .catch((e) => console.error('Error fetchNfts: ', e))
      } else {
        setNfts([])
      }
    }
    fetchNfts()
  }

  useEffect(() => {
    setIsConnection(true)
    async function fetchNfts() {
      if (account && chainId) {
        getWalletNfts(account, chainId)
          .then((list: any) => {
            setNfts(list)
            setIsConnection(false)
          })
          .catch((e) => {
            setIsConnection(false)
            console.error('Error fetchNfts: ', e)
          })
      } else {
        setNfts([])
        setIsConnection(false)
      }
    }
    fetchNfts()
  }, [account, chainId, getWalletNfts])

  return (
    <>
      <PageMeta />
      <TopNavbar />
      <PageHeader />
      {
        isConnectiong && (
          <PageSection>
            <Grid.Container gap={2}>
              <Grid xs={12} md={12} justify="center">
                <Loading color="secondary" type="points-opacity" />
              </Grid>
            </Grid.Container>
          </PageSection>
        )
      }
      <PageSection>
        <Grid.Container>
          {active ? (
            <ConnectedSection
              nfts={nfts}
              setNfts={setNfts}
              account={account}
              getMyNfts={getMyNfts}
            />
          ) : (
            <NotConnectSection />
          )}
        </Grid.Container>
      </PageSection>
    </>
  )
}

export default HomeView
