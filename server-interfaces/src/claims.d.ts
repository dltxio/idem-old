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

  type ClaimValidated = {
    hash: string;
    signature: string;
    timestamp: number;
  };

  type ClaimRequest = {
    firstName: string;
    middleName: string | undefined;
    lastName: string;
    dob: string;
    unitNumber: string | undefined;
    streetNumber: string;
    streetName: string;
    streetType: string;
    locality: string;
    region: string;
    postCode: string;
    country: string;
  };
}
