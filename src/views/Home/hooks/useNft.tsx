import { useCallback } from 'react'
import Moralis  from 'moralis'
import axios from 'axios'
import type { EvmNftContractType } from '@moralisweb3/evm-utils'

export interface NftMetadata {
  name: string
  description: string
  image: string
  animation_url: string | undefined
  attributes: any
}

export interface Nft {
  id: number,
  contractType: EvmNftContractType
  name: string
  symbol: string
  tokenAddress: string
  tokenHash: string
  tokenId: string
  tokenUri: string | undefined
  metadata: NftMetadata
}

const useNft = () => {
  /**
   * getMetadata
   *
   * @param tokenUri string | null
   * @returns Promise<NftMetadata>
   */
  const getMetadata = async (tokenUri: string | null): Promise<NftMetadata> => {
    let metadata: NftMetadata = {
      name: 'no name',
      description: 'no description',
      image: './no_image.png',
      animation_url: '',
      attributes: {},
    }

    if (tokenUri) {
      const data = await axios.get(`${process.env.dustb0xApiUri}/nft/metadata`, {
        params: { tokenUri }
      })

      if (typeof data.data === 'object') {
        let image = './no_image.png'
        if (data.data?.image) {
          if (data.data?.image.indexOf('ipfs://') !== -1) {
          const str = data.data?.image.split('ipfs://')
            image = `https://ipfs.io/ipfs/${str[1]}`
          } else {
            image = data.data?.image
          }
        }

        metadata = {
          name: data.data?.name ? data.data.name : 'no name',
          description: data.data?.description ? data.data.description : 'no description',
          image,
          animation_url: data.data?.animation_url ? data.data.animation_url : '',
          attributes: data.data?.attributes ? data.data.attributes : {},
        }
      }
    }

    return metadata
  }

  /**
   * getWalletNfts
   *
   * @param address
   * @param chainId
   * @returns
   */
  const getWalletNfts = useCallback(
    async (address: string, chain: number) => {
      await Moralis.start({
        apiKey: process.env.moralisApiKey,
      })

      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      })

      let id = 1
      const nfts: Nft[] = []
      for (const nft of response.toJSON()) {
        const metadata = await getMetadata(nft?.tokenUri ? nft.tokenUri : null)

        nfts.push({
          id,
          contractType: nft.contractType,
          name: nft.name ? nft.name : 'no name',
          symbol: nft.symbol ? nft.symbol : 'NFT',
          tokenAddress: nft.tokenAddress,
          tokenHash: nft.tokenHash ? nft.tokenHash : 'no hash',
          tokenId: nft.tokenId.toString(),
          tokenUri: nft.tokenUri,
          metadata
        })
        id++
      }

      return nfts
    },
    []
  )

  return {
    getWalletNfts
  }
}

export default useNft
