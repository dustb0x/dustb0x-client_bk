declare namespace NodeJS {
  interface ProcessEnv {
    readonly moralisApiKey: string
    readonly moralisAppId: string
    readonly modalisServerUrl: string
    readonly dustb0xApiUri: string
    readonly dustb0xContractAddress: string
    readonly dustb0xOwnerAddress: string
  }
}
