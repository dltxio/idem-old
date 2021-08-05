declare namespace server {
  type Claim = {
    key: string;
    type: string;
    value: string;
    evidence: string[];
    hash: string | undefined;
    signature: string | undefined;
    timestamp: number | undefined;
    description: string;
  };

  type ClaimValidated = {
    hash: string;
    signature: string;
    timestamp: number;
  };

  type ClaimRequest = {
    name: string;
    dob: string;
    mobile: string;
    email: string;
    address: string;
  };
}
