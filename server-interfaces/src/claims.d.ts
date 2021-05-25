declare namespace server {
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
