import React from 'react'

import { Grid, Text } from '@nextui-org/react'

const PageHeader: React.FC = () => {
  return (
    <Grid.Container>
      <Grid xs={12} justify="center">
        <Text
            h1
            size={60}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
              pt: 80,
              '@xsMax': {
                pt: 80,
                fs: 38
              },
            }}
            weight="light"
          >
            NFT Dustb0x beta
          </Text>
      </Grid>
      <Grid xs={12} justify="center">
        <Text
          h1
          size={30}
          css={{
            '@xsMax': {
              fs: 25
            },
          }}
          weight="light"
        >
          rganize your wallet.
        </Text>
      </Grid>
    </Grid.Container>
  )
}

export default PageHeader
