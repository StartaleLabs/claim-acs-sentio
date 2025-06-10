import { Counter } from '@sentio/sdk'
import { EthChainId } from '@sentio/sdk/eth'
import { ClaimAcsProcessor } from './types/eth/claimacs.js'; // Path to generated file

const claimAmountValue = Counter.register('claim_amount_value');
const claimCounter = Counter.register('claim_counter');

const CLAIM_CONTRACT = '0x01225c7bDF26ea76318bB717be5A99906cE713Bf'
const NETWORK = EthChainId.SONEIUM_MAINNET

ClaimAcsProcessor.bind({
  address: CLAIM_CONTRACT,
  network: NETWORK,
  startBlock: 7991560n // Claim contract creation block

}).onEventClaimed(async (event, ctx) => {
  const val = event.args.amount.scaleDown(18) // Scale down the value from 18 decimals to 0
  claimAmountValue.add(ctx, val)
  claimCounter.add(ctx, 1)
})
