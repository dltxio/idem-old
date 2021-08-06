declare namespace server {
  type Claim = {
    key: string;
    type: string;
    value: string;
    evidence: string[];
    hash: string | undefined;
    signature: string | undefined;
    timestamp: number | undefined;
  };
}
