declare namespace server {
  type ClaimType = "18+";

  type Claim = {
    name: string;
    type: ClaimType;
  };

  type ClaimValidated = Claim & {
    signature: string;
    timestamp: number;
  };
}
