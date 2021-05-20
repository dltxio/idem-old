declare namespace server {
  // type ClaimType = "18+";

  type Claim = {
    key: string;
    type: string;
    value: string;
  };

  type ClaimValidated = Claim & {
    signature: string;
    timestamp: number;
  };
}
