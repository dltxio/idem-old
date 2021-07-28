declare namespace ausPostService {
  interface AusPostService {
    sendVerification: (data: server.Claims) => Promise<server.SuccessResponse>;
  }
}
