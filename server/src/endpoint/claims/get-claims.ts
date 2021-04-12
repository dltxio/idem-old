import { RequestHandler } from "../request-handler-wrapper";

const getClaims: RequestHandler<
  void,
  void,
  void,
  server.Claim[]
> = async () => {
  return [
    {
      name: "18+",
      type: "18+"
    }
  ];
};

export default getClaims;
