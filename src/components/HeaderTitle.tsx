import { Text } from '@nextui-org/react'

const HeaderTitle = () => {
  return (
    <>
      <Text
        h1
        size={40}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="light"
      >
        NFT Dustb0x beta
      </Text>

      <Text
        size={20}
        color="white"
        weight="light"
      >
        Organize your wallet.
      </Text>
      <Text
        size={20}
        color="white"
        weight="light"
      >
        beta version only supports Goerli testnet.
      </Text>
    </>
  )
}

export default HeaderTitle
