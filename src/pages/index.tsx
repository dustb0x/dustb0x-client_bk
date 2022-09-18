import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import {
  Button,
  Card,
  Col,
  Dropdown,
  Grid,
  Modal,
  Navbar,
  Text
} from '@nextui-org/react'
import { WalletIcon } from '../components/WalletIcon'
import { SettingIcon } from '../components/SettingIcon'
import { useWeb3React } from '@web3-react/core'
import { connector } from '@/utils/connector'
import { ethers } from 'ethers'
import Moralis  from 'moralis'
import { EvmChain } from '@moralisweb3/evm-utils'

const Home: NextPage = () => {
  const{ active, account, library, chainId, activate, deactivate } = useWeb3React()
  const [visible, setVisible] = useState(false)
  const [nfts, setNfts] = useState([])

  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
  }

  const handleConnect = () => {
    activate(connector.injected)
  }

  const handleDisconnect = () => {
    deactivate()
  }

  const getWalletNfts = () => {
    Moralis.start({
      apiKey: 'NqkjitDPFFSGBBOmavjZbW1M1ZDmKo0Z6SV29tzjYrcP9isJsVOyVZtnZZ5NhjWK',
    })
      .then((res: any) => {
        const address = '0xB7c9cBBE3189B76bfD87E7555837Af6ba7e35A24'
        Moralis.EvmApi.nft.getWalletNFTs({address, chainId})
          .then((res: any) => {
            const metadata = res.data.result.map((data: any) => {
              console.log(data)
              console.log(JSON.parse(data.metadata))

              // TOOD: APIでNFT情報を取得
              axios.get('http://localhost:3001', {
                params: {
                  tokenUri: data.token_uri
                }
              })
                .then((res: any) => {
                  if (data.contract_type === 'ERC721') {
                    return {
                      title: `${data.symbol} #${data.token_id}`,
                      name: data.name,
                      image: res.data.image
                    }
                  } else if (data.contract_type === 'ERC1155') {
                    return {
                      title: data.symbol,
                      name: data.name,
                      image: res.data.image
                    }
                  }
                })
            })
            setNfts(metadata)
            console.log(nfts)
            console.log(metadata)
          })
      })
  }

  useEffect(() => {
    if (active) {
      getWalletNfts()
    }
  }, [active])

  return (
    <div className={styles.container}>
      <Head>
        <title>Dustb0x</title>
        <meta name="description" content="Dustb0x" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar variant="sticky">
        <Navbar.Brand>
          <Text>NFT Dustb0x</Text>
        </Navbar.Brand>
        {!active ? (
          <Navbar.Content>
            <Navbar.Item>
              <Button
                auto
                light
                icon={<WalletIcon />}
                onClick={() => handleConnect()}
              />
            </Navbar.Item>
          </Navbar.Content>
        ) : (
          <Navbar.Content>
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Button
                    auto
                    light
                    icon={<SettingIcon />}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key="may-wallet">
                  <Text onClick={() => {handler()}}>
                    My Wallet
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="disconnect" withDivider color="error">
                  <Text color="error" onClick={() => {handleDisconnect()}}>
                      Disconnect
                  </Text>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        )}
      </Navbar>

      <main>
        <div className={styles.main}>
          <Text
            h1
            size={50}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="light"
          >
            NFT Dustb0x
          </Text>

          <Text
            size={20}
            color="white"
            weight="light"
          >
            Organize your wallet.
          </Text>
          <Grid.Container gap={2} justify="center">
            {nfts.map((data) => {
              return (
                <>
                <Grid xs={12} sm={3}>
                  <Card>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                      <Col>
                        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                          {data?.name}
                        </Text>
                        <Text h3 color="black">
                          {data?.title}
                        </Text>
                      </Col>
                    </Card.Header>
                    <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={data?.image}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      alt="Card example background"
                    />
                    </Card.Body>
                  </Card>
                </Grid>
                </>
              )
            })}
          </Grid.Container>
        </div>

        <div>
          <Modal
            open={visible}
            onClose={closeHandler}
            width="600px"
          >
            <Modal.Header>
            <Text size={18}>
              My wallet
            </Text>
            </Modal.Header>
            <Modal.Body>
              <div className={styles.description}>
                <code className={styles.code}>{account}</code>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                auto
                flat
                color="error"
                onClick={() => setVisible(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </div>
  )
}

export default Home
