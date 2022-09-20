import Moralis  from 'moralis'
import axios from 'axios'

const useNft = () => {
  const startMoralis = async () => {
    await Moralis.start({
      apiKey: process.env.moralisApiKey,
    })
  }

  /**
   * getWalletNfts
   *
   * @param address
   * @param chainId
   * @returns
   */
  const getWalletNfts = async (address: string, chain: number) => {
    await startMoralis()

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    })

    return response.toJSON()
  }

  /**
   * getNftMetadata
   *
   * @param nfts
   * @returns
   */
  const getNftMetadata = async (nfts: any) => {
    try {
      if (nfts.length === 0) {
        throw new Error('getNftMetadata: Couldn\'t get NFT.')
      }

      let count = 0
      const apiResponse = await Promise.allSettled(nfts.map(async (data: any) => {
        const response = await axios.get(`${process.env.dustb0xApiUri}/nft/metadata`, {
          params: {
            tokenUri: data.tokenUri
          }
        })
          .catch(err => { console.error(err)})

        if (!response?.data) {
          count++
          return {
            id: count,
            title: `${data.symbol} # ${data.tokenId}`,
            name: data.name,
            symbol: data.symbol,
            description: '-',
            image: '/no_image.png',
            attributes: {},
            contractType: data.contractType,
            tokenAddress: data.tokenAddress,
            tokenId: data.tokenId,
            tokenHash: data.tokenHash,
            tokenUri: data.tokenUri,
            ownerOf: data.ownerOf
          }
        }

        let image = ''
        if (response?.data.image.indexOf('ipfs://') !== -1) {
          const str = response?.data.image.split('ipfs://')
          image = `https://ipfs.io/ipfs/${str[1]}`
        } else {
          image = response.data.image
        }

        count++
        return {
          id: count,
          title: response?.data.name,
          name: data.name,
          symbol: data.symbol,
          description: response?.data.description,
          image,
          attributes: response?.data.attributes,
          contractType: data.contractType,
          tokenAddress: data.tokenAddress,
          tokenId: data.tokenId,
          tokenHash: data.tokenHash,
          tokenUri: data.tokenUri,
          ownerOf: data.ownerOf
        }
      }))

      const metadataList = []
      for (const result of apiResponse) {
        if (result.status === 'rejected') continue
        metadataList.push(result.value)
      }

      return metadataList
    } catch(err) {
      return []
    }
  }

  return {
    getWalletNfts,
    getNftMetadata
  }
}

export default useNft
