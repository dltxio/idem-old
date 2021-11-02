declare namespace server {
  type IdentityResponseBody = {
    id: string;
    claims: Claims[];
  }
};