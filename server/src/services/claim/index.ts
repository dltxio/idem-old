import { ethers } from "ethers";

export default class ClaimService implements claimService.ClaimService {
  constructor(private config: Config) {}

  public validateClaim = async (data: server.Claim): Promise<server.Claim> => {
    const wallet = new ethers.Wallet(this.config.ethKey);
    const signature = await wallet.signMessage(data.toString());
    const hash = ethers.utils.keccak256(signature);

    data.hash = hash;
    data.signature = signature;
    data.timestamp = Date.now();
    return data;
  };
}
