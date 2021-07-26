declare namespace server {
  type ThirdPartyAuthorizeRequest = {
    claims: Claim[];
    issuer: string;
  };

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

  type VerifiableCredential = {
    id: string;
    type: string;
    issuer: string;
    issuerDate: Date;
    credential: Credential[];
    evidences: Evidence[];
    signature: string;
  };

  type Credential = {
    key: string;
    type: string;
    value: string;
  };

  type Evidence = {
    key: string;
    type: string;
    signature: string;
    verifier: string;
    evidenceDocument: string;
    documentPresence: string;
    timeStamp: Date;
  };

  type JwtCredentialPayload = {
    verifiableCredential: VerifiableCredential;
    subject: string;
    nonce: number;
  };
}
