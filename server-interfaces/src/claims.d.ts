declare namespace server {
  type Claim = {
    key: string;
    type: string;
    value: string;
    evidence: string[];
  };

  type ClaimValidated = {
    hash: string;
    signature: string;
    timestamp: number;
  };

  type Claims = {
    claims: Claim[];
  };
}
