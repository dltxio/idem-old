declare namespace server {
  type Claim = {
    "@context": string[];
    id?: string;
    key: string;
    type: string[];
    credentialSubject: CredentialSubject;
    proof: Proof;
    issuer: string;
    issuanceDate: Date;
    expirationDate?: Date;
    title: string;
    description?: string;
  }

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

  interface CredentialSubject {
    id?: string;
    name: string;
    value: any;
  }

  interface Proof {
    type: string;
  }
  
  interface CredentialStatus {
    id: string;
    type: string
  }
}
