import { MiningResponse } from "@/bff/types/miningResponse";

export function mapMiningResponse(data: any): MiningResponse {
  const averageCommitment = data.Item.averageCommitment.S;
  const baseTarget = data.Item.baseTarget.S;
  const blockReward = data.Item.blockReward.S;
  const price = data.Item.price.S;

  return {
    averageCommitment,
    baseTarget,
    blockReward,
    price,
  };
}
