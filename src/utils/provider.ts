import { StaticJsonRpcProvider } from '@ethersproject/providers';

export const ETH_PROD_NODE =
  process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'http://localhost:7545';

export const ethRpcProvider = new StaticJsonRpcProvider(ETH_PROD_NODE);
