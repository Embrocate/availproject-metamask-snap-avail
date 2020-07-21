import {injectExtension} from '@polkadot/extension-inject';
import {MetamaskPolkadotSnap} from "./snap";
import {SnapConfig} from "@nodefactory/metamask-polkadot-types";
import {hasMetaMask} from "./utils";

const defaultOrigin = "https://ipfs.infura.io/ipfs/QmPa7anrvkCHLmwiw8fKGRVQanGXfGqvfJprmxeCj24WiU/";

/**
 *
 * @param network
 * @param config
 * @param pluginOrigin url to package.json
 */
export function injectMetamaskPolkadotSnapProvider(
  network: "westend"|"kusama",
  config?: SnapConfig,
  pluginOrigin?: string
): void {
  if(!hasMetaMask()) {
    return;
  }
  const polkadotSnap = new MetamaskPolkadotSnap(
    pluginOrigin || defaultOrigin,
    config || {networkName: network}
  );
  injectExtension(
    async () => await polkadotSnap.enableSnap(),
    {name: 'metamask-polkadot-snap', version: '1.0.0'}
  );
}