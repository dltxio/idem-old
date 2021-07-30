declare namespace claimService {
  interface ClaimService {
    validateClaim: (data: server.Claim) => Promise<server.Claim>;
  }
}
