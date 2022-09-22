import { Card, Grid, Row, Col, Button, Text } from '@nextui-org/react'

import type { Nft } from '@/views/Home/hooks/useNft'

interface NftCardProps {
  nftData: Nft
  handleClick: any
}

const NftCard: React.FC<NftCardProps> = ({
  nftData,
  handleClick
}) => {
  return (
    <Grid xs={12} sm={3}>
      <Card>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={nftData.metadata.image}
            width="100%"
            height="100%"
            objectFit="cover"
            alt={nftData.symbol + '#' + nftData.tokenId}
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
                {nftData.symbol + '#' + nftData.tokenId}
              </Text>
              <Text color="#000" size={12}>
                {nftData.name}
              </Text>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button flat auto rounded color="secondary" onClick={() => handleClick(nftData)}>
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
  )
}

export default NftCard
