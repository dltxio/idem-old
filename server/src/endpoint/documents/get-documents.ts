import { RequestHandler } from "../request-handler-wrapper";

const getDocuments: RequestHandler<
  void,
  void,
  void,
  server.Document[]
> = async () => {
  return [
    {
      name: "DL Scan.pdf",
      hash: "34ba703fb51601686640e7fca185dba7a04a1a50cc59a72e47a088e51e4a6786",
      created: new Date(2021, 1, 1)
    }
  ];
};

export default getDocuments;
