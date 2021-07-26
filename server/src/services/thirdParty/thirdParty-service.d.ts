declare namespace thirdPartyService {
  interface ThirdPartyService {
    authorizeGPIB: (
      data: server.Claims
    ) => Promise<server.SuccessResponse | server.BadRequestGeneralResponse>;
  }
}
