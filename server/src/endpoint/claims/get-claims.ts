import { RequestHandler } from "../request-handler-wrapper";

const getClaims: RequestHandler<void, void, void, server.Claim[]> =
  async () => {
    return [
      {
        key: "18+",
        value: "18+",
        type: "18+",
        evidence: ["18+"],
        hash: undefined,
        signature: undefined,
        timestamp: undefined
      }
    ];
  };

export default getClaims;
