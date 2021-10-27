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

  type AusPostRequest = {
    family_name: string;
    middle_name: string | undefined;
    given_name: string;
    dob: string;
    address: FullAdress;
    consent: string;
  }

  type FullAdress = {
    country: string;
    locality: string;
    postal_code: string;
    region: string;
    street_name: string;
    street_number: string;
    street_type: string;
    unit_number: string;
  }

  type AusPostResponse = {
    verification_status: string;
  }
}
