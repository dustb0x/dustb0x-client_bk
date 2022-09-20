import { useState } from 'react'
import useERC721Contract from '@/hooks/useErc721Contract'
import useNft from '@/views/Home/hooks/useNft'
import { useWeb3React } from '@web3-react/core'
import {
  Button,
  Card,
  Col,
  Grid,
  Loading,
  Modal,
  Row,
  Text
} from '@nextui-org/react'

const NftCard = ({
  tokenAddress,
  title,
  name,
  symbol,
  tokenId,
  image,
  setNfts
}: any) => {
  const { transferFrom } = useERC721Contract(tokenAddress)
  const { account, chainId } = useWeb3React()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    getWalletNfts,
    getNftMetadata
  } = useNft()

  const handler = () => setVisible(true)

  const closeHandler = () => {
    setVisible(false)
  }

  const throwAwayNft = async (tokenAddress: string, tokenId: number) => {
    if (!account) return
    setLoading(true)
    const tx = await transferFrom(
      account,
      process.env.dustb0xOwnerAddress,
      tokenId.toString()
    )

    await tx.wait()

    if (!chainId) return
    const nfts = await getWalletNfts(account, chainId)
    const metadataList: any = await getNftMetadata(nfts)

    setNfts(metadataList)
    setVisible(false)
    setLoading(false)
  }

  return (
    <>
      <Grid xs={12} sm={3}>
        <Card css={{ w: "100%", h: "400px" }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={image}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Card.Body>
          <Card.Footer
            isBlurred
            css={{
              position: "absolute",
              bgBlur: "#ffffff66",
              borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Row>
              <Col>
                <Text color="#000" size={12}>
                  {title}
                </Text>
                <Text color="#000" size={12}>
                  {name}
                </Text>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button
                    flat
                    auto
                    rounded
                    color="secondary"
                    onClick={() => handler()}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Throw away
                    </Text>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
      <Modal
        open={visible}
        onClose={closeHandler}
        width="600px"
      >
        <Modal.Header>
        <Text size={18}>
          Confirmation
        </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>
            Throw away NFTs?<br />
            NFT once discarded cannot be recovered.
          </Text>
          <Text>
            NFT Contract Address: {tokenAddress}<br />
            name: {name}<br />
            symbol: {symbol}<br />
            tokenId: {tokenId}<br />
          </Text>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
              <Loading color="currentColor" size="sm" />
            </Button>
          ) : (
            <Button
              auto
              flat
              color="error"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
          )}
          {loading ? (
            <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
              <Loading color="currentColor" size="sm" />
            </Button>
          ) : (
            <Button
              auto
              flat
              color="gradient"
              onClick={() => throwAwayNft(tokenAddress, tokenId)}
            >
              I throw it away
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NftCard
